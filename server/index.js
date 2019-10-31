const express = require("express");
const app = express();
const cors = require("cors");

const itemsApi = require("./api/items");

app.get("/", (req, res, next) => {
  res.send("200 server OK!");
});

app.use("/api/items", itemsApi);

const server = app.listen(5000, () => {
  console.log(`listening http://localhost:${server.address().port}`);
});
