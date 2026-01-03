const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// All task routes require authentication
router.use(authenticate);

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

