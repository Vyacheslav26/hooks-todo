import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ addTask }) {
  const [newTask, setNewTask] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const initialTime = (Number(minutes) * 60) + Number(seconds);
      addTask(newTask, initialTime);
      setNewTask('');
      setMinutes('');
      setSeconds('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
