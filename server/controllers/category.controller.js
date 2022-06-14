// import the category model
const Category = require("../models/category.model");

console.log(":::::: CATEGORY CONTROLLER :::::::");

// testing the connection with sayHello
module.exports.sayHello = (req, res) => {
  let name = "Cragar";
  res.json({
    msg: `Hi ${name}, this is coming from the CATEGORY controller file in the project: 'my-home-inventory-app'`
  });
};

//
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//t- ::::::::::::::: NEW Category Item  (CREATE)  --------------------------------
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// create a new Category Item
module.exports.createCategoryItem = (req, res) => {
  Category.create(req.body)
    .then((newlyCreatedCategoryItem) => res.json({ results: newlyCreatedCategoryItem }))
    .catch((err) => res.json({ message: "CREATING Category Item: Something went wrong", error: err }));
};

// get all Category Items no Sort
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ALL Category Items no Sort (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get all Category
module.exports.getAllCategoryItems = (req, res) => {
  Category.find()
    .then((allCategoryItems) => res.json({ results: allCategoryItems }))
    .catch((err) => res.json({ message: "Get ALL Category Items no Sort: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ONE Category Item by Id (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get one Category Item by id
module.exports.getOneCategoryItem = (req, res) => {
  Category.findOne({ _id: req.params._id })
    .then((oneCategoryItem) => res.json({ results: oneCategoryItem }))
    .catch((err) => res.json({ message: "Get ONE Category Item: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET Total COUNT OF Category (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get count of Category
module.exports.getCountOfCategory = (req, res) => {
  Category.countDocuments({})
    .then((count) => res.json({ results: count }))
    .catch((err) => res.json({ message: "COUNT OF Category: Something went wrong", error: err }));
};

//
// Get one random Category Item
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ONE RANDOM Category Item -  (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get random Category Item
module.exports.getOneRandomCategory = (req, res) => {
  Category.find()
    .then((allCategory) => {
      // get a random number from index 0 up to but not including the allCategory.length
      let randomIdx = Math.floor(Math.random() * allCategory.length);
      // return the Category at the random index
      res.json({ results: allCategory[randomIdx] });
    })
    .catch((err) => res.json({ message: "RANDOM Category: Something went wrong", error: err }));
};

//
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: UPDATE ONE Category Item (UPDATE) ---------------------
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// update a Category
module.exports.updateExistingCategoryItem = (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((updatedCategory) => res.json({ results: updatedCategory }))
    .catch((err) => res.json({ message: "UPDATING Category: Something went wrong", error: err }));
};

//
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//! ::::::::::::::: DELETE Category Item by Id (DELETE) -----------------------------
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// delete an Category Item by id
module.exports.deleteCategoryItem = (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ results: result }))
    .catch((err) => res.json({ message: "DELETING Category: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: GET ALL Category Sorted Dynamically (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Sort all Category Dynamically
module.exports.getAllCategorySort = (req, res) => {
  const sortObject = {};
  let stype = req.params.sorttype;
  let sdir = req.params.sortdirection;
  sortObject[stype] = sdir;
  Category.find()
    .sort(sortObject)
    .then((allCategorySorted) => res.json({ results: allCategorySorted }))
    .catch((err) => res.json({ message: "Sorted Category Something went wrong", error: err }));
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@ Worked To HERE
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
