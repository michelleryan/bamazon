'use strict'

const mysql = require("mysql");
const inquirer = require("inquirer");

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

connection.connect(function(err) {
  if (err) throw err;
  //console.log(connection.threadId);
  console.log("Please see below for the list of products...");
  displayProducts();


  //connection.end();
});



//<------------------------------Functions-------------------------------------->
//display list of products in the database
function displayProducts() {
	connection.query(("SELECT * FROM products"), function (err, result, fields) {
    	if (err) throw err;
    	console.log("ID || Product Name || Department || Price || Stock Quantity");
    	for(let i=0; i<result.length; i++) {
   			console.log(result[i].item_id + " || " + result[i].product_name + " || "
   				+ result[i].department_name + " || " + result[i].price
   				+ " || " + result[i].stock_quantity);
   		}
   		productIdSearch();
  });
	
	
}


function productIdSearch() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What is the ID of the product you would like to buy?"
    })
    .then(function(answer) {
	connection.query("SELECT * FROM products WHERE item_id=?", [answer.id], function (err, result) {
    	if (err) throw err;
    	var productChoice = result[0].product_name;
    	var quantity = result[0].stock_quantity;
    	var cost = result[0].price;
   		console.log("You have chosen: " + productChoice);
   		console.log("We have " + quantity + " available for purchase.");
   		howManyBuy(quantity, productChoice, cost);
   		
   		});
	});
}

function howManyBuy(quantity, productChoice, cost) {
	inquirer
		.prompt({
			name:"amount",
			type:"input",
			message: "How many would you like to buy?"
		}).then(function(answer) {
			var buyNum = answer.amount;
			//console.log("You would like to buy: " + buyNum);
			placeOrder(buyNum, quantity, productChoice, cost);
		});
}

function placeOrder(buyNum, quantity, productChoice, cost) {
	var num = parseInt(buyNum);

	//check if enough in stock
	if (!quantity-num>0) {
		console.log("Insufficient quantity!");
		displayProducts();

	}
	else {
		//show the customer their total price
		var totalPrice = num*cost;
		console.log("Total Price: $" + totalPrice);
		var newQty = quantity-num;
		//enough in stock to buy, update stock_quantity
		connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?", [newQty, productChoice], function(err, res){
			if (err) throw err;
			//console.log("The new quantity is: " + newQty);
			//displayProducts();
		});
	}
	//console.log(num + ", " + quantity);
	

}
