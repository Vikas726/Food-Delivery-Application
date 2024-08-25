const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const connectDB = require("./config/dbConnect");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

// Database connection
connectDB();

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", foodRoutes);
app.use("/images", express.static(path.join(__dirname, "uploads"))); // Serve images
app.use("/api/user", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
