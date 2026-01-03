import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTasks();
    }
  }, []);

  const createTask = async (title, status = 'Todo') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/tasks', { title, status });
      setTasks([response.data, ...tasks]);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

