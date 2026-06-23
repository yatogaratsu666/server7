const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAllTasks);

router.post('/todos', [
    body('title')
        .trim()
        .notEmpty().withMessage('Название задачи не может быть пустым')
        .isLength({ min: 3 }).withMessage('Название должно содержать минимум 3 символа')
], taskController.createTask);

router.put('/todos/:id', taskController.updateTask);
router.delete('/todos/:id', taskController.deleteTask);

module.exports = router;
