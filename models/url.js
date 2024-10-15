const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ 
        timestamp: { type: Date }  // Changed to Date type for better timestamp handling
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
