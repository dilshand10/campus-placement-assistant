import os

from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

load_dotenv()

PROJECT_ENDPOINT = os.environ["FOUNDRY_PROJECT_ENDPOINT"]
AGENT_NAME = os.environ["FOUNDRY_AGENT_NAME"]

credential = DefaultAzureCredential()

project_client = AIProjectClient(
    endpoint=PROJECT_ENDPOINT,
    credential=credential
)

openai_client = project_client.get_openai_client(
    agent_name=AGENT_NAME
)

conversation = openai_client.conversations.create()


def ask_agent(question: str) -> str:
    response = openai_client.responses.create(
        conversation=conversation.id,
        input=question
    )

    return response.output_text