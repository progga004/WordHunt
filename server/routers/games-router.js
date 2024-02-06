const express = require('express');
const gamesRouter = express.Router();
const Game = require('../models')["Game"]; 

// get all games
gamesRouter.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// get specific game
gamesRouter.get("/:id", async (req, res) => {
    try {
        let game = await Game.findById(req.params.id);
        if (game === null)
            res.status(404).json({ message: "Cannot find game"});
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});


// Create game
gamesRouter.post("/", async (req, res) => {
    let game = new Game({
        player1: req.body.player1,
        player2: req.body.player2,
        moves: req.body.moves,
        winner: req.body.winner,
        starttime: req.body.starttime,
        endtime: req.body.endttime,
        messages: req.body.messages,
        p1word: req.body.p1word,
        p2word: req.body.p2word
    });
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = gamesRouter;