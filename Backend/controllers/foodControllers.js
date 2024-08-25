const FoodModel = require("../models/foodModel");
const fs = require("fs");
const path = require("path");

// Get all foods
const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ success: false, message: "Failed to fetch foods" });
  }
};

// Get a specific food
const getFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(500).json({ success: false, message: "Failed to fetch food" });
  }
};

// Create a new food
const createFood = async (req, res) => {
  const image = req.file?.path; // Optional chaining to handle file presence
  const food = req.body;

  const newFood = new FoodModel({
    ...food,
    image,
  });

  try {
    await newFood.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Food added successfully",
        data: newFood,
      });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ success: false, message: "Failed to create food" });
  }
};

// Update an existing food
const updateFood = async (req, res) => {
  const updateData = { ...req.body };

  if (req.file?.path) {
    updateData.image = req.file.path;
  }

  try {
    const food = await FoodModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Failed to update food" });
  }
};

// Delete a food
const deleteFood = async (req, res) => {
  try {
    const food = await FoodModel.findByIdAndDelete(req.params.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    if (food.image) {
      const imagePath = path.resolve(food.image); // Ensure proper path resolution
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Failed to delete food" });
  }
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
