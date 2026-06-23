const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAllTasks);

router.post('/todos', taskController.createTask);
router.put('/todos/:id', taskController.updateTask);
router.delete('/todos/:id', taskController.deleteTask);

module.exports = router;
