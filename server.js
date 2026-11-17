
const express = require("express");
const app = express();

app.use(express.json());

let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];

// GET all products
app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

// POST new product
app.post("/api/products", (req, res) => {
    const { name, category, price, quantity, inStock } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof category !== "string" || !category.trim() ||
        typeof price !== "number" || price < 0 ||
        typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0 ||
        typeof inStock !== "boolean"
    ) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const newProduct = {
        id: Math.max(...products.map(p => p.id), 300) + 1,
        name,
        category,
        price,
        quantity,
        inStock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// FILTER by category
app.get("/api/products/filter", (req, res) => {
    const category = req.query.category || "";

    const result = products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
    );

    res.status(200).json(result);
});

// GET product by ID
app.get("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
});

// PUT update product
app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const { name, category, price, quantity, inStock } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof category !== "string" || !category.trim() ||
        typeof price !== "number" || price < 0 ||
        typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0 ||
        typeof inStock !== "boolean"
    ) {
        return res.status(400).json({ message: "Invalid data" });
    }

    products[index] = {
        id,
        name,
        category,
        price,
        quantity,
        inStock
    };

    res.status(200).json(products[index]);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(index, 1);

    res.status(200).json({ message: "Product deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
