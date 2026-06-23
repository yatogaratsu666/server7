const Todo = require('../todo.model');
const { validationResult } = require('express-validator');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Todo.find().sort({ createdAt: -1 });
        res.status(200).render('index', { todos: tasks, errors: null });
    } catch (error) {
        res.status(500).send('Ошибка при получении списка задач: ' + error.message);
    }
};

exports.createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const tasks = await Todo.find().sort({ createdAt: -1 });
            return res.status(400).render('index', { 
                todos: tasks, 
                errors: errors.array() 
            });
        }

        const { title } = req.body;
        const newTask = new Todo({ title });
        await newTask.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).send('Ошибка при создании задачи: ' + error.message);
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updatedTask = await Todo.findByIdAndUpdate(
            id, 
            { completed: completed === 'true' }, 
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).send('Задача с таким ID не найдена');
        }
        res.redirect('/');
    } catch (error) {
        res.status(400).send('Ошибка при Побновлении задачи: ' + error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Todo.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send('Задача с таким ID не найдена');
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Ошибка при удалении задачи: ' + error.message);
    }
};
