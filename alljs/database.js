let mysql=require("mysql");

let con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});

con.connect(function (err){
    if (err) throw err;
    console.log("CONNECTED TO SQL SERVER SUCCESSFULLY");
});

let createDatabase="CREATE DATABASE IF NOT EXISTS clothingweb_db";
con.query(createDatabase,function (err){
    if (err) throw err;
    console.log("DATABASE CREATED SUCCESSFULLY");
});
let createTable=`CREATE TABLE IF NOT EXISTS clothingweb_db.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    password VARCHAR(255) NOT NULL,
    terms_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`
con.query(createTable ,function(err){
    if (err) throw err;
    console.log("USER TABLE CREATED SUCCESSFULLY");
});
let createTable2=`CREATE TABLE IF NOT EXISTS clothingweb_db.products(
    product_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each product
    name VARCHAR(255) NOT NULL,              -- Name of the product
    description TEXT,                        -- Detailed description of the product
    price DECIMAL(10, 2) NOT NULL,          -- Price of the product (e.g., 19.99)
    category VARCHAR(100),                   -- Category (e.g., Men, Women, Kids)
    image_url VARCHAR(255),                  -- URL of the product image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the product was added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp when the product was last updated
)`;
con.query(createTable2 ,function(err){
    if (err) throw err;
    console.log("PRODUCTS TABLE CREATED SUCCESSFULLY");
});

















