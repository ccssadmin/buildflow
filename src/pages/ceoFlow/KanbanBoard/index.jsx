import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define tag colors
const tagColors = {
  HR: "#D6FFCF",
  Finance: "#CFE2FF",
  PO: "#FFCFCF"
};

const KanbanBoard = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([
    {
      title: "Open",
      count: 6,
      color: "#D2F4FF",
      tasks: [
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
      ],
    },
    {
      title: "Work in Progress",
      count: 1,
      color: "#FFEECF",
      tasks: [
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance", "PO"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
      ],
    },
    {
      title: "Review",
      count: 6,
      color: "#E4CFFF",
      tasks: [
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance", "PO"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
      ],
    },
    {
      title: "Approved",
      count: 6,
      color: "#DAFFCF",
      tasks: [
        { 
          title: "Resource Requirement", 
          tags: ["HR", "Finance", "PO"], 
          description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
          date: "15 feb", 
          comments: 0, 
          files: 1 
        },
      ],
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState({});
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editColumnIndex, setEditColumnIndex] = useState(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const updatedColumns = columns.map((col) => {
      if (col.title === "Open") {
        return {
          ...col,
          tasks: [
            ...col.tasks,
            { 
              title: newTaskTitle, 
              tags: ["HR", "Finance"], 
              description: "Payroll, compliance, and employee engagement using HR software and best practices to ensure a productive workforce.",
              date: "15 feb", 
              comments: 0, 
              files: 0 
            },
          ],
          count: col.count + 1,
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setNewTaskTitle("");
    setShowTaskInput(false);
  };

  const handleTaskClick = (task) => {
    navigate(`/ceo/ticketdetails/${task.title}`, { state: { task } });
  };

  const handleMenuClick = (columnIndex) => {
    setMenuOpen({
      ...menuOpen,
      [columnIndex]: !menuOpen[columnIndex],
    });
  };

  const handleEditColumn = (columnIndex) => {
    setEditTaskTitle(columns[columnIndex].title);
    setEditColumnIndex(columnIndex);
    setMenuOpen({ ...menuOpen, [columnIndex]: false });
  };

  const handleSaveEdit = () => {
    const updatedColumns = columns.map((col, colIndex) => {
      if (colIndex === editColumnIndex) {
        return { ...col, title: editTaskTitle };
      }
      return col;
    });
    setColumns(updatedColumns);
    setEditTaskTitle("");
    setEditColumnIndex(null);
  };

  const handleDeleteColumn = (columnIndex) => {
    if (columnIndex === 0) return;

    const updatedColumns = columns.filter((_, index) => index !== columnIndex);
    setColumns(updatedColumns);
    setMenuOpen({ ...menuOpen, [columnIndex]: false });
  };

  return (
    <div className="kanban-page-container">
      {/* <div className="kanban-header-section"> */}
        {/* <div className="kanban-project-info">
          <h2 className="kanban-project-title">Ramnad RWSP Site</h2>
          <div className="kanban-project-manager">
            <div className="kanban-manager-avatar">
              <img src="/api/placeholder/40/40" alt="Manager" />
            <h6 style={{textAlign:'center'}}>RR</h6>
            </div>
            <div className="kanban-manager-details">
              <span className="kanban-manager-name">Ronald Richards</span>
              <span className="kanban-manager-role">Project Manager</span>
            </div>
          </div>
        </div>
        <div className="kanban-view-toggle">
          <button className="kanban-view-button active">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
            Kanban
          </button>
        </div> */}
      {/* </div>  */}

      <div className="kanban-container">
        <div className="kanban-board">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="kanban-column">
              <div className="kanban-header" style={{ backgroundColor: column.color }}>
                <div className="kanban-header-left">
                  <span className="column-title">{column.title}</span>
                  <span className="count-badge">{column.count}</span>
                </div>

                <div className="kanban-header-right">
                  {column.title === "Open" && (
                    <button 
                      className="add-task-btn" 
                      onClick={() => setShowTaskInput(true)}
                    >
                      Add +
                    </button>
                  )}
                  <button className="menu-button" onClick={() => handleMenuClick(columnIndex)}>
                    ⋮
                  </button>
                  {menuOpen[columnIndex] && (
                    <div className="menu-actions">
                      <button onClick={() => handleEditColumn(columnIndex)}>Edit</button>
                      {columnIndex !== 0 && <button onClick={() => handleDeleteColumn(columnIndex)}>Delete</button>}
                    </div>
                  )}
                </div>
              </div>

              {column.title === "Open" && showTaskInput && (
                <div className="kanban-card add-task-card">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <div className="task-input-buttons">
                    <button className="cancel-button" onClick={() => setShowTaskInput(false)}>
                      Cancel
                    </button>
                    <button className="create-button" onClick={handleAddTask}>
                      Create
                    </button>
                  </div>
                </div>
              )}

              {editColumnIndex === columnIndex ? (
                <div className="kanban-card">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    style={{ width: '105px', marginRight: '5px' }}
                  />
                  <button onClick={handleSaveEdit} style={{ backgroundColor: 'orange' }}>Save</button>
                  <button
                    onClick={() => {
                      setEditTaskTitle("");
                      setEditColumnIndex(null);
                    }}
                    style={{ backgroundColor: 'white', marginLeft: '5px' }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-list">
                  {column.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="kanban-card"
                      onClick={() => handleTaskClick(task)}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className="task-title">{task.title}</h6>
                      <div className="task-tags">
                        {task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="tag-badge"
                            style={{ backgroundColor: tagColors[tag] || "#888" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="task-description">
                        {task.description}
                      </p>
                      <div className="task-footer">
                        <div className="task-metadata">
                          <div className="task-time">
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>{task.date}</span>
                          </div>
                          <div className="task-actions">
                            <div className="task-action-item">
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <span>Comment</span>
                            </div>
                            <div className="task-action-item">
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                              </svg>
                              <span>File Attached</span>
                            </div>
                          </div>
                        </div>
                        <div className="task-assignees">
                          <div className="assignee-avatars">
                            <div className="assignee-avatar">
                              <img src="/api/placeholder/24/24" alt="Assignee 1" />
                            </div>
                            <div className="assignee-avatar">
                              <img src="/api/placeholder/24/24" alt="Assignee 2" />
                            </div>
                            <div className="assignee-avatar">
                              <img src="/api/placeholder/24/24" alt="Assignee 3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;