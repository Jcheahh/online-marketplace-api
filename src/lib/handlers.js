let products = [];
let cart_item = [];

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.getProduct = (req, res) => {
  const id = parseInt(req.params.id);

  for (let product of products) {
    if (product.id === id) {
      res.json(product);
      return;
    }
  }

  res.status(404).send("Product not found");
};

exports.postProduct = (req, res) => {
  const product = req.body;

  products.push({ id: Math.floor(Date.now() * Math.random()), product });

  res.status(201).send("Product is added to the database");
};

exports.putProduct = (req, res) => {
  const id = parseInt(req.params.id);

  const newProduct = req.body;

  for (const element of products) {
    if (element.id === id) {
      element.product = newProduct;
      res.status(204).send("Product is edited");
      return;
    }
  }

  res.status(404).send("Product is not exist");
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  products = products.filter((i) => {
    return i.id !== id;
  });

  res.status(204).send("Product is deleted");
};

// -------------------------------------------------------------------------------------------------------------------
// Cart Item

let exampleCart = { id: 1, username: "Jack" };

exports.getCartItems = (req, res) => {
  res.json(cart_item);
};

exports.getCartItem = (req, res) => {
  const id = parseInt(req.params.id);
  let productsWithCartID = [];

  for (let ci of cart_item) {
    if (ci.cart_id.id === id) {
      productsWithCartID.push(ci);
    }
  }
  if (productsWithCartID.length > 0) {
    res.json(productsWithCartID);
  } else {
    res.status(404).send("Product in the cart not found");
  }
};

exports.postCartItem = (req, res) => {
  const product = req.body;

  const product_id = req.body.product_id;
  // To check product must exist in product list
  const foundP = products.some((p) => p.id === product_id);

  if (foundP) {
    cart_item.push({
      id: Math.floor(Date.now() * Math.random()),
      cart_id: exampleCart,
      product,
    });
    res.status(201).send("Product is added to the cart in database");
    return;
  }
  res.send("ProductID not exist");
};

exports.putCartItem = (req, res) => {
  const id = parseInt(req.params.id);
  const qty = req.body.quantity;
  for (const c of cart_item) {
    if (c.id === id) {
      c.product.quantity = qty;
      res.status(204).send("Product in cart is edited");
      return;
    }
  }

  res.status(404).send("Product doesn't exist in the cart");
};

exports.deleteCartItem = (req, res) => {
  const id = parseInt(req.params.id);

  cart_item = cart_item.filter((i) => {
    return i.id !== id;
  });
  res.status(204).send("Product in cart is deleted");
};

exports.checkOut = (req, res) => {
  const id = parseInt(req.params.id);
  let count = 0;

  for (let c of cart_item) {
    if (id === c.cart_id.id) {
      for (let p of products) {
        if (p.id === c.product.product_id) {
          count += p.product.price * c.product.quantity;
        }
      }
    }
  }

  res.json({ total_price: count });
};
