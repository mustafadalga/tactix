const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    playerLeft: {
        type: String,
        trim: true,
        default: null,
    },
    playerRight: {
        type: String,
        trim: true,
        default: null,
    },
    moveOrder: {
        type: String,
        trim: true,
        default: null,
    },
    winnerPlayer: {
        type: String,
        trim: true,
        default: null,
    },
    isGameStarted: {
        type: Boolean,
        default: false,
    },
    isGameFinished: {
        type: Boolean,
        default: false,
    }
});


const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;