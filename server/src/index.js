require('dotenv').config();
require('./db/index');
const express = require('express');
const path = require('path');
const { createServer } = require("http");
const PORT = process.env.PORT || 3001;
const roomRouter = require('./router/room')

const app = express();
const httpServer = createServer(app);

// Initialize socket.io
const Socket = require("./socket");
new Socket(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(roomRouter);
app.use(express.static(path.resolve(__dirname, '../../client/build')));

httpServer.listen(PORT, () => {
    console.log("App is working.",PORT)
})