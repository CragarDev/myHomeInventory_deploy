// import the inventory model
const Inventory = require("../models/inventory.model");
const { s3Uploadv2 } = require("../helpers/s3Service.helper");

console.log(":::::: INVENTORY CONTROLLER :::::::");

// testing the connection with sayHello
module.exports.sayHello = (req, res) => {
  let name = "Cragar";
  res.json({
    msg: `Hi ${name}, this is coming from the INVENTORY controller file in the project: 'my-home-inventory'`
  });
};

//
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//t- ::::::::::::::: NEW Inventory Item  (CREATE)  --------------------------------
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// create a new Inventory Item
module.exports.createInventoryItem = async (req, res) => {
  if (req.files[0]) {
    const file = req.files[0];
    const result = await s3Uploadv2(file);
    req.body.inventoryImage = result.Location;
    console.log("CONTROLLER-createInventoryItem-result.Location==> ", result.Location);
    req.body.inventoryImageKey = result.Key;
    console.log("CONTROLLER-createInventoryItem-result.Key==> ", result.Key);
    Inventory.create(req.body) // req.file
      .then((newlyCreatedInventoryItem) => res.json({ message: "CREATING new inventory item was successful", results: newlyCreatedInventoryItem }))
      .catch((err) => res.json({ message: "CREATING Inventory Item: Something went wrong", error: err }));
  } else {
    Inventory.create(req.body) // req.file
      .then((newlyCreatedInventoryItem) => res.json({ message: "CREATING new inventory item was successful", results: newlyCreatedInventoryItem }))
      .catch((err) => res.json({ message: "CREATING Inventory Item: Something went wrong", error: err }));
  }

  // console.log("::::::::::: Passed through createInventoryItem :::::::::::::");
  // console.log("CONTROLLER-createInventoryItem-req.body==> ", req.body);
  // console.log("CONTROLLER-createInventoryItem-req.file==> ", req.files);
  // console.log("CONTROLLER-createInventoryItem-result==> ", result);
  // console.log("createInventoryItem__::::::::::: Passed through createInventoryItem :::::::::::::");
  // console.log("CONTROLLER--req.body==> ", req.body);
  // console.log("CONTROLLER--req.file==> ", req.file);
  // console.log("CONTROLLER--result.filename==> ", result.Location);

  // add the file.filename to the req.body
  // console.log("CONTROLLER--req.body.inventoryImage==> ", req.body.inventoryImage);

  // another way of doing this is to build a new object and add the file.filename to it
  // let newInventoryItem = {
  // ...req.body,
  //   inventoryName: req.body.inventoryName,
  //};
  // then pass the newInventoryItem to the Inventory.create(newInventoryItem) method, like so

  // Inventory.create(req.body) // req.file
  //   .then((newlyCreatedInventoryItem) => res.json({ message: "CREATING new inventory item was successful", results: newlyCreatedInventoryItem }))
  //   .catch((err) => res.json({ message: "CREATING Inventory Item: Something went wrong", error: err }));
};

// get all Inventory Items no Sort
//@ * :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//@ * ::::::::::::::: GET ALL Inventory Items no Sort (READ)  ---------------------
//@ * :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get all Inventory
module.exports.getAllInventoryItems = (req, res) => {
  // console.log("getAllInventoryItems__::::::::::: Passed through getAllInventoryItems :::::::::::::");
  // get all inventory filtered by user_id
  // console.log("CONTROLLER-getAllInventoryItems-req.params==> ", req.params);
  Inventory.find({ user_id: req.params.user_id })
    .then((allInventoryItems) => res.json({ results: allInventoryItems }))
    .catch((err) => res.json({ message: "Get ALL Inventory Items no Sort: Something went wrong", error: err }));
};
//@ * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ONE Inventory Item by Id (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get one Inventory Item by id
module.exports.getOneInventoryItem = (req, res) => {
  // console.log("FIND ONE Using Params: ", req.params);
  // console.log("FIND ONE Using Params._id: ", req.params._id);
  Inventory.findOne({ _id: req.params._id })
    .then((oneInventoryItem) => res.json({ results: oneInventoryItem }))
    .catch((err) => res.json({ message: "Get ONE Inventory Item: Something went wrong", error: err }));
};

