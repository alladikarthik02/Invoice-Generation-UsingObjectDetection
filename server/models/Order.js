// models/Order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: String,
  dateTime: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
