const express= require("express");
const userRouter= express.Router()
const mod = require('../models');
const User =mod["User"]
const fs = require('fs');

// returns all user records
userRouter.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
      } catch (err) {
        res.status(500).send(err);
      }
});

userRouter.get("/login", (req,res)=> {
    // Check if the user has a cookie with a key of "username"
    const existingUsername = req.cookies.username;
    console.log(existingUsername);

    if (existingUsername) {
        // If the user has a cookie, assign the existing username to them
        res.cookie('username', existingUsername);
    } else {
        // If the user does not have a cookie, generate a random username
        const random = randomUsername()// subject to change
        
        // Send a cookie with the random username
        res.cookie('username', random);
    }
});

// finds user with id
userRouter.get("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.json(user);
      } catch (err) {
        res.status(500).send(err);
      }
});


// creates user
userRouter.post("/", async (req, res) => {
    let user = new User({
        username: req.body.username,
        games: req.body.games
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

const randomUsername = () => {
    let words = fs.readFileSync("./sgb-words.txt", "utf-8").split("\n");
    let randomNumber = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    let randomWords = `${words[Math.floor(Math.random() * words.length)]}${words[Math.floor(Math.random() * words.length)]}${randomNumber}`
    return randomWords;
}

module.exports = userRouter;