// //
// //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
// //* ::::::::::::::: GET Total COUNT OF Inventory (READ)  ---------------------
// //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
// //
// // get count of Inventory
// module.exports.getCountOfInventory = (req, res) => {
//   Inventory.countDocuments({})
//     .then((count) => res.json({ results: count }))
//     .catch((err) => res.json({ message: "COUNT OF Inventory: Something went wrong", error: err }));
// };

// //
// // Get one random Inventory Item
// //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
// //* ::::::::::::::: GET ONE RANDOM Inventory Item -  (READ)  ---------------------
// //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
// //
// // get random Inventory Item
// module.exports.getOneRandomInventory = (req, res) => {
//   Inventory.find()
//     .then((allInventory) => {
//       // get a random number from index 0 up to but not including the allInventory.length
//       let randomIdx = Math.floor(Math.random() * allInventory.length);
//       // return the Inventory at the random index
//       res.json({ results: allInventory[randomIdx] });
//     })
//     .catch((err) => res.json({ message: "RANDOM Inventory: Something went wrong", error: err }));
// };

//
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: UPDATE ONE Inventory Item (UPDATE) ---------------------
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// update a Inventory
module.exports.updateExistingInventoryItem = async (req, res) => {
  console.log("CONTROLLER--req.body==> ", req.body);
  console.log("CONTROLLER--req.files==> ", req.files);
  console.log("CONTROLLER--req.files[0]== true> ", req.files[0] === true);
  console.log("CONTROLLER--req.files[0]== false> ", req.files[0] === false);
  // console.log("CONTROLLER--req.files[0].size==> ", req.files[0].size);
  // let file;
  // let result;
  if (req.files[0]) {
    const file = req.files[0];
    const result = await s3Uploadv2(file);
    req.body.inventoryImage = result.Location;
    Inventory.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
      .then((updatedInventory) => res.json({ message: "UPDATING Inventory item was Successful", results: updatedInventory }))
      .catch((err) => res.json({ message: "UPDATING Inventory: Something went wrong", error: err }));
  } else {
    req.body.inventoryImage = req.body.inventoryImage;
    Inventory.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
      .then((updatedInventory) => res.json({ message: "UPDATING Inventory item was Successful", results: updatedInventory }))
      .catch((err) => res.json({ message: "UPDATING Inventory: Something went wrong", error: err }));
  }

  // console.log("UPDATE ONE Using Params: ", req.params);
  // console.log("UPDATE ONE Using Params._id: ", req.params._id);
  // console.log("updateExistingInventoryItem__::::::::::: Passed through updateExistingInventoryItem :::::::::::::");
  // console.log("CONTROLLER-updateExistingInventoryItem-req.body==> ", req.body);
  // req.file ? (req.body.inventoryImage = result.Location) : (req.body.inventoryImage = req.body.inventoryImage);
  // console.log("CONTROLLER-updateExistingInventoryItem-req.body.inventoryImage==> ", req.body.inventoryImage);

  // Inventory.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
  //   .then((updatedInventory) => res.json({ message: "UPDATING Inventory item was Successful", results: updatedInventory }))
  //   .catch((err) => res.json({ message: "UPDATING Inventory: Something went wrong", error: err }));
};

//
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//! ::::::::::::::: DELETE Inventory Item by Id (DELETE) -----------------------------
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// delete an Inventory Item by id
module.exports.deleteInventoryItem = (req, res) => {
  Inventory.deleteOne({ _id: req.params._id })
    .then((result) => res.json({ results: result }))
    .catch((err) => res.json({ message: "DELETING Inventory: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: GET ALL Inventory Sorted Dynamically (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Sort all Inventory Dynamically
module.exports.getAllInventorySort = (req, res) => {
  const sortObject = {};
  let stype = req.params.sorttype;
  let sdir = req.params.sortdirection;
  sortObject[stype] = sdir;
  Inventory.find()
    .sort(sortObject)
    .then((allInventorySorted) => res.json({ results: allInventorySorted }))
    .catch((err) => res.json({ message: "Sorted Inventory Something went wrong", error: err }));
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@ Worked To HERE
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
