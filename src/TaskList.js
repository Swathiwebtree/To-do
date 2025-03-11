import React from "react";
import "./TaskList.css";

function TaskList({ tasks, confirmDelete, searchQuery }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  const filteredTasks = tasks.filter((task) =>
    task?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="task-list">
      {filteredTasks.length > 0 &&
        filteredTasks.map((task, index) => (
          <div key={index} className="task-item">
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Created Date:</strong> {formatDate(task.createdDate)}</p>
            <p><strong>End Date:</strong> {formatDate(task.endDate)}</p>
            <p><strong>Status:</strong> {task.status}</p>

            <button className="delete-btn" onClick={() => confirmDelete(index)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default TaskList;
