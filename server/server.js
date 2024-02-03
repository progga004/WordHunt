require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
console.log(process.env.DATABASE_URL);

// add mongoose connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log('Connected to Database'))

app.use(express.json());

// import routers
const gamesRouter = require("./routers/games-router");

// use routers
app.use("/games", gamesRouter);

// start server
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});

