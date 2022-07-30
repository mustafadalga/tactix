const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        trim: true
    },
    moveID: {
        type: Number,
        required: true,
    },
})

const Move = mongoose.model('Move', MoveSchema);

module.exports = Move