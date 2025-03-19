import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { BsEmojiSmile, BsPlus } from "react-icons/bs";
import { FiPaperclip, FiSend } from "react-icons/fi";

const messagesData = [
  { id: 1, sender: "other", text: "Hello, how are you?", time: "7:20 pm" },
  { id: 2, sender: "me", text: "I'm good, what about you?", time: "7:21 pm" },
  { id: 3, sender: "other", text: "I'm doing great!", time: "7:22 pm" },
  { id: 4, sender: "me", text: "Glad to hear that.", time: "7:23 pm" },
];

const ChatIndividualScreen = ({ selectedChat }) => {
  const [chatMessages, setChatMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages, 
        { id: chatMessages.length + 1, sender: "me", text: newMessage, time: getCurrentTime() }
      ]);
      setNewMessage("");
    }
  };

  if (!selectedChat) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-grow-1">
        <h5>Select a chat to start messaging</h5>
      </div>
    );
  }

  return (
    <div className="chat-window flex-grow-1 d-flex flex-column">
      <div className="chat-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="chat-user-info d-flex align-items-center">
          <img src={selectedChat.avatar} alt={selectedChat.name} className="avatar me-2" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
          <span>{selectedChat.name}</span>
        </div>
        <FaEllipsisV className="menu-icon" />
      </div>

      {/* Messages */}
      <div className="chat-messages flex-grow-1 p-3 overflow-auto">
        {chatMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-3 ${msg.sender === "me" ? "text-end" : ""}`}
          >
            <div 
              className={`chat-bubble p-2 d-inline-block rounded ${
                msg.sender === "me" ? "bg-primary text-white ms-auto" : "bg-light me-auto"
              }`}
              style={{ maxWidth: "80%" }}
            >
              {msg.text}
              <div className="text-end">
                <small className={`${msg.sender === "me" ? "text-white-50" : "text-muted"}`}>
                  {msg.time}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input p-3 d-flex align-items-center border-top">
        <BsEmojiSmile className="icon me-2" style={{ cursor: "pointer" }} />
        <FiPaperclip className="icon me-2" style={{ cursor: "pointer" }} />
        <BsPlus className="icon me-2" style={{ cursor: "pointer" }} />
        <input 
          type="text" 
          className="form-control me-2" 
          placeholder="Type a message..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
        />
        <FiSend className="icon send-icon" style={{ color: "#FF6F00", cursor: "pointer" }} onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatIndividualScreen;