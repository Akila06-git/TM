const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const validStatuses = ['Todo', 'In Progress', 'Completed'];
    const taskStatus = status && validStatuses.includes(status) ? status : 'Todo';

    const task = await Task.create({
      title: title.trim(),
      status: taskStatus,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) {
      if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      task.title = title.trim();
    }

    if (status !== undefined) {
      const validStatuses = ['Todo', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      task.status = status;
    }

    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};

