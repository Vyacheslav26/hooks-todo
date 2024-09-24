import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './TasksFilter';

function Footer({ tasks, filter, setFilter, clearCompleted }) {
  const itemsLeft = tasks.filter((task) => !task.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter filter={filter} setFilter={setFilter} />
      <button
        className="clear-completed"
        onClick={clearCompleted}
        type="button"
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
