const { Server } = require("socket.io");
const Room = require("../models/room");
const Move = require("../models/move");
const { generateRandomInteger } = require("../utils");


class Socket {
    constructor (httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: process.env.CLIENT_URL,
                credentials: true
            }
        });
        this.connection();
    }


    connection () {
        this.io.on('connection', (socket) => {

            this.joinRoom(socket);
            this.createMove(socket);
            this.disConnect(socket);
        });
    }

    joinRoom (socket) {
        socket.on('joinRoom', async ({ roomID, username }) => {
            socket.join(roomID);
            socket.emit('message', 'Welcome!');
            socket.broadcast.to(roomID).emit('message', `${username} has joined!`);
            await this.handleRoomInformation(socket.id, roomID, username);
            this.emitRoomInformation(roomID);
            this.emitMoves(roomID);
        });
    }

    createMove (socket) {
        const that = this;

        socket.on('createMove', async ({ roomID, move }) => {

            try {

                const promises = move.map(moveStone => {
                    const moveObject = new Move({
                        roomID: roomID,
                        move: moveStone
                    });
                    return moveObject.save();
                });

                const response = await Promise.all(promises);

                if (!response.length) {
                    return this.io.to(roomID).emit('lastMove', {
                        status: false,
                        message: "The move could not be created. Please try again."
                    });
                }

                this.io.to(roomID).emit('lastMove', {
                    lastMove: response.map(item => item.move),
                    status: true
                });

                await that.changeMoveOrder(roomID);
                that.emitRoomInformation(roomID);

            } catch (error) {
                return this.io.to(roomID).emit('lastMove', {
                    status: false,
                    message: "The move could not be created. Please try again."
                });
            }

        });
    }

    disConnect (socket) {
        socket.on('disconnect', async () => {

            const room = await Room.findOne({
                $or: [
                    { 'playerLeft.socketID': socket.id },
                    { 'playerRight.socketID': socket.id }
                ]
            });

            if (!room) return;

            let player;

            if (room.playerLeft.socketID == socket.id) {
                player = room.playerLeft.username;
                room.playerLeft.socketID = undefined;
            } else if (room.playerRight.socketID == socket.id) {
                player = room.playerRight.username;
                room.playerRight.socketID = undefined;
            }

            await room.save();
            socket.broadcast.to(room._id).emit('message', `${player} has left!`);
        })
    }

    async handleRoomInformation (socketID, roomID, username) {
        try {

            const room = await Room.findById(roomID);

            if (!room) {
                return this.io.to(roomID).emit('roomInformation', {
                    status: false,
                    message: "The room's information could no be  found."
                });
            }

            // Update Username
            if (!room.isGameStarted) {

                if (!room.playerRight.username && room.playerLeft.username != username) {
                    room.playerRight.username = username;
                }
            }

            //Update socketID
            if (room.playerLeft.username == username) {
                room.playerLeft.socketID = socketID;
            } else if (room.playerRight.username == username) {
                room.playerRight.socketID = socketID;
            }


            // Define Move Order and Start Game
            if (!room.isGameStarted && room.playerLeft.username && room.playerRight.username) {
                room.isGameStarted = true;
                room.moveOrder = room[this.getRandomUser()].username;
            }

            await room.save();


        } catch (error) {
            this.io.to(roomID).emit('roomInformation', {
                status: false,
                message: "An error occurred during updating room information.Please refresh the page and try again."
            });
        }
    }


    async emitRoomInformation (roomID) {
        try {
            const room = await Room.findById(roomID);

            if (!room) {
                return this.io.to(roomID).emit('roomInformation', {
                    status: false,
                    message: "The room's information could no be  found."
                });
            }

            this.io.to(roomID).emit('roomInformation', {
                room: room,
                status: true
            });


        } catch (error) {
            this.io.to(roomID).emit('roomInformation', {
                status: false,
                message: "An error occurred during emiting room information.Please refresh the page and try again."
            });
        }
    }

    async emitMoves (roomID) {
        try {
            const moves = await Move.find({ roomID: roomID });

            if (!moves) {
                return this.io.to(roomID).emit('removedStones', {
                    status: false,
                    message: "The room's moves could no be found."
                });
            }

            this.io.to(roomID).emit('removedStones', {
                removedStones: moves.map(move => move.move),
                status: true
            });

        } catch (error) {
            return this.io.to(roomID).emit('removedStones', {
                status: false,
                message: "An error occurred during fetching room's moves.Please refresh the page and try again."
            });
        }

    }


    async changeMoveOrder (roomID) {
        const room = await Room.findById(roomID);

        if (room.moveOrder == room.playerLeft.username) {
            room.moveOrder = room.playerRight.username
        } else if (room.moveOrder == room.playerRight.username) {
            room.moveOrder = room.playerLeft.username
        }

        room.save();
    }

    getRandomUser () {
        const number = generateRandomInteger(1, 2);
        if (number == 1) {
            return 'playerLeft';
        } else if (number == 2) {
            return 'playerRight';
        }
    }
}

module.exports = Socket;