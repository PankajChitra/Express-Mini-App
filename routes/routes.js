// routes/routes.js
import express from 'express';
const router = express.Router();

import { body } from 'express-validator';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote }
from '../controller/controller.js';
import { protect } from '../middleware/authmiddleware.js';

// GET all notes
router.get('/', protect, getAllNotes);

// GET one note
router.get('/:id', protect, getNoteById);

// POST create note ✅ fixed validation
router.post('/',protect, [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').isLength({ min: 5 }).withMessage('Body must be at least 5 characters')
], createNote);

// PUT update note
router.put('/:id', protect, updateNote);

// DELETE note
router.delete('/:id', protect, deleteNote);

export default router;