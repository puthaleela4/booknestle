
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const Order = require('../models/order');
const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const sellers = await User.countDocuments({ role: 'seller' });
    const books = await Book.countDocuments();
    const orders = await Order.countDocuments();
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      users,
      sellers,
      books,
      orders,
      revenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).select('-password');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;