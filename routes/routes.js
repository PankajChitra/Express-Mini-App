
import express from 'express';
const router = express.Router();

import { body } from 'express-validator';

import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } 
from '../controller/controller.js';

// CRUD Operations for notes

// View / Read -> get
router.get('/', getAllNotes);
router.get('/:id', getNoteById);

// create -> post
router.post('/', [
  
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isNumeric().withMessage('Age must be a number'),
  body('weight').isNumeric().withMessage('Weight must be a number')
], createNote);

// update -> put
router.put('/:id', updateNote);

// delete -> delete
router.delete('/:id', deleteNote);

export default router;