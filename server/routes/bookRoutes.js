
const express = require("express");
const Book = require("../models/book");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();


// ================= GET ALL BOOKS + SEARCH =================
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};

    const books = await Book.find(keyword);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= ADD BOOK (ADMIN) =================
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= UPDATE BOOK (ADMIN) =================
router.put("/:id", auth, role("admin"), async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book Not Found" });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= DELETE BOOK (ADMIN) =================
router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book)
      return res.status(404).json({ message: "Book Not Found" });

    res.json({ message: "Book Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
