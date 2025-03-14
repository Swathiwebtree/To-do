import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [tasks, setTasks] = useState(() =>{

    const SavedTasks = localStorage.getItem("tasks");
    return  SavedTasks  ? JSON.parse(SavedTasks):[];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const createdDate = new Date().toISOString();
  const [newTask, setNewTask] = useState({
    name: "",
    createdDate,
    endDate: "",
    status: "New",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  


  const openModal = () => {
    setNewTask({ 
      name: "",
      createdDate, 
      endDate: "", 
      status: "New" 
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  

  const validateForm = () => {
    let newErrors = {};
    const createdDate = new Date(newTask.createdDate);
    const endDate = new Date(newTask.endDate);
  
    if (!newTask.name.trim()) newErrors.name = "Task name is required.";
    if (!newTask.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (endDate < createdDate) {
      newErrors.endDate = "End date cannot be earlier than the created date.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  const saveTask = () => {
    if (validateForm()) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setModalIsOpen(false);
    }
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const deleteTask = () => {
    if (deleteIndex !== null){
    setTasks((prevTasks)=> prevTasks.filter((_, i) => i !== deleteIndex));
    setDeleteModalOpen(false);
    setDeleteIndex(null);
    }
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

      <TaskList tasks={tasks} confirmDelete={confirmDelete} searchQuery={searchQuery} setNewTask={setNewTask} setModalIsOpen={setModalIsOpen}/>
      <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModal} 
      className="modal" 
      >
        <h3>Add New Task</h3>
        <form>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          required
        />

        {errors.name && <p className="error">{errors.name}</p>}     
        <label><strong>Select End Date:</strong></label>
        <input
          placeholder="End Date"
          type="date"
          value={newTask.endDate}
          onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
          min={new Date().toISOString().split("T")[0]} 
          required
        />
        {errors.endDate && <p className="error">{errors.endDate}</p>}
        <button className="save-btn" type="button" onClick={saveTask} disabled={!newTask.name || !newTask.endDate}
        style={{backgroundColor: (!newTask.name || !newTask.endDate) ? "grey" : "blue"}}
        >
        Save
        </button>

          <button className="close-btn" type="button" onClick={closeModal}>Close</button>
        </form>
      </Modal>

      <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)} className="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this task?</p>
        <button className="delete-confirm-btn" onClick={deleteTask}>Yes</button>
        <button className="close-btn" onClick={() => setDeleteModalOpen(false)}>No</button>
      </Modal>
    </div>
  );
}

export default App;
