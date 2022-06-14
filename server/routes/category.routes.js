// import category controller
const CategoryControllers = require("../controllers/category.controller");

console.log(":::::: CATEGORY ROUTES :::::::");

// export routes
module.exports = (app) => {
  // put static routes at the top and dynamic routes at the bottom

  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // testing connection with sayHello
  app.get("/api/hello/category", CategoryControllers.sayHello);
  // getting all the category items no sort
  app.get("/api/category", CategoryControllers.getAllCategoryItems);
  // getting all the category items sorted by none - a previous way I sorted  items
  app.get("/api/category/none", CategoryControllers.getAllCategoryItems);
  // getting category count
  app.get("/api/category/count", CategoryControllers.getCountOfCategory);
  // getting one random category item
  app.get("/api/category/random", CategoryControllers.getOneRandomCategory);
  // create new category item
  app.post("/api/category/new", CategoryControllers.createCategoryItem);
  // get one category item by id
  app.get("/api/category/:_id", CategoryControllers.getOneCategoryItem);
  // updating an category item by id
  app.put("/api/category/:id", CategoryControllers.updateExistingCategoryItem);
  // deleting a category item by id
  app.delete("/api/category/:id", CategoryControllers.deleteCategoryItem);
  // all category sorted dynamically
  app.get("/api/category/:sorttype/:sortdirection", CategoryControllers.getAllCategorySort);
  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
};
