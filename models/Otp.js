const mongoose = require("mongoose");

const OTP = mongoose.model(
    "otp",
    new mongoose.Schema({
        otp: {
            type: Number

        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
    })
);

module.exports = OTP;
