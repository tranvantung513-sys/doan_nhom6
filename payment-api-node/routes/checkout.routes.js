const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/checkout.controller");

router.post("/checkout", createOrder);

module.exports = router;
