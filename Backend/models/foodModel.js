const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (v) {
        return Number.isFinite(v);
      },
      message: (props) => `${props.value} is not a valid price!`,
    },
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const FoodModel = mongoose.model("Food", foodSchema);

module.exports = FoodModel;
