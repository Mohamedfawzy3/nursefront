import React, { useState, useRef } from "react";
import chatbotData from "../Data/Ai.json"; // Import the JSON data
import { IoChatbubblesOutline, IoClose } from "react-icons/io5"; // Import icons
import { IoSend } from "react-icons/io5"; // Import the send icon
import { RiChatVoiceAiLine } from "react-icons/ri";
const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "0",
      sender: "bot",
      text: "مرحباً بك في خدمة المساعدة لتطبيق التمريض المنزلي! 👋\n\nكيف يمكنني مساعدتك اليوم؟",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility
  const chatContainerRef = useRef(null);

  const getPredefinedResponse = (userMessage) => {
    for (const category in chatbotData) {
      const customerQuestions = chatbotData[category].customer.question;
      const providerQuestions = chatbotData[category].provider.question;

      if (customerQuestions.some((q) => userMessage.includes(q))) {
        return chatbotData[category].customer.response.join("\n");
      }

      if (providerQuestions.some((q) => userMessage.includes(q))) {
        return chatbotData[category].provider.response.join("\n");
      }
    }
    return "عذرًا، لم أتمكن من العثور على إجابة لسؤالك. يرجى المحاولة مرة أخرى.";
  };

  const sendMessage = () => {
    if (userInput.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    const botReplyText = getPredefinedResponse(userInput);
    const botMessage = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: botReplyText,
    };
    setMessages((prev) => [...prev, botMessage]);

    setUserInput("");

    // Scroll to the bottom of the chat
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <>
      {/* Chat Icon to Open/Close Chatbot */}
      <div
        style={styles.chatIcon}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} color="#fff" /> : <RiChatVoiceAiLine size={24} color="#fff" />}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatHeader}>
            مساعد الذكاء الاصطناعي
            <button
              style={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={20} color="#fff" />
            </button>
          </div>
          <div style={styles.chatMessages} ref={chatContainerRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                  color: msg.sender === "user" ? "#fff" : "#000",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              style={styles.chatInput}
            />
             <button onClick={sendMessage} style={styles.sendButton}>
              <IoSend size={20} color="#fff" /> {/* Send icon */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  chatIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  chatbotContainer: {
    width: "400px",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: "80px",
    right: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s, height 0.3s", // Smooth transition for resizing
  },
  "@media (max-width: 768px)": {
    chatbotContainer: {
      width: "90%", // Adjust width for smaller screens
      height: "70%", // Adjust height for smaller screens
      bottom: "20px",
      right: "5%",
    },
  },
  chatHeader: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  chatMessages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  chatInputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
  },
  chatInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 15px",
    marginRight: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(180deg)" 
  },
};

export default Chatbot;