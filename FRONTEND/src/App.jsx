import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm your Campus Placement Assistant. Ask me about companies, eligibility, interview preparation, or placement roles.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (customQuestion = null) => {
    const userQuestion = (customQuestion ?? question).trim();

    if (!userQuestion || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I could not connect to the backend. Please make sure the FastAPI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };
  const cleanAnswer = (text) => {
  return text
    .replace(/【[^】]*】/g, "")
    .replace(/\[source\]/gi, "")
    .trim();
};

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>🎓 Campus Placement Assistant</h1>
          <p>AI-powered placement guidance for students</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          AI Online
        </div>
      </header>

      {/* CHAT AREA */}
      <main className="chat-container">

        <div className="messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.role}`}
            >
              <div className="avatar">
                {message.role === "assistant" ? "🤖" : "👤"}
              </div>
              

              <div className="message">
                
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {cleanAnswer(message.text)}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant">
              <div className="avatar">🤖</div>

              <div className="message typing">
                Thinking...
              </div>
            </div>
          )}

        </div>

        {/* QUICK QUESTIONS */}
        <div className="quick-questions">

          <button
            onClick={() =>
              sendMessage("What companies are available for CSE students?")
            }
          >
            🏢 Companies for CSE
          </button>

          <button
            onClick={() =>
              sendMessage(
                "What are the eligibility rules for campus placements?"
              )
            }
          >
            ✅ Check Eligibility
          </button>

          <button
            onClick={() =>
              sendMessage(
                "How should I prepare for campus placement interviews?"
              )
            }
          >
            🎯 Interview Preparation
          </button>

          <button
            onClick={() =>
              sendMessage(
                "How should I prepare for a Machine Learning Engineer role?"
              )
            }
          >
            🤖 ML Preparation
          </button>

        </div>

        {/* INPUT */}
        <div className="input-area">

          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about companies, eligibility, roles, or interview preparation..."
            rows="2"
          />

          <button
            className="send-button"
            onClick={() => sendMessage()}
            disabled={loading || !question.trim()}
          >
            {loading ? "..." : "➤"}
          </button>

        </div>

        <p className="footer-note">
          Powered by Microsoft Foundry + Foundry IQ
        </p>

      </main>

    </div>
  );
}

export default App;