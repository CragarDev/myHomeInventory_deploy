// import the user model
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

console.log(":::::: USER CONTROLLER :::::::");

// testing the connection with sayHello
module.exports.sayHello = (req, res) => {
  let name = "Cragar";
  res.json({
    msg: `Hi ${name}, this is coming from the USER controller file in the project: 'my-home-inventory'`
  });
};

//@ :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// register new user
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//t- ::::::::::::::: REGISTER NEW User   (CREATE)  --------------------------------
//t- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// register a new User
module.exports.registerUser = (req, res) => {
  User.find({ email: req.body.email })
    .then((usersWithEmail) => {
      // console.log("Response when looking for user with this email ==>", usersWithEmail.length);
      if (usersWithEmail.length === 0) {
        // console.log("No user with this email found, so we can create a new user");
        User.create(req.body)
          .then((newlyRegisteredUser) => {
            const userToken = jwt.sign({ _id: newlyRegisteredUser._id, email: newlyRegisteredUser.email }, process.env.SECRET_KEY);
            res
              .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
              })
              .json({ msg: "Registration Successful!", results: newlyRegisteredUser });
          })
          .catch((err) => res.json({ message: "REGISTERING User: Something went wrong", error: err }));
      } else {
        res.json({ error: { errors: { email: { message: "User with this email already exists" } } } });
      }
    })
    .catch((err) => console.log("Error when looking for user with this email ==>", err));
};

// log in user
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: LOGIN User   (READ)  --------------------------------
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// log in User
module.exports.logInUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    // email not found in users collection
    return res.json({ error: { errors: { email: { message: "Invalid Login attempt :: Email not found" } } } });
  }

  // if we made it this far, we found a user with this email address
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(req.body.password, user.password);

  if (!correctPassword) {
    // password wasn't a match!
    return res.json({ error: { errors: { email: { message: "Invalid Login attempt :: Incorrect password" } } } });
  }

  // if we made it this far, the password was correct
  const userToken = jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    process.env.SECRET_KEY
  );

  // note that the response object allows chained calls to cookie and json
  res
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true
    })
    .json({ msg: "Log In Successful, Welcome aboard!" });
};

// get logged in User
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//t- ::::::::::::::: GET LOGGED IN USER (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get logged in User
module.exports.getLoggedInUser = (req, res) => {
  // use the info stored in the cookie to get the id of the logged in user and
  // query the database for that user and return the id for the logged in user

  const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
  // console.log("USER CONTROLLER_decodedJWT.payload._id ==>", decodedJWT.payload._id);
  // decodedJWT.payload._id
  User.findOne({ _id: decodedJWT.payload._id })
    .then((foundUser) => {
      res.json({ message: "GETTING LOGGED IN USER ==> You are logged in", results: { _id: foundUser._id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email } });
    })
    .catch((err) => {
      res.json({ message: "GETTING LOGGED IN USER ERROR: Something went wrong", error: err });
    });
};

// log out user
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: LOG OUT User (READ)  ---------------------
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Log Out User
module.exports.logOutUser = (req, res) => {
  // console.log("LOGGING OUT USER_ res==>", res);
  res.clearCookie("usertoken");
  res.status(200).json({ msg: "Log Out Successful!" });
};

//@ :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// get all Users no Sort
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ALL Users no Sort (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get all Users
module.exports.getAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => res.json({ results: allUsers }))
    .catch((err) => res.json({ message: "Get ALL Users no Sort: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ONE User by Id (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get one User by id
module.exports.getOneUser = (req, res) => {
  Inventory.findOne({ _id: req.params._id })
    .then((oneUser) => res.json({ results: oneUser }))
    .catch((err) => res.json({ message: "Get ONE User: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET Total COUNT OF Users (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get count of Users
module.exports.getCountOfUsers = (req, res) => {
  User.countUsers({})
    .then((count) => res.json({ results: count }))
    .catch((err) => res.json({ message: "COUNT OF Users: Something went wrong", error: err }));
};

//
// Get one random User
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//* ::::::::::::::: GET ONE RANDOM User -  (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// get random User
module.exports.getOneRandomUser = (req, res) => {
  User.find()
    .then((allUsers) => {
      // get a random number from index 0 up to but not including the allUsers.length
      let randomIdx = Math.floor(Math.random() * allUsers.length);
      // return the User at the random index
      res.json({ results: allUsers[randomIdx] });
    })
    .catch((err) => res.json({ message: "RANDOM User: Something went wrong", error: err }));
};

//
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: UPDATE ONE User (UPDATE) ---------------------
//n- :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// update a User
module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
    .then((updatedUser) => res.json({ results: updatedUser }))
    .catch((err) => res.json({ message: "UPDATING User: Something went wrong", error: err }));
};

//
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//! ::::::::::::::: DELETE User by Id (DELETE) -----------------------------
//! :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// delete an User by id
module.exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params._id })
    .then((result) => res.json({ results: result }))
    .catch((err) => res.json({ message: "DELETING User: Something went wrong", error: err }));
};

//
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//n- ::::::::::::::: GET ALL Users Sorted Dynamically (READ)  ---------------------
//* :::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Sort all Users Dynamically
module.exports.getAllUsersSorted = (req, res) => {
  const sortObject = {};
  let stype = req.params.sorttype;
  let sdir = req.params.sortdirection;
  sortObject[stype] = sdir;
  User.find()
    .sort(sortObject)
    .then((allUsersSorted) => res.json({ results: allUsersSorted }))
    .catch((err) => res.json({ message: "Sorted Users Something went wrong", error: err }));
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@ Worked To HERE
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
