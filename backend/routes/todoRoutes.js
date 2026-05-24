const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

// ✅ CREATE
router.post("/add", auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      userId: req.user.id
    });

    const saved = await newTodo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding todo" });
  }
});

// ✅ GET USER TODOS
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// ✅ UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating" });
  }
});

// ✅ DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;