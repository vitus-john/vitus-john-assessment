const mongoose = require("mongoose");
require('../db/conn')

//user schema//
const TaskUserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    
    lastname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    password2: {
        type: String,
        required: true
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    role: { // Add a field for user role
        type: String,
        enum: ['admin', 'user'], // Define allowed roles
        default: 'user'
    }

});

const TaskUser = module.exports = mongoose.model('TaskUser', TaskUserSchema);
module.exports = { TaskUser }; 