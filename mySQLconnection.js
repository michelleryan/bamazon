//connection to my bamazon db
const mysql = require("mysql");

//connect to database

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "mrryan1",

  // Your password
  password: "",
  database: "bamazon"
});

module.exports.connectionDB = connection;