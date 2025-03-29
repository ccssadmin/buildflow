import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BsPaperclip } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { comment, date, fileAttach, time } from "../../../assets/images";
const tagColors = {
    HR: "#D6FFCF",
    Finance: "#CFE2FF",
    Admin: "#FFCFCF",
};

const EngineerKanbanBoard = () => {
    const navigate = useNavigate();
    const [columns, setColumns] = useState([
        {
            title: "Open",
            count: 3,
            color: "#D2F4FF",
            tasks: [
                { title: "Resource Requirement", tags: ["HR", "Finance"], date: "15 Feb", comments: 2, files: 1 },
                { title: "Project Planning", tags: ["Admin"], date: "18 Feb", comments: 4, files: 2 },
                { title: "Budget Allocation", tags: ["Finance"], date: "20 Feb", comments: 3, files: 1 },
            ],
        },
        {
            title: "InProgress",
            count: 1,
            color: "#FFEECF",
            tasks: [{ title: "Hiring Process", tags: ["HR", "Admin"], date: "15 Feb", comments: 5, files: 2 }],
        },
        {
            title: "Review",
            count: 1,
            color: "#E4CFFF",
            tasks: [{ title: "Policy Updates", tags: ["HR", "Finance"], date: "15 Feb", comments: 1, files: 0 }],
        },
        {
            title: "Approved",
            count: 1,
            color: "#DAFFCF",
            tasks: [{ title: "Final Report", tags: ["HR", "Finance", "Admin"], date: "15 Feb", comments: 0, files: 1 }],
        },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [menuOpen, setMenuOpen] = useState({});
    const [editTaskTitle, setEditTaskTitle] = useState("");
    const [editTaskIndex, setEditTaskIndex] = useState(null);
    const [editColumnIndex, setEditColumnIndex] = useState(null);

    const handleAddTask = () => {
        if (newTaskTitle.trim() === "") return;

        const updatedColumns = columns.map((col) => {
            if (col.title === "Open") {
                return {
                    ...col,
                    tasks: [
                        ...col.tasks,
                        { title: newTaskTitle, tags: ["HR"], date: "15 Feb", comments: 0, files: 0 },
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
        navigate(`/aqs/aqsticketdetails/${task.title}`, { state: { task } });
    };

    const handleMenuClick = (columnIndex) => {
        setMenuOpen({
            ...menuOpen,
            [columnIndex]: !menuOpen[columnIndex],
        });
    };

    const handleEditTask = (columnIndex) => {
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

    const handleDeleteTask = (columnIndex) => {
        if (columnIndex === 0) return;

        const updatedColumns = columns.filter((_, index) => index !== columnIndex);
        setColumns(updatedColumns);
        setMenuOpen({ ...menuOpen, [columnIndex]: false });
    };

    return (
        <div className="kanban-container">
            <div className="kanban-board">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="kanban-column">
                        <div className="kanban-header" style={{ backgroundColor: column.color }}>
                            <div className="kanban-header-left">
                                <span className="column-title">{column.title}</span>
                                <span className="count-badge">{column.count}</span>
                            </div>

                            {column.title === "Open" ? (
                                <div className="kanban-header-right">
                                    <button className="add-task-btn d-flex align-items-center justify-content-center gap-2 Addbutton" onClick={() => setShowTaskInput(true)}>
                                    Add <AiOutlinePlus size={16} />
                                    </button>
                                    <button className="menu-button" onClick={() => handleMenuClick(columnIndex)}>
                                        ⋮
                                    </button>
                                    {menuOpen[columnIndex] && (
                                        <div className="menu-actions">
                                            <button onClick={() => handleEditTask(columnIndex)}>Edit</button>
                                            {columnIndex !== 0 && <button onClick={() => handleDeleteTask(columnIndex)}>Delete</button>}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="kanban-header-right">
                                    <button className="menu-button" onClick={() => handleMenuClick(columnIndex)}>
                                        ⋮
                                    </button>
                                    {menuOpen[columnIndex] && (
                                        <div className="menu-actions">
                                            <button onClick={() => handleEditTask(columnIndex)}>Edit</button>
                                            {columnIndex !== 0 && <button onClick={() => handleDeleteTask(columnIndex)}>Delete</button>}
                                        </div>
                                    )}
                                </div>
                            )}
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
                                    style={ { width :'105px' , marginRight:'5px'}}
                                />
                                <button onClick={handleSaveEdit} style={{backgroundColor:'orange'}}>Save</button>
                                <button  onClick={() => {
                                                    setEditTaskTitle(""); 
                                                    setEditColumnIndex(null); 
                                                }} style={{backgroundColor:'white' , marginLeft : '5px'}}>Cancel</button>
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
                                            {task.tags.map((tag, j) => (
                                                <span
                                                    key={j}
                                                    className="tag-badge"
                                                    style={{ backgroundColor: tagColors[tag] || "#888" }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="task-footer">
                                            <span className="task-date">{task.date}</span>
                                            <span className="task-icons">
                                            <img src={comment} alt="" className="kanbanicon" /> {task.comments} |{" "}
                                            <img src={fileAttach} alt="" className="kanbanicon"/> {task.files}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EngineerKanbanBoard;