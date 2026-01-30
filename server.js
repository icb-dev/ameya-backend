require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== STATIC FILES ==================
// 🔥 THIS MUST BE BEFORE ROUTES
app.use("/uploads", express.static("uploads"));

// ================== ROUTES ==================

// upload routes (images, media)
const uploadRoutes = require("./modules/upload/upload.routes");
app.use("/api/upload", uploadRoutes);

// project routes
const projectRoutes = require("./modules/project/project.routes");
const projectSectionRoutes = require("./modules/project/projectSection.routes");

app.use("/api/projects", projectRoutes);
app.use("/api/projects", projectSectionRoutes);

// ================== TEST ROUTE ==================
app.get("/", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.send("Database connected ✅");
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
