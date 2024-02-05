const express= require("express");
const userRouter= express.Router()
const mod = require('../models');
const User =mod["User"]

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
        const randomUsername = "hello There" // subject to change
        
        // Send a cookie with the random username
        res.cookie('username', randomUsername);
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

module.exports = userRouter;

