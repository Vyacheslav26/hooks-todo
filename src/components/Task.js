import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, deleteTask, toggleEdit, updateTask, toggleCompleted }) {
  const [newDescription, setNewDescription] = useState(task.description);
  const [formattedDate, setFormattedDate] = useState(formatDistanceToNow(task.created, { addSuffix: true }));
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem(`task-${task.id}-timer`);
    return savedTimer ? parseInt(savedTimer, 10) : task.initialTime || 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem(`task-${task.id}-isRunning`);
    return savedIsRunning === 'true';
  });
  const editInputRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (task.editing) {
      editInputRef.current.focus();
    }
  }, [task.editing]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(formatDistanceToNow(task.created, { addSuffix: true }));
    }, 1000);

    return () => clearInterval(interval);
  }, [task.created]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          localStorage.setItem(`task-${task.id}-timer`, newTimer);
          localStorage.setItem(`task-${task.id}-lastUpdated`, Date.now());
          return newTimer;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, task.id]);

  useEffect(() => {
    localStorage.setItem(`task-${task.id}-isRunning`, isRunning);
  }, [isRunning, task.id]);

  useEffect(() => {
    const savedTimer = localStorage.getItem(`task-${task.id}-timer`);
    const savedLastUpdated = localStorage.getItem(`task-${task.id}-lastUpdated`);
    const savedIsRunning = localStorage.getItem(`task-${task.id}-isRunning`);

    if (savedTimer && savedLastUpdated) {
      const lastUpdated = parseInt(savedLastUpdated, 10);
      const elapsedTime = Math.floor((Date.now() - lastUpdated) / 1000);
      setTimer(parseInt(savedTimer, 10) + elapsedTime);
    }

    if (savedIsRunning === 'true') {
      setIsRunning(true);
    }
  }, [task.id]);

  const handleEditChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, newDescription);
  };

  const handleEditClick = () => {
    toggleEdit(task.id);
  };

  const handleDescriptionClick = () => {
    toggleCompleted(task.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDescriptionClick();
    }
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />
        <label htmlFor={`task-${task.id}`}>
          {task.editing ? (
            <input
              id={`task-${task.id}`}
              className="editDescription"
              value={newDescription}
              onChange={handleEditChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditSubmit(e);
                }
              }}
            />
          ) : (
            <span
              className="description"
              onClick={handleDescriptionClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {newDescription}
            </span>
          )}
          <button
            className="icon icon-start"
            onClick={handleStartTimer}
            type="button"
            aria-label="Start timer"
          >
            ▶
          </button>
          <button
            className="icon icon-stop"
            onClick={handleStopTimer}
            type="button"
            aria-label="Stop timer"
          >
            ⏸
          </button>
          <span>{formatTime(timer)}</span>
          <span className="created">created {formattedDate}</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={handleEditClick}
          type="button"
          aria-label="Edit task"
        />
        <button
          className="icon icon-destroy"
          onClick={() => deleteTask(task.id)}
          type="button"
          aria-label="Delete task"
        />
      </div>
      {task.editing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="edit"
            value={newDescription}
            onChange={handleEditChange}
            ref={editInputRef}
          />
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    initialTime: PropTypes.number,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
};

export default Task;
