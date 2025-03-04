import React from "react";
import "./TaskList.css";

function TaskList({ tasks, setTasks }) {
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <p>{task}</p>
          <button className="delete-btn"onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
export default TaskList;