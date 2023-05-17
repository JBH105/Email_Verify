const express = require("express");
const router = express.Router();
const User = require("../../models/user.model");
const UserOtp = require("../../models/Otp")
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

const { EmailAuth } = require("../../controllers/email.controllers");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jbh.globaliasoft@gmail.com",
    pass: "yrfjthzxtqqocqyn",
  },
});
router.post("/createuser", async (req, res) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const data = await ejs.renderFile(
      path.join(__dirname, "../../views/EmailTemplate.ejs"),
      { url: "http://localhost:5000", name: req.body.UserName, otp: OTP }
    );
    const mailOptions = {
      from: "jbh.globaliasoft@gmail.com",
      to: req.body.Email,
      subject: "Email Verified",
      html: data,
    };
    // User
    const userEmail = await User.find({ Email: req.body.Email });
    if (userEmail.length > 0) {
      res.send({
        message: "Username already exists",
        UserId: userEmail[0]._id,
        status: 201,
      });
      return;
    }
   
    //create user
    const UserCreate = await new User({
      UserName: req.body.UserName,
      Cname: req.body.Cname,
      PhoneNo: req.body.PhoneNo,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10),
    });
    UserCreate.save();
    console.log(UserCreate);
    //OTP
    const userotp = new UserOtp({
      userId: UserCreate._id,
      otp: OTP
    })
     //Email
     transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ error: error, status: false });
      }
    });
    userotp.save().then((result) => {
      res.status(200).send({
        UserId: result.userId,
        message: "Successfully send otp",
        status: true,
      });
    });
  } catch (err) {
    res.json({ result: 0, message: err });
  }
});

//user verified

router.post("/verify/:id", async (req, res) => {
  const userVerify = await User.findOne({ _id: req.params.id });
  if (!userVerify) {
    return res.send({ message: "Please create user" });
  }
  let otpNumber = await UserOtp.findOne({ userId: userVerify._id.toString() });
  if (!otpNumber) {
    return res.status(200).send({ message: "OTP is not existed" });
  }
  if (req.body.Otp === otpNumber.otp) {
    const data = await ejs.renderFile(
      path.join(__dirname, "../../views/EmailVerify.ejs"),
      { name: userVerify?.UserName }
    );
    const mailOptions = {
      from: "jbh.globaliasoft@gmail.com",
      to: userVerify?.Email,
      subject: "Congratulations!!",
      html: data,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ error: error, status: false });
      }
    });
    await User.findOneAndUpdate({ _id: req.params.id }, { isVerifed: true });
    let otpNumber = await UserOtp.findOneAndRemove({ userId: userVerify._id });

    res
      .status(200)
      .send({ message: "User verification is successful", status: true });
  } else {
    res.status(200).send({ message: "OTP is incorrect", status: false });
  }
});

// User Login
router.post("/logins", async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });
  console.log("🚀 ~ file: User.js ~ line 120 ~ router.post ~ user", user)
  if (user && (await bcrypt.compare(Password, user.Password))) {
    const token = jwt.sign({ userId: user._id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: config.jwtExpiration,
    });
    user._doc["token"]=token   
    res
      .status(200)
      .json({ message: "Successful login", "Token": user });
  } else {
    res.send("Invalid Credentials");
  }
});

module.exports = router;
