const express= require("express");
const userRouter= express.Router()
const mod = require('../models');
const User =mod["User"]


userRouter.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
      } catch (err) {
        res.status(500).send(err);
      }
});
userRouter.get("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.json(user);
      } catch (err) {
        res.status(500).send(err);
      }
});

userRouter.get("/login", async (req,res)=>{
    try {
        let username = await req.params.username;
        res.json(username);
    }
    catch (err) {
    res.status(500).send(err);
}
})

userRouter.post("/", async (req, res) => {
    let user = new User({
        username: req.body.username,
        game: req.body.game
    });
    try {
        const newUser = await User.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = userRouter;

