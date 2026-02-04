const express = require("express");
const router = express.Router();
const controller = require("./project.controller");

// ✅ LIST PROJECTS (THIS WAS MISSING)
router.get("/", controller.listProjects);

// CREATE PROJECT
router.post("/", controller.createProject);

// GET PROJECT BY SLUG
router.get("/:slug", controller.getProject);


 
// DELETE PROJECT BY ID
router.delete("/:id", controller.deleteProject);



router.patch("/:id", controller.updateProject);



module.exports = router;
