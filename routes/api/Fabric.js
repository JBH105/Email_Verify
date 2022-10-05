const express = require("express");
const router = express.Router();
const fabric = require("../../models/fabric.model");

router.get("/fabric", async (req, res) => {
  //   console.log("🚀 ~ file: Fabric.js ~ line 6 ~ router.get ~ req", req.user);
  try {
    const condition = {
      Role: "tailor",
    };
    const userData = await fabric.find().sort({ create_at: -1 }).lean();
    res.send({
      message: "Successfully send fabric",
      Fabric: userData,
      status: 200,
    });
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/createfabric", async (req, res) => {
  try {
    const data = req.body;
    const userData = await new fabric(data);
    userData.save();
    res.send({
      message: "Successfully Save Fabric",
      Fabric: userData,
      status: 200,
    });
  } catch (err) {
    res.send({ message: err });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const data = req.body;
    const userData = await fabric.findOneAndUpdate({ _id: data.id }, data, {
      new: true,
      runValidators: true,
    });
    res.send({
      message: "Successfully Save Fabric",
      Fabric: userData,
      status: 200,
    });
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
