const mongoose = require("mongoose");
const default_fields = require("./default_fields ");

const Event = mongoose.model(
  "fabric",
  new mongoose.Schema({
    FabricName: {
      type: String,
    },
    BillNo: {
      type: String,
    },
    PhoneNo: {
      type: String,
    },
    Price: {
      type: String,
    },
    S: {
      type: String,
    },
    M: {
      type: String,
    },
    L: {
      type: String,
    },
    XL: {
      type: String,
    },
    PendingS: {
      type: String,
    },
    PendingM: {
      type: String,
    },
    PendingL: {
      type: String,
    },
    PendingXL: {
      type: String,
    },
    Tailor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    ...default_fields,
    // UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  })
);

module.exports = Event;
