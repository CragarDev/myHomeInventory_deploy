// import mongoose from "mongoose";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

console.log(":::::: USER MODELS :::::::");

// create a database/schema for the product
const userSchema = new mongoose.Schema(
  // table/collection in the database
  {
    // these are the rows/columns//document in the table/collection
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [2, "First Name must be at least 2 characters"]
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [2, "Last Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [2, "Email must be at least 2 characters"],
      validate: {
        validator: (value) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
        message: "Please enter a valid email address"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"]
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    profilePicture: {
      type: String
    },
    birthDate: {
      type: Date
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: (value) => /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(value),
        message: "Please enter a valid Phone number."
      }
    },
    profilePicture: {
      type: String
    }
  },
  // this sets the timestamps for createdAt and updatedAt
  { timestamps: true }
);

// virtual object to get and set the password for confirmation
userSchema
  .virtual("confirmPassword")
  .get(() => this._confirmPassword) // getter
  .set((value) => (this._confirmPassword = value)); // setter

// pre hook to validate password
userSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

// for hashing the password
userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

// create a model for the product
// this is a class that will be used to create documents
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;
