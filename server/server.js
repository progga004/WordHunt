require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);\

// add mongoose connection


app.use(express.json());

// import routers
const gamesRouter = require("./routers/games-router");
const usersRouter = require("./routers/users-router");

// use routers
app.use("/games", gamesRouter);
app.use("/players", usersRouter);


// start server
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});

