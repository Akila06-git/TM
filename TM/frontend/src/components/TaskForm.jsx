import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskForm.css';

const TaskForm = () => {
  const { createTask } = useTasks();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Todo');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const result = await createTask(title.trim(), status);
    if (result.success) {
      setTitle('');
      setStatus('Todo');
    } else {
      setError(result.error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn-primary">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;

