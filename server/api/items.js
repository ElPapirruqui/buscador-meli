const express = require("express");
const cors = require("cors");
const router = express.Router();
const ItemsService = require("../services/items");

const itemsService = new ItemsService();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

router.get("/", cors(corsOptions), async (req, res, next) => {
  const { q } = req.query;
  try {
    const data = await itemsService.getItemsList(q);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    //next(err);
  }

  res.end();
});

router.get("/:id", cors(corsOptions), async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await itemsService.getItemById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    //next(err);
  }

  res.end();
});

module.exports = router;
