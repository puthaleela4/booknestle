
const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const auth = require("../middleware/authMiddleware");

router.post("/add/:bookId", auth, async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user.id, books: [] });
  }

  wishlist.books.push(req.params.bookId);
  await wishlist.save();

  res.json(wishlist);
});

router.get("/", auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id })
    .populate("books");

  res.json(wishlist);
});

module.exports = router;
