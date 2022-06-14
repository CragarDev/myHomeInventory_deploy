// import mongoose
const mongoose = require("mongoose");

console.log(":::::: MONGOOSE CONFIG :::::::");

// get the .env file
require("dotenv").config();

// the name of the database
// put these in a .env file eventually
// bring in the .env variables

const db_name = process.env.DB_NAME;
const userName = process.env.USERNAME;
const db_pwd = process.env.DB_PASSWORD;
const db_login = process.env.DB_LOGIN;
const uri = `mongodb+srv://${db_login}:${db_pwd}@dojo-mean-may.ckqcp.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// mongodb+srv://cragardev:<password>@dojo-mean-may.ckqcp.mongodb.net/?retryWrites=true&w=majority

// mongoose connection here
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Ok ${userName}, We have now established a connection to the database: ${db_name}`))
  .catch((err) => console.log(`Uh-ooh, ${userName}, Something has gone wrong when connecting to the database: ${db_name}, you had better check on it. look here: ${db_login}, or ${db_pwd} `, err));
