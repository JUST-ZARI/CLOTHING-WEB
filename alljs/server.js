const express=require("express");
const mysql=require("mysql");
const path=require("path");
const app=express();
const port=3403;

//Database connection
let con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"clothingweb_db"
});
con.connect(function(err){
    if (err) throw err;
    console.log("CONNECTED TO DATABASE");
});

app.use(express.static(path.join(__dirname, "..", "src"))); // serve html files
app.use("/allcss", express.static(path.join(__dirname, "..", "allcss")));  // Serves CSS files
app.use("/alljs", express.static(path.join(__dirname, "..", "alljs")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); //Handle JSON data

app.get("/", (req, res) => {
    res.send("Welcome to Clothing Web API");
});
// Route to serve admin.html
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "home.html"));
});
// Route to serve admin.html
app.get("/collection", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "collection.html"));
});
// Route to serve admin.html
app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "cart.html"));
});
// Route to serve admin.html
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "login.html"));
});
// Route to serve admin.html
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "signup.html"));
});

// Route to serve admin.html
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "src", "admin.html"));
});


// Add a new product
app.post('/products', (req, res) => {
    const { name, description, price, category, image_url } = req.body; 
    const query = `
        INSERT INTO products (name, description, price, category, image_url)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(query, [name, description, price, category, image_url], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added', product_id: results.insertId });
    });
});
// Fetch all products
app.get('/products', (req, res) => {
    
    const query = 'SELECT * FROM products';
    con.query(query, (err, results) => {
        if (err) {
            
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Send the products as JSON
    });
});

// Update a product
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, image_url } = req.body; // Removed stock_quantity
    const query = `
        UPDATE products
        SET name = ?, description = ?, price = ?, category = ?, image_url = ?
        WHERE product_id = ?
    `;
    con.query(query, [name, description, price, category, image_url, productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product updated' });
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE product_id = ?';
    con.query(query, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
