require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const handleSocketConnection = require('./socket');

const app = express();
const server = http.createServer(app);
console.log(process.env.DATABASE_URL);

// add mongoose connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log('Connected to Database'))

app.use(express.json());
app.use(cookieParser());

// import routers
const gamesRouter = require("./routers/games-router");
const userRouter = require("./routers/users-router");

// use routers
app.use("/games", gamesRouter);
app.use("/users", userRouter);


// socket handlers
handleSocketConnection(server);

// start server
server.listen(3000, () => {
    console.log("Server listening on port 3000");
});

