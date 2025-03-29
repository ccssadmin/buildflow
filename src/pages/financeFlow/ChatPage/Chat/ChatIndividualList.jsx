import React from "react";

const chatUsers = [
  { id: 1, name: "Ronald Richards", unread: 2, avatar: "https://via.placeholder.com/50" },
  { id: 2, name: "Floyd Miles", unread: 1, avatar: "https://via.placeholder.com/50" },
  { id: 3, name: "Dianne Russell", unread: 1, avatar: "https://via.placeholder.com/50" },
];

const ChatIndividualList = ({ selectedChat, setSelectedChat }) => {
  const openChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="bg-white p-3 border-end" style={{ width: "250px" }}>
      <h5 className="text-dark">Chats</h5>
      {chatUsers.map((user) => (
        <div
          key={user.id}
          className={`d-flex justify-content-between align-items-center p-2 border-bottom ${
            selectedChat && selectedChat.id === user.id ? "bg-light" : ""
          }`}
          onClick={() => openChat(user)}
          style={{ cursor: "pointer" }}
        >
          <span>{user.name}</span>
          {user.unread > 0 && (
            <span className="badge" style={{ backgroundColor: "#FF6F00", color: "white" }}>
              {user.unread}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatIndividualList;