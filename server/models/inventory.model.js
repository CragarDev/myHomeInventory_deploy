// import mongoose from "mongoose";
const mongoose = require("mongoose");

console.log(":::::: INVENTORY MODELS :::::::");

// create a database/schema for the product
const inventorySchema = new mongoose.Schema(
  // table/collection in the database
  {
    // these are the rows/columns//document in the table/collection
    category: {
      type: String,
      required: [true, "Category is required"],
      minlength: [2, "Category must be at least 2 characters"]
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"]
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      minlength: [2, "Location must be at least 2 characters"]
    },
    condition: {
      type: String
    },
    make: {
      type: String
    },
    model: {
      type: String
    },
    serialNumber: {
      type: String
    },
    purchasePrice: {
      type: Number,
      default: 0
    },
    purchaseDate: {
      type: Date
    },
    currentValue: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    },
    purchaseLocation: {
      type: String
    },
    inventoryImage: {
      type: String
    },
    inventoryImageKey: {
      type: String
    },
    user_id: {
      type: String
    }
  },
  // this sets the timestamps for createdAt and updatedAt
  { timestamps: true }
);

// create a model for the product
// this is a class that will be used to create documents
const Inventory = mongoose.model("Inventory", inventorySchema);

// export the model
module.exports = Inventory;
