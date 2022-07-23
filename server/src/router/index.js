const express = require('express');
const router = new express.Router();
const Room = require('../models/room');


router.post('/create-room', async (request, response) => {
    try {
        const room = new Room();
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

router.patch('/room/:id', async (request, response) => {
    const allowedUpdates = [ 'playerLeft','playerRight', 'moveOrder', 'winnerPlayer', 'isGameStarted', 'isGameFinished' ];
    const updates = Object.keys(request.body);
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));

    if (!isValidOperation) {
        return response.status(404).send({
            message: 'Invalid updated!'
        });
    }

    try {
        const room = await Room.findById(request.params.id);

        if (!room) {
            return response.status(404).send({
                message: 'Room is not found.'
            });
        }

        updates.forEach(update => room[update] = request.body[update]);
        await room.save();

        response.status(200).send(room );

    } catch (error) {
        response.status(400).send({
            message: 'An error occurred during updating room information. Please try again later.',
        })
    }
});


router.delete('/room/:id',  async (request, response) => {
    try {
        const room = await Room.findByIdAndDelete(request.params.id);

        if (room){
            response.status(200).send(room);

        }else{
            response.status(404).send("Room is not found");
        }


    } catch (error) {
        response.status(400).send({
            message: 'An error occurred during deleting room information. Please try again later.',
        })
    }
})


module.exports = router;