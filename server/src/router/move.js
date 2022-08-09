const express = require('express');
const router = new express.Router();
const Move = require("../models/move");
const Room = require("../models/room");


router.post('/move/create', async (request, response) => {
    try {
        const move = new Move();
        move.roomID = request.body.roomID
        move.moveID = request.body.moveID
        await move.save();
        response.status(200).send(move);
    } catch (error) {
        response.status(400).send({
            message: 'The move could not be created. Please try again later.'
        })
    }
});

router.get('/move/list', async (request, response) => {

    try {
        const move = await Move.find({ roomID: request.query.roomID });
        if (move) {
            response.status(200).send(move);

        } else {
            response.status(404).send({
                message: 'Moves is not found.'
            });
        }
    } catch (error) {
        response.status(400).send({
            message: 'An error occurred during fetching move information. Please try again later.',
        })
    }
});

router.delete('/move/delete',  async (request, response) => {
    try {
        const room = await Move.deleteMany({ roomID: request.query.roomID });

        if (room){
            response.status(200).send(room);

        }else{
            response.status(404).send("Moves is not found");
        }


    } catch (error) {
        response.status(400).send({
            message: 'An error occurred during deleting moves information. Please try again later.',
        })
    }
})

module.exports = router;