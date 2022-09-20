const mongoose = require("mongoose");

const Event = mongoose.model(
    "bill",
    new mongoose.Schema({
        FirstName: {
            type: String,
        },
        LastName: {
            type: String,
        },
        Product: [{
            name: String,
            price: String,
            quantity: String
        }],
        Date: {
            type: String
        },
        // UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    })
);

module.exports = Event;
