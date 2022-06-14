// import monogoose from 'mongoose';
const mongoose = require("mongoose");

console.log(":::::: CATEGORY MODELS :::::::");

// create a database to hold the categories
const categorySchema = new mongoose.Schema(
  // table/collection in the database
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      minlength: [2, "Category must be at least 2 characters"]
    }
  },
  // this sets the timestamps for createdAt and updatedAt
  { timestamps: true }
);

// create a model for the category
const Category = mongoose.model("Category", categorySchema);

// export the model
module.exports = Category;
