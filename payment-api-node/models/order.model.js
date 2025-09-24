const mongoose = require("mongoose");
const OrderItemSchema = require("./orderItem.model");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, default: "anonymous" },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, enum: ["COD", "VNPay", "Momo"], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid", "Shipped"], default: "Pending" },
  items: [OrderItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
