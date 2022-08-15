const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    UserName: {
      type: String,
      // require: true,
    },
    Cname: {
      type: String
    },
    PhoneNo: {
      type: String
    }
    ,
    Email: {
      type: String,
      // require: true,
      unique: true,
    },
    Password: {
      type: String,
      // require: true,
    },
    isVerifed: {
      type: Boolean,
      default: false
    },
  })
);

module.exports = User;
