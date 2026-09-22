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

conversation = None

def get_conversation():
    global conversation

    if conversation is None:
        conversation = openai_client.conversations.create()

    return conversation


def reset_conversation():
    global conversation
    conversation = openai_client.conversations.create()

def ask_agent(question: str) -> str:
    current_conversation = get_conversation()

    response = openai_client.responses.create(
        conversation=current_conversation.id,
        input=question,
    )

    return response.output_text  

    