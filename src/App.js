import React, { useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (description, initialTime) => {
    const newTask = {
      id: Math.random(),
      description,
      completed: false,
      editing: false,
      created: new Date(),
      initialTime,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleEdit = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, editing: !task.editing } : task
      )
    );
  };

  const updateTask = (id, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, description: newDescription, editing: false, created: new Date() }
          : task
      )
    );
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <div>
      <NewTaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleEdit={toggleEdit}
        updateTask={updateTask}
        toggleCompleted={toggleCompleted}
      />
      <Footer
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;
