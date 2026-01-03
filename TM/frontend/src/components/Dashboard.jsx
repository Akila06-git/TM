import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Loading from './Loading';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { tasks, loading } = useTasks();

  const stats = useMemo(() => {
    const todo = tasks.filter((t) => t.status === 'Todo').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;

    return { todo, inProgress, completed, total: tasks.length };
  }, [tasks]);

  const barData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Number of Tasks',
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: [
          'rgba(149, 165, 166, 0.8)',
          'rgba(243, 156, 18, 0.8)',
          'rgba(39, 174, 96, 0.8)',
        ],
        borderColor: [
          'rgba(149, 165, 166, 1)',
          'rgba(243, 156, 18, 1)',
          'rgba(39, 174, 96, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: [
          'rgba(149, 165, 166, 0.8)',
          'rgba(243, 156, 18, 0.8)',
          'rgba(39, 174, 96, 0.8)',
        ],
        borderColor: [
          'rgba(149, 165, 166, 1)',
          'rgba(243, 156, 18, 1)',
          'rgba(39, 174, 96, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Statistics',
      },
    },
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Todo</h3>
          <p className="stat-number">{stats.todo}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{stats.completed}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-wrapper">
          <Bar data={barData} options={options} />
        </div>
        <div className="chart-wrapper">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

