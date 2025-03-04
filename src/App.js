import React,{useState} from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setnewTask] = useState("");

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setnewTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return(
    <div className='App'>
    <h1>Todo List</h1>
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setnewTask(e.target.value)}
        placeholder='Enter a new Task'
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}
export default App;
