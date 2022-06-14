const express = require("express"); // importing express
// import the .env file
require("dotenv").config();
// console.log("process.env.NODE_ENV: ", process.env.SECRET_KEY);
const cors = require("cors"); // importing cors - CORS: cross origin resource sharing

const cookieParser = require("cookie-parser");
// console.log("cookieParser: ", cookieParser);

console.log(":::::: SERVER  :::::::");

// bring in the .env variables
const userName = process.env.USERNAME;

// require("dotenv").config(); // Need to find out how to use this
const app = express(); // creating an express app
const port = process.env.PORT; // setting the port
const bodyParser = require("body-parser");

// need these to handle the requests
// make sure these lines are above any app.get or app.post code blocks
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors()); // allows us to use cors to share resources from backend to frontend
// Change the app.use(cors()) to the one below
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//  importing the config file
require("./server/config/mongoose.config");

app.use(bodyParser.json({ limit: "16mb", extended: false })); // Make sure you add these two lines
app.use(bodyParser.urlencoded({ limit: "16mb", extended: false })); //Make sure you add these two lines

// importing the routes
//? ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//? :::::: ROUTES GO HERE ---------------
//? ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//

// importing the routes
const inventoryRoutes = require("./server/routes/inventory.routes");
inventoryRoutes(app);
const userRoutes = require("./server/routes/user.routes");
userRoutes(app);
const categoryRoutes = require("./server/routes/category.routes");
categoryRoutes(app);

//
//? ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//
//
//
//

//@ ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//@ :::::: These lines must be at the bottom of the file ---------------
//@ ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.listen(port, () => console.log(`${userName}, the server is all fired up and running on port ${port}`));
