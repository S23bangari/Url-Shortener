const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type:String,
        require:true,
        default:"NORMAL" ,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);  // Use a capitalized name for the model

module.exports = User;
