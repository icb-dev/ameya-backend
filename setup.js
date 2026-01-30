const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Utility: check if command exists
 */
function commandExists(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// 1️⃣ Create folders
const folders = [
  "uploads/misc",
  "uploads/amenities",
  "uploads/gallery",
  "uploads/hero",
  "uploads/logo",
  "uploads/thumbnail",
];

folders.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created folder: ${dir}`);
  } else {
    console.log(`ℹ️ Folder already exists: ${dir}`);
  }
});

// 2️⃣ Create .env file
const envPath = path.join(__dirname, ".env");

const envContent = `DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=backend
PORT=3000
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log("✅ .env file created");
} else {
  console.log("ℹ️ .env file already exists");
}

// 3️⃣ Ensure pnpm is installed
if (!commandExists("pnpm")) {
  console.log("⚠️ pnpm not found. Installing pnpm globally...");
  try {
    execSync("npm install -g pnpm", { stdio: "inherit" });
    console.log("✅ pnpm installed successfully");
  } catch (err) {
    console.error("❌ Failed to install pnpm");
    process.exit(1);
  }
} else {
  console.log("✅ pnpm already installed");
}

// 4️⃣ Run pnpm install
try {
  console.log("📦 Installing project dependencies using pnpm...");
  execSync("pnpm install", { stdio: "inherit" });
  console.log("✅ Dependencies installed");
} catch (err) {
  console.error("❌ pnpm install failed");
  process.exit(1);
}

console.log("\n🎉 Project setup completed successfully!");
