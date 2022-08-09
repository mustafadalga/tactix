const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        trim: true
    },
    move: {
        row: {
            type: Number,
            required: true,
        },
        col: {
            type: Number,
            required: true,
        },
    },
})

const Move = mongoose.model('Move', MoveSchema);

module.exports = Move