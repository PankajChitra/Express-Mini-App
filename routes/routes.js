// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllNotes, getNoteById,
  createNote, updateNote, deleteNote
} = require('../controller/controller');

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', [
  
  body('title').notEmpty().withMessage('Title is required'),
  body('body').isLength({ min: 5 }).withMessage('Body min 5 chars')
], createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;