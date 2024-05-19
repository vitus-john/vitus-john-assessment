const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require("./middleware/auth");
const { Task } = require('./models/task');

// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

// Get all tasks
router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get task by ID
router.get('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/task', auth, checkAdmin, upload.single('image'), async (req, res) => {
    const newTask = new Task({
        type: req.body.type,
        structure: req.body.structure,
        price: req.body.price,
        content: req.body.content,
        address: req.body.address,
        size: req.body.size,
        room: req.body.room,
        bath: req.body.bath,
        image: req.file.filename
    });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task by ID
router.post('/task/:id', auth, checkAdmin, upload.single('image'), async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            type: req.body.type,
            structure: req.body.structure,
            price: req.body.price,
            content: req.body.content,
            address: req.body.address,
            size: req.body.size,
            room: req.body.room,
            bath: req.body.bath,
            image: req.file.filename
        }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a task by ID
router.delete('/task/:id', auth, checkAdmin, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
