from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from services.agent_services import ask_agent, reset_conversation

from services.agent_services import ask_agent


app = FastAPI(
    title="Campus Placement Assistant",
    description="AI-powered campus placement assistant API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


@app.get("/")
def root():
    return {
        "message": "Campus Placement Assistant API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = ask_agent(request.question)

    return {
        "answer": answer
    }

@app.post("/reset")
def reset():
    reset_conversation()
    return {"message": "Conversation history cleared"}