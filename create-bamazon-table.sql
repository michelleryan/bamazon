DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT
,product_name varchar(255) NULL
,department_name varchar(255) NULL
,price decimal(10,2) NULL
,stock_quantity int NULL
,primary key(item_id)


);

Select * From products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Supreme Select Bath Towel", "Home and Bath", 11.99, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ITouch Smart Watch", "Watches", 50.00, 85);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("G-Shock Women's Watch", "Watches", 110.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coach Saddle Bag", "Handbags and Accessories", 197.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coach Sunglasses", "Handbags and Accessories", 160.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Converse Women's Chuck Taylor", "Shoes", 49.99, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cassidy Buckle Sandles", "Shoes", 49.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alfini Lacy Fit & Flare Dress", "Women's Clothing", 54.99);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Calvin Klein Hooded Logo Windbreaker", "Women's Clothing", 69.99, 13);
