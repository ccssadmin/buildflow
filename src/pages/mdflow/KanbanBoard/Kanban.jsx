import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTicket } from "../../../hooks/Ceo/useTicket";

// Define tag colors
const tagColors = {
  HR: "#D6FFCF",
  Finance: "#CFE2FF",
  PO: "#FFCFCF",
  General: "#E0E0E0"
};

const columnColors = ["#D2F4FF", "#FFEECF", "#E4CFFF", "#DAFFCF"];

const KanbanBoard = () => {
  const navigate = useNavigate();
  
  // Use our custom hook
  const {
    ticketsByLabel,
    labels,
    loading,
    error,
    fetchLabelsByEmployeeId,
    fetchTicketById
  } = useTicket();

  const [columns, setColumns] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState({});
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editColumnIndex, setEditColumnIndex] = useState(null);

  // Fetch tickets by employee ID from localStorage when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if (userData?.empId) {
          await fetchLabelsByEmployeeId(userData.empId);
        } else {
          console.error("Employee ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, []);

  // Update columns when labels or ticketsByLabel change
  useEffect(() => {
    if (loading) return;

    if (Array.isArray(labels) && labels.length > 0) {
      // Create a map of labelId to labelName for quick lookup
      const labelMap = {};
      labels.forEach(label => {
        labelMap[label.labelId] = label.labelName;
      });

      // Create columns based on labels
      const newColumns = labels.map((label, index) => {
        // Get tickets for this specific label
        const labelTickets = ticketsByLabel[label.labelId] || [];
        
        // Map tickets to tasks
        const tasks = labelTickets.map(ticket => ({
          id: ticket.ticketId,
          title: ticket.ticketName || "Untitled Ticket",
          description: ticket.ticketDescription || "",
          date: ticket.ticketCreatedDate 
            ? new Date(ticket.ticketCreatedDate).toLocaleDateString("en-GB")
            : new Date().toLocaleDateString("en-GB"),
          tags: ticket.tags || ["General"],
          comments: ticket.commentsCount || 0,
          files: ticket.attachmentsCount || 0
        }));

        return {
          title: label.labelName || `Label ${index + 1}`,
          count: tasks.length,
          color: columnColors[index % columnColors.length],
          tasks,
          labelId: label.labelId
        };
      });

      setColumns(newColumns);
    } else {
      // Fallback for empty labels
      setColumns([
        { title: "Open", count: 0, color: "#D2F4FF", tasks: [], labelId: "open" },
        { title: "In Progress", count: 0, color: "#FFEECF", tasks: [], labelId: "in-progress" },
        { title: "Done", count: 0, color: "#DAFFCF", tasks: [], labelId: "done" },
      ]);
    }
  }, [labels, ticketsByLabel, loading]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const updatedColumns = columns.map((col) => {
      if (col.title === "Open") {
        return {
          ...col,
          tasks: [
            ...col.tasks,
            { 
              id: Date.now(),
              title: newTaskTitle, 
              tags: ["HR", "Finance"], 
              description: "New task description.",
              date: new Date().toLocaleDateString("en-GB"), 
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

  const handleTaskClick = async (task) => {
    try {
      const result = await fetchTicketById(task.id);
      
      if (result?.success) {
        navigate(`/ticket/${task.id}`, { 
          state: { 
            ticket: result.data,
            from: 'kanban' 
          } 
        });
      } else {
        console.error("Failed to fetch ticket details:", result?.error);
      }
    } catch (error) {
      console.error("Error navigating to ticket details:", error);
    }
  };

  // Rest of the component remains the same...
  const handleMenuClick = (columnIndex) => {
    setMenuOpen({
      ...menuOpen,
      [columnIndex]: !menuOpen[columnIndex],
    });
  };

  const handleEditColumn = (columnIndex) => {
    setEditTaskTitle(columns[columnIndex]?.title || "");
    setEditColumnIndex(columnIndex);
    setMenuOpen({ ...menuOpen, [columnIndex]: false });
  };

  const handleSaveEdit = () => {
    if (editColumnIndex === null) return;

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

  if (loading) {
    return <div className="loading-container">Loading kanban board...</div>;
  }

  if (error) {
    return <div className="error-container">Error loading ticket data: {error}</div>;
  }

  return (
    <div className="kanban-page-container">
      <div className="kanban-header-section">
        <div className="kanban-project-info">
          <h2 className="kanban-project-title">Ramnad RWSP Site</h2>
          <div className="kanban-project-manager">
            <div className="kanban-manager-avatar">
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
        </div>
      </div>

      <div className="kanban-container">
        <div className="kanban-board">
          {columns.map((column, columnIndex) => (
            <div key={column.labelId || columnIndex} className="kanban-column">
              <div className="kanban-column-header" style={{ backgroundColor: column.color }}>
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
                  <button 
                    className="menu-button" 
                    onClick={() => handleMenuClick(columnIndex)}
                    aria-label="Column menu"
                  >
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
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    autoFocus
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
                <div className="kanban-card edit-column-card">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="column-edit-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    autoFocus
                  />
                  <button onClick={handleSaveEdit} className="save-edit-btn">Save</button>
                  <button
                    onClick={() => {
                      setEditTaskTitle("");
                      setEditColumnIndex(null);
                    }}
                    className="cancel-edit-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="task-list">
                  {column.tasks?.map((task, taskIndex) => (
                    <div
                      key={`${task.id}-${taskIndex}`}
                      className="kanban-card"
                      onClick={() => handleTaskClick(task)}
                      style={{ cursor: "pointer" }}
                    >
                      <h6 className="task-title">{task.title}</h6>
                      <div className="task-tags">
                        {task.tags?.map((tag, tagIndex) => (
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
                              <span>{task.comments} Comments</span>
                            </div>
                            <div className="task-action-item">
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                              </svg>
                              <span>{task.files} Files</span>
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