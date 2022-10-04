const request = require("supertest");
const app = require("../../../index");

beforeAll(async () => {
  const product = {
    name: "Mask",
    price: 20,
    brand: "Medicos",
    product_details: "Anti covid",
  };
  await request(app).post("/product").send(product);
  const allProduct = await request(app).get("/products");
  global.id = allProduct.body[0].id;

  const cart_item = {
    product_id: id,
    quantity: 1,
  };

  await request(app).post("/cart_item").send(cart_item);
  const allCartItem = await request(app).get("/cart_items");
  global.cartItem_id = allCartItem.body[0].id;
});

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// Product Contents

describe("GET '/products'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/products");
    expect(response.body[0].product.name).toEqual("Mask");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET '/product/:id'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get(`/product/${id}`);
    expect(response.body.product.name).toEqual("Mask");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST '/product'", () => {
  test("Create a valid product", async () => {
    const product = {
      name: "Vaseline",
      price: 4.95,
      brand: "Vaseline",
      product_details: "Repair dry",
    };
    try {
      const response = await request(app).post("/product").send(product);
      expect(response.statusCode).toBe(201);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("PUT '/product/:id'", () => {
  test("Edit a valid product", async () => {
    const product = {
      name: "Plaster",
      price: 9.99,
      brand: "Plaster",
      product_details: "Good",
    };
    try {
      const response = await request(app).put(`/product/${id}`).send(product);
      expect(response.statusCode).toBe(204);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("DELETE '/product/:id'", () => {
  test("Delete a product", async () => {
    try {
      const response = await request(app).delete(`/product/${id}`);
      expect(response.statusCode).toBe(204);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

// Cart Item

describe("GET '/cart_items'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/cart_items");
    expect(response.body[0].product.product_id).toEqual(id);
    expect(response.body[0].id).toEqual(cartItem_id);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET '/cart_item/cart/:id'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get(`/cart_item/cart/1`);
    expect(response.body[0].product.product_id).toEqual(id);
    expect(response.body[0].id).toEqual(cartItem_id);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST '/cart_item'", () => {
  test("Create a valid cart_item", async () => {
    const product = {
      name: "Vaseline",
      price: 4.95,
      brand: "Vaseline",
      product_details: "Repair dry",
    };
    try {
      const response = await request(app).post("/cart_item").send(product);
      expect(response.statusCode).toBe(201);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("PUT '/cart_item/:id/product'", () => {
  test("Edit a valid product", async () => {
    const product = {
      name: "Plaster",
      price: 9.99,
      brand: "Plaster",
      product_details: "Good",
    };
    try {
      const response = await request(app)
        .put(`/cart_item/${cartItem_id}/product`)
        .send(product);
      expect(response.statusCode).toBe(204);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("DELETE '/cart_item/product/:id'", () => {
  test("Delete a product", async () => {
    try {
      const response = await request(app).delete(
        `/cart_item/product/${cartItem_id}`
      );
      expect(response.statusCode).toBe(204);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("GET '/cart_item/checkout/cart/:id'", () => {
  test("GET a total price of all product with the param id", async () => {
    try {
      const response = await request(app).get(`/cart_item/checkout/cart/1`);
      expect(response.statusCode).toBe(204);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});
