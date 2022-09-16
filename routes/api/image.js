const express = require("express");
const upload = require("../../middleware/ImageUpload");
const router = express.Router();


router.post("/image_upload", upload.single("image"), async (req, res) => {
    const { filename } = req.file;
    res.status(200).send({ file: filename });
  });

module.exports = router;
