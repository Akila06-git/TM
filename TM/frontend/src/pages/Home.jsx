import React from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Dashboard from '../components/Dashboard';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <TaskProvider>
      <div className="home-container">
        <header className="app-header">
          <h1>Task Management</h1>
          <div className="header-actions">
            <span className="user-email">{user?.email}</span>
            <button onClick={logout} className="btn-logout">
              Logout
            </button>
          </div>
        </header>
        <main className="app-main">
          <Dashboard />
          <div className="tasks-section">
            <TaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default Home;

