require('dotenv').config();
require('./db/index');
const express = require('express');
const Socket = require("./socket");
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3001;
const roomRouter = require('./router/room')

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api",roomRouter);

if (process.env.NODE_ENV == "PRODUCTION") {
    app.use(express.static(path.resolve(__dirname, '../../client/dist')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
    });
}

const server = app.listen(PORT, () => {
    console.log("App is working.", PORT)
})

// Initialize socket.io
new Socket(server);