require('dotenv').config();
require('./db/index');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require("http");
const PORT = process.env.PORT || 3001;
const roomRouter = require('./router/room')

const app = express();
const httpServer = createServer(app);

// Initialize socket.io
const Socket = require("./socket");
new Socket(httpServer);


const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(roomRouter);
app.use(express.static(path.resolve(__dirname, '../../client/build')));

httpServer.listen(PORT, () => {
    console.log("App is working.",PORT)
})