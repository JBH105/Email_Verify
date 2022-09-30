const express = require("express");
const router = express.Router();
const bill = require("../../models/bill.model");
const verifyToken = require("../../middleware/authJwt");

router.post("/bill", async (req, res) => {
  try {
    const billdata = req.body;
    const Bill = await new bill({
      FirstName: billdata.FirstName,
      Number: billdata.Number,
      Product: billdata.Product,
      Date: billdata.Date,
      Amount: billdata.Amount,
      Status: billdata.Status,
      // UserId: req.user.userId._id
    });
    await Bill.save();
    res.send({ message: "Bill create successfully ", Bill: Bill });
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const billID = req.body.billID;
    const productID = req.body.productID;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const query = { _id: billID, "Product._id": productID };
    const updateDocument = {
      $set: {
        "Product.$.name": name,
        "Product.$.price": price,
        "Product.$.quantity": quantity,
      },
    };
    const result = await bill.findOneAndUpdate(query, updateDocument, {
      new: true,
      runValidators: true,
    });

    res.send(result);
  } catch (err) {
    res.send({ message: err });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const billID = req.body.billID;
    const productID = req.body.productID;

    const query = { _id: billID, "Product._id": productID };
    const result = await bill.findOneAndDelete(query);

    res.send(result);
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/deletebill", async (req, res) => {
  try {
    const billID = req.body.billID;
    const condition = {
      active: 0,
      removed: 1,
    };
    const result = await bill.findOneAndUpdate({ _id: billID }, condition, {
      new: true,
      runValidators: true,
    });
    res.send(result);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/getbill", async (req, res) => {
  const page = parseInt(req.query.page ? req.query.page : 1);
  const pageLimit = parseInt(req.query.pageLimit ? req.query.pageLimit : 10);
  // const limit = 10;
  const startIndex = (page - 1) * pageLimit;
  const endIndex = page * pageLimit;
  try {
    const condition = {
      active: 1,
      removed: 0,
    };
    const billData = await bill.find(condition).sort({ create_at: -1 });
    // .populate("UserId", "-Password");
    // res.send(billData);
    res.status(200).send({
      status: true,
      data: billData.slice(startIndex, endIndex),
      current: page,
      total: Math.ceil(billData.length / pageLimit),
      results: billData.length,
      startIndex: startIndex,
      endIndex: endIndex,
    });
  } catch (err) {
    res.send({ message: err });
  }
});
module.exports = router;
