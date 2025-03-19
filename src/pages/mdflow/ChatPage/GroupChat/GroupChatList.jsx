import React from "react";

// Dummy data for group chats
const groupChatData = [
  { id: 1, name: "NRM Site Project", unread: 2, members: ["Albert Flores", "Wade Warren", "Jenny Wilson", "Floyd Miles"] },
  { id: 2, name: "MAA Site Project", unread: 1, members: ["Dianne Russell", "Cameron Williamson", "Theresa Webb"] },
  { id: 3, name: "RMN Site Project", unread: 1, members: ["Jacob Jones", "Kristin Watson", "Darlene Robertson"] },
];

const GroupChatList = ({ selectedGroup, setSelectedGroup }) => {
  const openGroupChat = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="bg-white p-3 border-end" style={{ width: "250px" }}>
      <h5 className="text-dark">Groups</h5>
      {groupChatData.map((group) => (
        <div
          key={group.id}
          className={`d-flex justify-content-between align-items-center p-2 border-bottom ${
            selectedGroup && selectedGroup.id === group.id ? "bg-light" : ""
          }`}
          onClick={() => openGroupChat(group)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <span>{group.name}</span>
            <div className="small text-muted">{group.members.slice(0, 2).join(", ")}...</div>
          </div>
          {group.unread > 0 && (
            <span className="badge" style={{ backgroundColor: "#FF6F00", color: "white" }}>
              {group.unread}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupChatList;