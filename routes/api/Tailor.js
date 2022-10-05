const express = require("express");
const router = express.Router();
const user = require("../../models/user.model");

router.get("/tailor", async (req, res) => {
  try {
    const condition = {
      Role: "tailor",
    };
    const userData = await user.find(condition,'-Password').lean();
    res.send({
      message: "Successfully send tailor",
      Tailor: userData,
      status: 200,
    });
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
