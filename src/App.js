import React, { useState } from "react";
import TaskList from "./TaskList";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    createdDate: "",
    endDate: "",
    status: "New",
  });

  const openModal = () => {
    setNewTask({ name: "", createdDate: "", endDate: "", status: "New" });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveTask = () => {
    if (!newTask.name || !newTask.createdDate || !newTask.endDate) {
      alert("Please fill all fields!");
      return;
    }

    setTasks([...tasks, newTask]);
    closeModal();
  };

  return (
    <div className="app">
      <h2>To-Do List</h2>

      <button className="add-btn" onClick={openModal}>Add Task</button>

      {tasks.length > 0 && (
        <input
          type="text"
          className="search-bar"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}

      <TaskList tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} />

      <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModal} 
      className="modal" 
      style={{border: "1px solid red",zIndex:'99'}}>
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          placeholder="Created Date"
          type="date"
          value={newTask.createdDate}
          onChange={(e) => setNewTask({ ...newTask, createdDate: e.target.value })}
        />
        <input
          placeholder="End Date"
          type="date"
          value={newTask.endDate}
          onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
        />
        <button className="save-btn" onClick={saveTask}>Save</button>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
