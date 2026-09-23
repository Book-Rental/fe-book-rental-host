import { useState } from "react";
import { sendMessageToAgent } from "../services/aiAgentService";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await sendMessageToAgent(trimmedMessage);

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response.data?.reply ||
          response.message ||
          "I couldn't find an answer.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Agent error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI Agent. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "#222",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 9999,
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          }}
          aria-label="Open AI Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "380px",
            height: "520px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid #ddd",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              background: "#4169E1",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                AI Book Assistant
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.8,
                  marginTop: "3px",
                }}
              >
                Ask me anything about books
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              background: "#f7f7f7",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "120px",
                  color: "#666",
                }}
              >
                <div
                  style={{
                    fontSize: "35px",
                    marginBottom: "10px",
                  }}
                >
                  🤖
                </div>

                <div>
                  Hi! How can I help you?
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  Try: "Show me all books"
                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    item.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 13px",
                    borderRadius: "12px",
                    background:
                      item.role === "user"
                        ? "#222"
                        : "#fff",
                    color:
                      item.role === "user"
                        ? "#fff"
                        : "#222",
                    border:
                      item.role === "assistant"
                        ? "1px solid #ddd"
                        : "none",
                    whiteSpace: "pre-wrap",
                    fontSize: "14px",
                  }}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  color: "#666",
                  fontSize: "13px",
                  padding: "5px",
                }}
              >
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px",
              background: "#fff",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Ask about books..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
              }}
            />

            <button
              onClick={handleSendMessage}
              disabled={loading || !message.trim()}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "8px",
                background: "#222",
                color: "#fff",
                cursor:
                  loading || !message.trim()
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  loading || !message.trim() ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgent;