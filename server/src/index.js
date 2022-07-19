const express = require('express');
const path = require('path');
require('dotenv').config();

const router = require('./router')
const app = express();
const PORT = process.env.PORT || 3001;


app.use(router);
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.listen(PORT, () => {
    console.log("App is working.")
})