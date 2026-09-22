import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../auth/AuthProvider";

const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const WELCOME_MESSAGE = {
  role: "assistant",
  text: `Hi! 👋 I'm your **Campus Placement Assistant**.

I can help you with:
- Companies and roles
- Eligibility checking
- Interview preparation
- Required skills
- Role-specific preparation

Ask me a placement-related question or choose a quick question below.`,
};

const QUICK_QUESTIONS = [
  {
    icon: "🏢",
    label: "Companies for CSE",
    question: "What companies are available for CSE students?",
  },
  {
    icon: "✅",
    label: "Check Eligibility",
    question:
      "Am I eligible for TechNova if my CGPA is 7.2 and I have 0 backlogs?",
  },
  {
    icon: "🎯",
    label: "Interview Preparation",
    question:
      "How should I prepare for campus placement interviews?",
  },
  {
    icon: "🤖",
    label: "ML Preparation",
    question:
      "How should I prepare for a Machine Learning Engineer role?",
  },
];

function cleanAnswer(text) {
  if (!text) return "";

  return text
    .replace(/\[\d+:\d+†source\]/gi, "")
    .replace(/\[\d+:\d+source\]/gi, "")
    .replace(/【[^】]*】/g, "")
    .trim();
}

export function ChatPage() {
  const { user, getToken } = useAuth();
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const clearHistory = async () => {
    setLoading(true);
    setStatusMessage("Clearing conversation...");
    try {
      let token = "";
      try {
        token = await getToken();
      } catch (tokenErr) {
        console.warn("No token available for reset:", tokenErr);
      }

      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      await fetch(`${BACKEND_URL}/reset`, {
        method: "POST",
        headers: headers,
      });
    } catch (error) {
      console.log("Reset endpoint notice:", error);
    } finally {
      setLoading(false);
      setStatusMessage("");
    }

    setMessages([WELCOME_MESSAGE]);
    setInput("");

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const sendMessage = async (question = input) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: trimmedQuestion,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      let token = "";
      try {
        token = await getToken();
      } catch (tokenErr) {
        console.warn("Could not retrieve Entra token:", tokenErr);
      }

      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed or session expired. Please sign in again.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            cleanAnswer(data.answer) ||
            "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            `⚠️ **Connection Issue**\n\n${error.message || "I couldn't connect to the backend right now."}\n\n` +
            "Please make sure the FastAPI backend is running and you are signed in with Microsoft Entra.",
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page-wrapper">
      {/* CHAT TOOLBAR — no duplicate brand/user/signout, those live in global Navbar */}
      <div className="chat-toolbar">
        <div className="chat-toolbar-inner">
          <div className="chat-toolbar-title">
            <span className="chat-toolbar-icon">💬</span>
            <div>
              <span className="chat-toolbar-name">Campus Placement Assistant</span>
              <span className="chat-toolbar-subtitle">AI-103 Placement Guidance • Microsoft Foundry</span>
            </div>
          </div>

          <div className="chat-toolbar-actions">
            <div className="status">
              <span className="status-dot"></span>
              <span>AI Online</span>
            </div>

            <button
              className="clear-button"
              onClick={clearHistory}
              disabled={loading}
              title="Clear conversation"
              type="button"
            >
              🗑️ Clear History
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CHAT */}
      <main className="chat-container">
        <section className="chat-card">
          {/* MESSAGES CONTAINER */}
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`message-row ${message.role}`}
              >
                <div className="avatar">
                  {message.role === "assistant" ? "🤖" : "👤"}
                </div>

                <div className="message-bubble">
                  <div className="message-label">
                    {message.role === "assistant" ? "Assistant" : (user?.name || "You")}
                  </div>

                  <div className="message-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* THINKING STATE */}
            {loading && (
              <div className="message-row assistant">
                <div className="avatar">🤖</div>

                <div className="message-bubble typing-bubble">
                  <div className="message-label">Assistant</div>

                  <div className="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="typing-text">{statusMessage || "Thinking & searching knowledge base..."}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* QUICK QUESTIONS */}
          <div className="quick-section">
            <div className="quick-title">Quick questions</div>

            <div className="quick-questions">
              {QUICK_QUESTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => sendMessage(item.question)}
                  disabled={loading}
                  type="button"
                >
                  <span className="quick-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="input-area">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a placement question (e.g. 'What companies are available for CSE?' or 'Check my eligibility')..."
              disabled={loading}
              rows={2}
            />

            <button
              type="button"
              className="send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              title="Send message"
            >
              ➤
            </button>
          </div>

          <div className="footer-note">
            Microsoft Foundry • Foundry IQ RAG • Grounded Placement Knowledge
          </div>
        </section>
      </main>
    </div>
  );
}
