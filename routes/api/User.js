const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
const bcrypt = require('bcrypt')


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jbh.globaliasoft@gmail.com",
    pass: "yrfjthzxtqqocqyn",
  },
});
router.post("/createUser", async (req, res) => {
  try {
    const data = await ejs.renderFile(path.join(__dirname, "../../views/EmailTemplate.ejs"), { url: "http://localhost:5000", name: "Jaydeep Bhayani" })
    const mailOptions = {
      from: "jbh.globaliasoft@gmail.com",
      to: "jbh.globaliasoft@gmail.com",
      subject: "Sending Email using Node.js",
      html: data
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ error: error, status: false });
      } else {
        res.send("Email sent: " + info.response);
      }
    });
    const userEmail = await User.find({ Email: req.body.Email })
    if (userEmail.length > 0) {
      res.send({ message: "user is existed in oracle", status: 201 });
    } else {
      const UserCreate = await new User({
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 10)
      });
      await UserCreate.save()
      res.status(200).send({ data: UserCreate, status: true });
    }
  } catch (err) {
    res.json({ result: 0, message: err });
  }
});

module.exports = router;
