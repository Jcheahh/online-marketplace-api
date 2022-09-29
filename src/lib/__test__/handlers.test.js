const request = require("supertest");
const app = require("../../../index");

// beforeAll((done) => {
//   const product = {
//     name: "Mask",
//     price: 20,
//     brand: "Medicos",
//     product_details: "Anti covid",
//   };
//   request(app).post("/product").send(product);
//   done();
// });

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

describe("GET '/products'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/products");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST '/product'", () => {
  test("Create a valid product", async () => {
    const product = {
      name: "Mask",
      price: 20,
      brand: "Medicos",
      product_details: "Anti covid",
    };
    try {
      const response = await request(app).post("/product").send(product);
      expect(response.statusCode).toBe(201);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

describe("GET '/cart_items'", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/cart_items");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
});

test("Test description", () => {
  const t = () => {
    throw new TypeError("UNKNOWN ERROR");
  };
  expect(t).toThrow(TypeError);
  expect(t).toThrow("UNKNOWN ERROR");
});
