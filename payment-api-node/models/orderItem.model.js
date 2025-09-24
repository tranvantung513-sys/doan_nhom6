const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }
});

module.exports = OrderItemSchema;
