const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

router.get("/data", async (req, res) => {
    try {
        const newEvent = await Event.find()
        res.status(200).json({ Data: newEvent, status: true })
    } catch (error) {
        res.json({ message: error })
    }
})

router.post("/create", async (req, res) => {
    try {
        const userData = req.body
        const newEvent = await new Event(userData)
        await newEvent.save()
        res.status(200).json({ Message: "Successfully make event " })
    } catch (error) {
        res.json({ message: error })
    }
})

router.put("/editEvent/:id", async (req, res) => {
    try {
        const userData = req.body
        const newEvent = await Event.updateMany({ _id: req.params.id }, userData)
        res.status(200).json({ Message: "Successfully edit event " })
    } catch (error) {
        res.json({ message: error })
    }
})

router.delete("/deleteEvent/:id", async (req, res) => {
    try {
        const userData = req.body
        const newEvent = await Event.deleteOne({ _id: req.params.id })
        res.status(200).json({ Message: "Successfully delete event " })
    } catch (error) {
        res.json({ message: error })
    }
})

module.exports = router;
