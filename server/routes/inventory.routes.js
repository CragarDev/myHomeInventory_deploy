// import inventory controller
const InventoryControllers = require("../controllers/inventory.controller");
const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

console.log(":::::: INVENTORY ROUTES :::::::");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    console.log("file is an image");
    cb(null, true);
  } else {
    console.log("file is NOT an image");
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

// console.log("ROUTES__Storage---->", storage);
// console.log("ROUTES__Storage.destination---->", storage.destination);
// console.log("ROUTES__Storage.filename---->", storage.filename);

// console.log("ROUTES__fileFilter---->", fileFilter);
// console.log("ROUTES__Upload---->", upload);

// export routes
module.exports = (app) => {
  // put static routes at the top and dynamic routes at the bottom

  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // testing connection with sayHello
  app.get("/api/hello/inventory", InventoryControllers.sayHello);
  // getting all the inventory items no sort
  app.get("/api/inventory/user/:user_id", InventoryControllers.getAllInventoryItems);
  // getting all the inventory items sorted by none - a previous way I sorted  items
  // app.get("/api/inventory/none", InventoryControllers.getAllInventoryItems);
  // getting inventory count
  // app.get("/api/inventory/count", InventoryControllers.getCountOfInventory);
  // getting one random inventory item
  // app.get("/api/inventory/random", InventoryControllers.getOneRandomInventory);
  // create new inventory item
  app.post("/api/inventory/new", upload.array("inventoryImage"), InventoryControllers.createInventoryItem);
  // updating an inventory item by id
  // console.log("ROUTES__app.put---->");
  app.put("/api/inventory/update/:_id", upload.array("inventoryImage"), InventoryControllers.updateExistingInventoryItem);
  // get one inventory item by id
  app.get("/api/inventory/getOne/:_id", InventoryControllers.getOneInventoryItem);
  // deleting a inventory item by id
  app.delete("/api/inventory/delete/:_id", InventoryControllers.deleteInventoryItem);
  // all inventory sorted dynamically
  // app.get("/api/inventory/:sorttype/:sortdirection", InventoryControllers.getAllInventorySort);
  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
};
