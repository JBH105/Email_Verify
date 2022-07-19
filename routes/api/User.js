const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path =require('path')

const transportera = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "jbhpatel2001@gmail.com",
    pass: "Jbh@2001",
  },
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jbh.globaliasoft@gmail.com",
    pass: "yrfjthzxtqqocqyn",
  },
});
router.post("/createUser", async (req, res) => {
    const data = await ejs.renderFile(path.join(__dirname, "../../views/EmailTemplate.ejs"),{url:"http://localhost:5000" ,name:"Jaydeep Bhayani"})
    const mailOptions = {
        from: "jbh.globaliasoft@gmail.com",
        to: "jbh.globaliasoft@gmail.com",
        subject: "Sending Email using Node.js",
        html: data
    }
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({ error: error, status: false });
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent: " + info.response);
      }
    });
    // const userEmail = await User.find({ Email: req.body.Email }).then(
    //   (result) => {
    //     if (result.length > 0) {
    //       res.send({ message: "user is existed in oracle", status: 201 });
    //     }
    //     const userData = req.body;
    //     const UserCreate = new User(userData);
    //     UserCreate.save().then((result) => {
    //       res.status(200).send({ data: result, status: true });
    //     });
    //   }
    // );
  } catch (err) {
    res.json({ result: 0, message: err });
  }
});

module.exports = router;
