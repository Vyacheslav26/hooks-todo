import React from 'react';
import PropTypes from 'prop-types';

function TasksFilter({ filter, setFilter }) {
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => handleFilterChange('all')}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => handleFilterChange('active')}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => handleFilterChange('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
