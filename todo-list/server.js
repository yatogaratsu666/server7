const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task.routes'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);

const MONGO_URI = 'mongodb://localhost:27017/todo_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Успешное подключение к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
