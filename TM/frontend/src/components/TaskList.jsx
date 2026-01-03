import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import './TaskList.css';

const TaskList = () => {
  const { tasks, loading, error } = useTasks();
  const [filter, setFilter] = useState('All');

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks ({filteredTasks.length})</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {error && <ErrorMessage message={error} />}
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">No tasks found</div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

