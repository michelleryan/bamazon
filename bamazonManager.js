'use strict'

const connection = require('./mySQLconnection.js').connectionDB
const mysql = require("mysql");
const inquirer = require("inquirer");


connection.connect(function(err) {
  if (err) throw err;
  //console.log(connection.threadId);
  console.log("menu options below");
  runMenu();


  //connection.end();
});

function runMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "Exit":
          connection.end();
          break;
        }
    });
}
//display products db
function viewProducts(){
	connection.query(("SELECT * FROM products"), function (err, result, fields) {
    	if (err) throw err;
    	console.log("ID || Product Name || Department || Price || Stock Quantity");
    	for(let i=0; i<result.length; i++) {
   			console.log(result[i].item_id + " || " + result[i].product_name + " || "
   				+ result[i].department_name + " || " + result[i].price
   				+ " || " + result[i].stock_quantity);
   		}

   		runMenu(); //go back to menu of options
  });
}
//view low inventory products
function viewInventory(){
	let lowNum = 5;
	connection.query("SELECT * FROM products WHERE stock_quantity<?", [lowNum], function (err, result, fields) {
    	if (err) throw err;
    	console.log("ID || Product Name || Department || Price || Stock Quantity");
    	for(let i=0; i<result.length; i++) {
   			console.log(result[i].item_id + " || " + result[i].product_name + " || "
   				+ result[i].department_name + " || " + result[i].price
   				+ " || " + result[i].stock_quantity);
   		}

   		runMenu(); //go back to menu of options
  });

}

//add additional inventory to existing product
function addInventory(){
	//display all products and prompt manager to enter ID of product to add more inventory
	connection.query(("SELECT * FROM products"), function (err, result, fields) {
    	if (err) throw err;
    	console.log("ID || Product Name || Department || Price || Stock Quantity");
    	for(let i=0; i<result.length; i++) {
   			console.log(result[i].item_id + " || " + result[i].product_name + " || "
   				+ result[i].department_name + " || " + result[i].price
   				+ " || " + result[i].stock_quantity);
   		}
   		inquirer
    		.prompt({
      			name: "id",
      			type: "input",
      			message: "Enter ID to add additional inventory: "
    		}).then(function(answer) {
				connection.query("SELECT * FROM products WHERE item_id=?", [answer.id], function (err, result) {
    			if (err) throw err;
    			var productChoice = result[0].product_name;
    			var quantity = result[0].stock_quantity;
   				console.log(`You have chosen ${productChoice} which currently has ${quantity}`);
   				updateInv(productChoice, quantity);
   				});
			});
    	});
}

//update the current inventory, called by the addInventory function
function updateInv(productChoice, quantity){
	inquirer
		.prompt({
			name:"amount",
			type:"input",
			message: "Enter quantity to add to inventory: "
		}).then(function(answer) {
			var amt = parseInt(answer.amount);
			console.log(`${amt} will be added to current inventory for ${productChoice}`);
			var newQty = quantity+amt;
		//enough in stock to buy, update stock_quantity
		connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?", [newQty, productChoice], function(err, res){
			if (err) throw err;
			console.log(`${productChoice} has been updated to a new stock quantity of ${newQty}`);
			runMenu();
		});
	});
}

//add a brand new product
function addProduct(){
	inquirer
		.prompt([
		{
		  name:"department",
		  type:"input",
		  message:"Enter Department Name: "
		},
      	{
          name: "product",
          type: "input",
          message: "Enter product name: "
       	},
      	{
          name: "stock",
          type: "input",
          message: "Enter in stock quantity: "
      	},
      	{
      	  name:"price",
      	  type:"input",
      	  message: "Enter price, for example 10.99 : "
      	}
    	]).then(function(answer){
    		let dept = answer.department;
    		let name = answer.product;
    		let qty = answer.stock;
    		let price = answer.price;
    		connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?) ", [name,dept, price, qty], function(err,res){
    			if (err) throw err;
    			console.log(`New product added!`);
    			runMenu();
    		});

		});

}