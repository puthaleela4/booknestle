
const express = require("express");
const Order = require("../models/order");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();


// ✅ Place Order (User)
router.post("/", auth, async (req, res) => {
  const { books, totalPrice } = req.body;

  if (!books || books.length === 0) {
    return res.status(400).json({ message: "No books in order" });
  }

  const order = new Order({
    user: req.user.id,
    books,
    totalPrice,
    status: "Pending"
  });

  await order.save();

  res.status(201).json({ message: "Order placed successfully", order });
});


// ✅ Get Logged-in User Orders
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("books.book")
    .sort({ createdAt: -1 });

  res.json(orders);
});


// ✅ Admin: Get All Orders
router.get("/", auth, role("admin"), async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("books.book")
    .sort({ createdAt: -1 });

  res.json(orders);
});


// ✅ Admin: Update Order Status
router.put("/:id/status", auth, role("admin"), async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json({ message: "Order status updated", order });
});

module.exports = router;
