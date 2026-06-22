const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./todo.model');

const app = express();
const PORT = 3000;

app.use(express.json());

const MONGO_URI = 'mongodb://localhost:27017/todo_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Успешное подключение к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

app.post('/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = new Todo({ title });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при создании задачи', error: error.message });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка задач', error: error.message });
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id, 
            { title, completed }, 
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Задача с таким ID не найдена' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении задачи', error: error.message });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Задача с таким ID не найдена' });
        }

        res.status(200).json({ message: 'Задача успешно удалена', deletedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении задачи', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
