const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const UserOtp = require("../../models/Otp")
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
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const data = await ejs.renderFile(path.join(__dirname, "../../views/EmailTemplate.ejs"), { url: "http://localhost:5000", name: req.body.UserName, otp: OTP })
    const mailOptions = {
      from: "jbh.globaliasoft@gmail.com",
      to: req.body.Email,
      subject: "Email Verified",
      html: data
    }
    //User
    const userEmail = await User.find({ Email: req.body.Email })
    if (userEmail.length > 0) {
      res.send({ message: "user is existed in oracle", status: 201 });
      return
    }
    //Email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ error: error, status: false });
      }
    });
    //create user
    const UserCreate = await new User({
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10)
    });
    await UserCreate.save()
    //OTP
    const userotp = new UserOtp({
      userId: UserCreate._id,
      otp: OTP
    })
    userotp.save().then((result) => {
      res.status(200).send({ UserId: result.userId, message: "Successfully send otp", status: true })
    })

  } catch (err) {
    res.json({ result: 0, message: err });
  }
});

//user verified

router.post("/verify/:id", async (req, res) => {

  const userVerify = await User.findOne({ _id: req.params.id });
  if (!userVerify) {
    return res.send({ message: "Please create user" })
  }
  let otpNumber = await UserOtp.findOne({ userId: userVerify._id.toString() });
  if (!otpNumber) {
    return res.status(402).send({ message: "OTP is not existed" })
  }
  if (req.body.Otp === otpNumber.otp) {
    const data = await ejs.renderFile(path.join(__dirname, "../../views/EmailVerify.ejs"), { name: userVerify?.UserName })
    const mailOptions = {
      from: "jbh.globaliasoft@gmail.com",
      to: userVerify?.Email,
      subject: "Congratulations!!",
      html: data
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ error: error, status: false });
      }
    });
    await User.findOneAndUpdate({ _id: req.params.id }, { isVerifed: true });
    let otpNumber = await UserOtp.findOneAndRemove({ userId: userVerify._id });

    res.status(200).send({ message: "User verification is successful", status: true });
  } else {
    res.status(200).send({ message: "OTP is incorrect", status: false });
  }
})

module.exports = router;
