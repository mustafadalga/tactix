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
        this.numberOfStones = 16;
        this.connection();
    }


    connection () {
        this.io.on('connection', (socket) => {

            this.joinRoom(socket);
            this.startNewGame(socket);
            this.exitGame(socket);
            this.createMove(socket);
            this.disConnect(socket);
        });
    }

    joinRoom (socket) {
        socket.on('joinRoom', async ({ roomID, username }) => {
            socket.join(roomID);
            socket.emit('message', 'Welcome!');
            socket.broadcast.to(roomID).emit('message', `${username} has joined!`);
            const roomStatus = await this.handleRoomInformation(socket, roomID, username);
            if (roomStatus) {
                this.emitRoomInformation(roomID);
                this.emitMoves(roomID);
            }
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
                    return socket.emit('lastMove', {
                        status: false,
                        message: "The move could not be created. Please try again !"
                    });
                }

                this.io.to(roomID).emit('lastMove', {
                    lastMove: response.map(item => item.move),
                    status: true
                });


                await that.changeMoveOrder(roomID);
                await that.checkAndHandleGameStatus(socket, roomID);
                that.emitRoomInformation(roomID);


            } catch (error) {
                return socket.emit('lastMove', {
                    status: false,
                    message: "The move could not be created. Please try again."
                });
            }

        });
    }


    startNewGame (socket) {
        socket.on('startNewGame', async ({ roomID }) => {
            try {
                const room = await Room.findById(roomID);

                if (!room) {
                    return socket.emit('roomInformation', {
                        status: false,
                        message: "The room's information could not be found!"
                    });
                }

                room.isGameFinished = false;
                room.isGameStarted = true;
                room.winnerPlayer = undefined;
                room.moveOrder = room[this.getRandomUser()].username;
                await room.save();
                await Move.deleteMany({ roomID: roomID });

                this.emitRoomInformation(roomID);
                this.emitMoves(roomID);
                this.io.to(roomID).emit('message', 'New game has started!');


            } catch (error) {
                socket.emit('roomInformation', {
                    status: false,
                    message: "An error occurred during starting new game.Please refresh the page and try again."
                });
            }
        })
    }

    exitGame (socket) {
        socket.on("exitGame", async ({ roomID, username }) => {

            try {
                const room = await Room.findByIdAndDelete(roomID);
                await Move.deleteMany({ roomID: roomID });

                if (!room) {
                    return socket.emit('gameExit', {
                        status: false,
                        message: "The room could no be found!.",
                    });
                }

                socket.emit('gameExit', {
                    status: true
                });

                this.io.to(roomID).emit("showGameExitWarning", {
                    status: true,
                    username:username,
                    message: "Your opponent has finished the game!"
                });

            } catch (error) {
                socket.emit('gameExit', {
                    status: false,
                    message: "An error occurred during exiting game.Please refresh the page and try again!"
                });
            }
        });
    }

    async handleRoomInformation (socket, roomID, username) {
        let status = false;

        try {

            const room = await Room.findById(roomID);

            if (!room) {
                return socket.emit('roomInformation', {
                    status: false,
                    message: "The room's information could not be found!"
                });
            }

            // Check username authorization
            if (room.isGameStarted) {
                if (![ room.playerLeft.username, room.playerRight.username ].includes(username)) {
                    return socket.emit('roomInformation', {
                        status: false,
                        message: "You are not authorized to enter this game!"
                    });
                }
            }

            // Update Username
            if (!room.isGameStarted) {

                if (!room.playerRight.username && room.playerLeft.username != username) {
                    room.playerRight.username = username;
                }
            }

            //Update socketID
            if (room.playerLeft.username == username) {
                room.playerLeft.socketID = socket.id;
            } else if (room.playerRight.username == username) {
                room.playerRight.socketID = socket.id;
            }

            // Define Move Order and Start Game
            if (!room.isGameStarted && room.playerLeft.username && room.playerRight.username) {
                room.isGameStarted = true;
                room.moveOrder = room[this.getRandomUser()].username;
            }

            await room.save();
            status = true;

        } catch (error) {
            socket.emit('roomInformation', {
                status: false,
                message: "An error occurred during updating room information.Please refresh the page and try again."
            });
        } finally {
            return status;
        }
    }


    async emitRoomInformation (roomID) {
        try {
            const room = await Room.findById(roomID);

            this.io.to(roomID).emit('roomInformation', {
                room: room,
                status: true
            });


        } catch (error) {
            this.io.to(roomID).emit('roomInformation', {
                status: false,
                message: "An error occurred during emiting room information. Please refresh the page and try again!"
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

    async checkAndHandleGameStatus (socket, roomID) {
        try {
            const moves = await Move.find({ roomID: roomID });
            const room = await Room.findById(roomID);
            if (moves.length == this.numberOfStones) {

                room.isGameFinished = true;
                room.isGameStarted = false;
                room.winnerPlayer = room.moveOrder;
                room.moveOrder = undefined;

                if (room.winnerPlayer == room.playerLeft.username) {
                    room.playerLeft.score += 1;
                } else if (room.winnerPlayer == room.playerRight.username) {
                    room.playerRight.score += 1;
                }

                await room.save();
            }

        } catch (error) {
            socket.emit('message', 'An error occurred during checking game status!');
        }
    }

    getRandomUser () {
        const number = generateRandomInteger(1, 2);
        if (number == 1) {
            return 'playerLeft';
        } else if (number == 2) {
            return 'playerRight';
        }
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
            socket.broadcast.to(room._id.toString()).emit('message', `${player} has left!`);
        })
    }
}

module.exports = Socket;