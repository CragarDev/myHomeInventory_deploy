// import inventory controller
const UserControllers = require("../controllers/user.controller");

console.log(":::::: USER ROUTES :::::::");

// export routes
module.exports = (app) => {
  // put static routes at the top and dynamic routes at the bottom

  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // testing connection with sayHello
  app.get("/api/hello/user", UserControllers.sayHello);
  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // getting all the user items no sort
  app.get("/api/admin/user", UserControllers.getAllUsers);
  // getting all the user items sorted by none - a previous way I sorted  items
  app.get("/api/admin/user/none", UserControllers.getAllUsers);
  // getting user count
  app.get("/api/admin/user/count", UserControllers.getCountOfUsers);
  // getting one random user item
  app.get("/api/admin/user/random", UserControllers.getOneRandomUser);

  //@ :::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // get Logged in user
  app.get("/api/user/loggedInUser", UserControllers.getLoggedInUser);
  // register new user
  app.post("/api/user/register", UserControllers.registerUser);
  // Login user
  app.post("/api/user/login", UserControllers.logInUser);
  // log out user
  app.get("/api/user/logout", UserControllers.logOutUser);

  //@ :::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // get one user item by id
  app.get("/api/admin/user/:_id", UserControllers.getOneUser);
  // updating an user item by id
  app.put("/api/admin/user/:id", UserControllers.updateExistingUser);
  // deleting a user item by id
  app.delete("/api/admin/user/:id", UserControllers.deleteUser);
  // all user sorted dynamically
  app.get("/api/admin/user/:sorttype/:sortdirection", UserControllers.getAllUsersSorted);
  //* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
};
