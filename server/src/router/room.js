const express = require('express');
const router = new express.Router();
const Room = require("../models/room")


router.post('/room/create', async (request, response) => {
    try {
        if (!request.body.gameOwner){
            return response.status(400).send({
                message: 'Game owner could not found. Please enter a game owner username!'
            })
        }

        const room = new Room({
            playerLeft: {
                username: request.body.gameOwner
            }
        });
        await room.save();
        response.status(200).send(room);

    } catch (error) {
        response.status(400).send({
            message: 'The room could not be created. Please try again later.'
        })
    }
});

router.get('/room/:id', async (request, response) => {

    try {
        const room = await Room.findById(request.params.id);

        if (room) {
            response.status(200).send(room);

        } else {
            response.status(404).send({
                message: 'Room is not found.'
            });
        }
    } catch (error) {
        response.status(400).send({
            message: 'An error occurred during fetching room information. Please try again later.',
        })
    }
});

module.exports = router;