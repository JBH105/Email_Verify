const mongoose = require("mongoose");

const Event = mongoose.model(
    "event",
    new mongoose.Schema({
        FirstName: {
            type: String,
        },
        LastName: {
            type: String,
        },
        Role: {
            type: String,
            enum: ['Designer', 'Art Designer'],
            default: 'Designer'
        },
        UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    })
);

module.exports = Event;
