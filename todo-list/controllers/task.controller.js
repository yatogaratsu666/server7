const Todo = require('../todo.model');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Todo.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка задач', error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Todo({ title });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при создании задачи', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const updatedTask = await Todo.findByIdAndUpdate(
            id, 
            { title, completed }, 
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Задача с таким ID не найдена' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении задачи', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Todo.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Задача с таким ID не найдена' });
        }

        res.status(200).json({ message: 'Задача успешно удалена', deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении задачи', error: error.message });
    }
};
