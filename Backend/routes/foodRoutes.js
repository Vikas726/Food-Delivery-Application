const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/foods", getFoods);
router.get("/foods/:id", getFood);
router.post("/foods", upload.single("image"), createFood);
router.patch("/foods/:id", upload.single("image"), updateFood);
router.delete("/foods/:id", deleteFood);

module.exports = router;
