import React from "react";
import "./TaskList.css";

function TaskList({ tasks, setTasks, searchQuery }) {
  const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="task-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <li key={index} className="task-item">
            <div>
              <strong>{task.name}</strong>
              <p>Created: {task.createdDate}</p>
              <p>End: {task.endDate}</p>
              <p>Status: {task.status}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))
      ) : (
        searchQuery && <p className="no-results">No matching tasks found.</p>
      )}
    </ul>
  );
}

export default TaskList;