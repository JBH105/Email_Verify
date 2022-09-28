const mongoose = require("mongoose");
const default_fields = require("./default_fields ");

const Event = mongoose.model(
  "bill",
  new mongoose.Schema({
    FirstName: {
      type: String,
    },
    Number: {
      type: String,
    },
    Product: [
      {
        name: String,
        price: String,
        quantity: String,
      },
    ],
    Date: {
      type: String,
    },
    Amount: {
      type: String,
    },
    Status: { type: String },
    ...default_fields,
    // UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  })
);

module.exports = Event;
