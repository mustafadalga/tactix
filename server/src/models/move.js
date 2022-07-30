const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        trim: true
    },
    movementID: {
        type: Number,
        required: true,
    },
})

const Movement = mongoose.model('Movement', MovementSchema);

module.exports = Movement