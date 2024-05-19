const mongoose = require("mongoose");
require('../db/conn')

//A real estate content management schema//
const TaskSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    structure: {
        type: String,
        required: true
    },


    price: {
        type: String,
        required: true
    },


    content: {
        type: String,
        required: true
    },
 

    address: {
        type: String,
        required: true
    }, 


    size: {
        type: String,
        required: true
    },


    room: {
        type: String,
        required: true
    },


    bath: {
        type: String,
        required: true
    },


    image: {
        type: String,
        required: true
    },


    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Task = module.exports = mongoose.model('Task', TaskSchema);
module.exports = { Task };