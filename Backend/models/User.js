const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt
const jwt = require("jsonwebtoken");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    minimize: false, // Prevents empty objects from being removed
  }
);

// Add method to the schema to compare passwords
userSchema.methods.comparepassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Create User model
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
