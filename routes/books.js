const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Retrieve all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving books' });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    const book = await Book.create({ title, author, description, price });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, price } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, description, price },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Error deleting book' });
  }
});

module.exports = router;
