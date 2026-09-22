import os

from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential, ManagedIdentityCredential
from azure.ai.projects import AIProjectClient
from openai import BadRequestError

load_dotenv()

PROJECT_ENDPOINT = os.environ["FOUNDRY_PROJECT_ENDPOINT"]
AGENT_NAME = os.environ["FOUNDRY_AGENT_NAME"]

if os.getenv("WEBSITE_HOSTNAME"):
    # Running in Azure App Service – use Managed Identity
    client_id = os.getenv("AZURE_CLIENT_ID")
    if not client_id:
        raise RuntimeError("AZURE_CLIENT_ID environment variable is required for Managed Identity authentication in Azure.")
    credential = ManagedIdentityCredential(client_id=client_id)
else:
    # Local development – use DefaultAzureCredential (or any available local credential)
    credential = DefaultAzureCredential()


project_client = AIProjectClient(
    endpoint=PROJECT_ENDPOINT,
    credential=credential
)

openai_client = project_client.get_openai_client(
    agent_name=AGENT_NAME
)

# Per-user conversation storage to isolate chat histories
user_conversations = {}


def get_conversation(user_id: str = "default"):
    if user_id not in user_conversations or user_conversations[user_id] is None:
        user_conversations[user_id] = openai_client.conversations.create()

    return user_conversations[user_id]


def reset_conversation(user_id: str = "default"):
    user_conversations[user_id] = openai_client.conversations.create()
    return user_conversations[user_id]


def ask_agent(question: str, user_id: str = "default") -> str:
    current_conversation = get_conversation(user_id)

    try:
        response = openai_client.responses.create(
            conversation=current_conversation.id,
            input=question,
        )

        return response.output_text

    except BadRequestError as e:
        if "content_filter" in str(e):
            return "Sorry, this request was blocked by Azure OpenAI's content safety filter."

        raise