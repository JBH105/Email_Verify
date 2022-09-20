const express = require("express");
const router = express.Router();
const bill = require("../../models/bill.model");
const verifyToken = require("../../middleware/authJwt");

router.post("/bill", async (req, res) => {
    try {
        const billdata = req.body;
        const Bill = await new bill({
            FirstName: billdata.FirstName,
            LastName: billdata.LastName,
            Product: billdata.Product,
            Date: new Date().toDateString(),
            // UserId: req.user.userId._id
        })
        await Bill.save()
        res.send({ message: "Bill create successfully ", Bill: Bill })
    } catch (err) {
        console.log(err);
    }
})


router.put('/update', async (req, res) => {
    try {

        const billID = req.body.billID
        const productID = req.body.productID
        const name = req.body.name
        const price = req.body.price
        const quantity = req.body.quantity

        const query = { _id: billID, "Product._id": productID };
        const updateDocument = {
            $set: { "Product.$.name": name, "Product.$.price": price, "Product.$.quantity": quantity }
        };
        const result = await bill.findOneAndUpdate(query, updateDocument, { new: true, runValidators: true });

        res.send(result)
    } catch (err) { res.send({ message: err }) }
})

router.delete('/delete', async (req, res) => {
    try {

        const billID = req.body.billID
        const productID = req.body.productID

        const query = { _id: billID, "Product._id": productID };
        const result = await bill.findOneAndDelete(query);

        res.send(result)
    } catch (err) { res.send({ message: err }) }
})

router.get('/getbill', async (req, res) => {
    try {
        const billData = await bill.find().populate("UserId", "-Password")
        res.send(billData)
    } catch (err) {
        res.send({ message: err })
    }

})
module.exports = router;
