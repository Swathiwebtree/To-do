import React,{useState} from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setnewTask] = useState("");

  const addTask = () => {
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
        placeholder='Enter a new Task now'
      />
      <button className="add-button" onClick={addTask}>
        Add Task
        </button>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
  </div>
  );
}
export default App;
