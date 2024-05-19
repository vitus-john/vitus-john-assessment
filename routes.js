const express = require('express');
const router = express.Router();
const fs = require('fs');
const uploads = require('multer');
const auth = require("./middleware/auth");
const multer = require('multer');
const upload = multer({dest: "uploads/"});
router.use('/uploads', express.static('uploads'));
const jwt = require('jsonwebtoken')
require("dotenv").config();
const mongoose = require('mongoose');
const { Task } = require('./models/task');


router.get('/task', async(req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get('/task/:id', auth, async(req, res) => {
     // Add authentication and authorization logic here to ensure that only admin users can edit posts
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});


router.post('/task',  upload.single('image'), async(req, res) => {
     // Add authentication and authorization logic here to ensure that only admin users can add posts
    const newTask= new Task({
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
    newTask.save()
        .then(() => {
            res.status(200).json(newTask);
        })
        .catch(err => {
            console.error(err);
        });
});


router.post('/task/:id', upload.single('image'), async(req, res) => {
  // Add authentication and authorization logic here to ensure that only admin users can edit posts
    Task.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        structure: req.body.structure,
        price: req.body.price,
        content: req.body.content,
        address: req.body.address,
        size: req.body.size,
        room: req.body.room,
        bath: req.body.bath,
        image: req.file.filename
        })
        .then(() => {
            res.status(200).json(Task);
        })
        .catch(err => {
            console.error(err); 
        });
});

router.delete('/task/:id',  async(req, res) => {
  // Add authentication and authorization logic here to ensure that only admin users can delete posts
  try {

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;