const { Server } = require("socket.io");
const Room = require("../models/room");
const Move = require("../models/move");


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
            this.emitRoomInformation(roomID,username);
            this.emitMoves(roomID);

        });
    }

    createMove (socket) {
        socket.on('createMove', async ({ roomID, move }) => {

            try {
                const moveObject = new Move({
                    roomID: roomID,
                    move: move
                });
                await moveObject.save();


                if (!moveObject) {
                    return this.io.to(roomID).emit('move', {
                        status: false,
                        message: "The move could not be created. Please try again."
                    });
                }

                this.io.to(roomID).emit('move', {
                    move: moveObject.move,
                    status: true
                });


            } catch (error) {
                return this.io.to(roomID).emit('move', {
                    status: false,
                    message: "The move could not be created. Please try again."
                });
            }

        });
    }

    disConnect (socket) {
        socket.on('disconnect', () => {
            console.log(" disconnect");
        })
    }

    async emitRoomInformation (roomID,username) {
        try {
            const room = await Room.findById(roomID);

            if (!room) {
                return this.io.to(roomID).emit('roomInformation', {
                    status: false,
                    message: "The room's information could no be  found."
                });
            }

            let player;

            if (!room.playerLeft && room.playerRight != username) {
                player = "playerLeft";
                room.playerLeft = username;
                room.save();
            } else if (!room.playerRight && room.playerLeft != username) {
                player = "playerRight";
            }

            if (player) {
                room[player] = username;
                room.save();
            }


            console.log(6,room)

            this.io.to(roomID).emit('roomInformation', {
                room: room,
                status: true
            });

        } catch (error) {
            console.log(error)
            return this.io.to(roomID).emit('roomInformation', {
                status: false,
                message: "An error occurred during fetching room information.Please refresh the page and try again."

            });
        }

    }
    async emitMoves(roomID){
        try {
            const moves = await Move.find({ roomID: roomID });

            if (!moves) {
                return this.io.to(roomID).emit('moves', {
                    status: false,
                    message: "The room's moves could no be found."
                });
            }

            this.io.to(roomID).emit('moves', {
                moves: moves.map(move => move.move),
                status: true
            });

        } catch (error) {
            return this.io.to(roomID).emit('moves', {
                status: false,
                message: "An error occurred during fetching room's moves.Please refresh the page and try again."
            });
        }

    }
}

module.exports = Socket;