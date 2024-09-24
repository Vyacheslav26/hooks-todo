import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

function TaskList({
  tasks,
  deleteTask,
  toggleEdit,
  updateTask,
  toggleCompleted,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleEdit={toggleEdit}
          updateTask={updateTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
};

export default TaskList;
