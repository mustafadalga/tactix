const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    playerLeft: {
        socketID: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
        },
        score: {
            type: Number,
            trim: true,
            default: 0,
        }
    },
    playerRight: {
        socketID: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
        },
        score: {
            type: Number,
            trim: true,
            default: 0,
        }
    },
    moveOrder: {
        type: String,
        trim: true,
    },
    winnerPlayer: {
        type: String,
        trim: true,
    },
    isGameStarted: {
        type: Boolean,
        default: false,
    },
    isGameFinished: {
        type: Boolean,
        default: false,
    },
});


const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;