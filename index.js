const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getProducts,
  postProduct,
  getProduct,
  putProduct,
  deleteProduct,
  getCartItems,
  getCartItem,
  postCartItem,
  putCartItem,
  deleteCartItem,
  checkOut,
} = require("./src/lib/handlers");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Product Contents

app.get("/products", getProducts);

app.get("/product/:id", getProduct);

app.post("/product", postProduct);

app.put("/product/:id", putProduct);

app.delete("/product/:id", deleteProduct);

// Cart Item

app.get("/cart_items", getCartItems);

app.get("/cart_item/cart/:id", getCartItem);

app.post("/cart_item", postCartItem);

app.put("/cart_item/:id/product", putCartItem);

app.delete("/cart_item/product/:id", deleteCartItem);

app.get("/cart_item/checkout/cart/:id", checkOut);

module.exports = app;
