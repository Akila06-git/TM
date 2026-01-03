import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = async () => {
    const result = await updateTask(task.id, { title, status });
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Todo':
        return 'status-todo';
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-input"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="edit-select"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="edit-actions">
            <button onClick={handleUpdate} className="btn-save">
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(task.title);
                setStatus(task.status);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3>{task.title}</h3>
            <span className={`status-badge ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;

