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

  const sendMessage = async (text = question) => {
    if (!text.trim() || loading) return;

    const userQuestion = text.trim();

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
      const response = await fetch("/api/chat", {
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

  const quickQuestions = [
    {
      label: "🏢 Companies for CSE",
      question: "What companies are available for CSE students?",
    },
    {
      label: "✅ Check Eligibility",
      question: "What are the eligibility rules for campus placements?",
    },
    {
      label: "💼 Interview Preparation",
      question: "How should I prepare for placement interviews?",
    },
    {
      label: "🤖 ML Preparation",
      question:
        "How should I prepare for a Machine Learning Engineer role?",
    },
  ];

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi! 👋 I'm your Campus Placement Assistant. Ask me about companies, eligibility, interview preparation, or placement roles.",
      },
    ]);

    setQuestion("");
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🎓 Campus Placement Assistant</h1>
          <p>AI-powered placement guidance for students</p>
        </div>

        <div className="status">
          <span></span>
          AI Online
        </div>
      </header>

      <main className="chat-container">
        {/* Quick Questions */}
        <div className="quick-questions">
          {quickQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setQuestion(item.question);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
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
                  {message.text}
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

        {/* Input */}
        <div className="input-area">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about companies, eligibility, roles, or interview preparation..."
            rows="2"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading || !question.trim()}
          >
            {loading ? "..." : "➤"}
          </button>
        </div>

        {/* Clear Chat */}
        <div className="chat-actions">
          <button onClick={clearChat}>
            🗑️ Clear Chat
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