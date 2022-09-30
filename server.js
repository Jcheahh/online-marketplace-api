const app = require("./index");

const port = process.env.PORT || 80;

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
