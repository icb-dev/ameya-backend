const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

// single image upload
router.post("/:section/single", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.params.section}/${req.file.filename}`
  });
});

// multiple image upload (gallery)
router.post("/:section/multiple", upload.array("images", 10), (req, res) => {
  const urls = req.files.map(
    (f) => `/uploads/${req.params.section}/${f.filename}`
  );

  res.json({ urls });
});

module.exports = router;
