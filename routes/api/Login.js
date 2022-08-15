const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/auth.config");
const Event = require("../../models/Event");
const verifyToken = require("../../middleware/authJwt");

router.get("/data", verifyToken, async (req, res) => {
    try {

        console.log(req.user);
        const newEvent = await Event.find()
        res.status(200).json({ Data: newEvent, status: true })
    } catch (error) {
        res.json({ message: error })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ Email });

        if (user && (await bcrypt.compare(Password, user.Password))) {
            const token = jwt.sign({ userId: user }, config.ACCESS_TOKEN_SECRET, {
                expiresIn: config.jwtExpiration
            });
            user.token = token;
            res.status(200).json({ 'token': token, user });
        } else {
            res.send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
