import React,{useState} from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setnewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = () => {
    if (newTask.trim() ==="") return;
    setTasks([...tasks, newTask]);
    setnewTask("");
  };
  return(
    <div className="app">
    <h1>Todo List</h1>
    <div className="input-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setnewTask(e.target.value)}
        placeholder='Enter a new Task'
      />
      <button className="add-button" onClick={addTask}>
        Add Task
        </button>
      </div>
      {tasks.length > 0 && (
        <input
          type="text"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
        />
        )}
      <TaskList tasks={tasks} setTasks={setTasks} />
  </div>
  );
}
export default App;
