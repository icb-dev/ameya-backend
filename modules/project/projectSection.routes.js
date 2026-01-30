const express = require("express");
const router = express.Router();
const controller = require("./projectSection.controller");

router.post("/sections", controller.addSection);
router.get("/:projectId/sections", controller.getSections);

module.exports = router;
