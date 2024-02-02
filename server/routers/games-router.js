const express = require('express');
const gamesRouter = express.Router();

// get all games
gamesRouter.get("/", (req, res) => {

});

// get specific game
gamesRouter.get("/:id", (req, res) => {

});


// Create game
gamesRouter.post("/", (req, res) => {

})

export default gamesRouter;