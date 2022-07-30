const express = require('express');
const path = require('path');
require('dotenv').config();
require('./db/index');

const roomRouter = require('./router/room')
const moveRouter = require('./router/move')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(roomRouter);
app.use(moveRouter);
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.listen(PORT, () => {
    console.log("App is working.",PORT)
})