import { validationResult } from 'express-validator';
import note from '../models/notemodule.js';



// view / read -> get
export const getAllNotes = async (req, res) => {
    try {
        const notes = await note.find();
        res.status(200).json({ count: notes.length, notes });   
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getNoteById = async (req, res) => {
    try {
        const note = await note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(200).json({ note });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// create -> post
export const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { name , age , weight } = req.body;
    const newNote = new note({ name, age, weight });
    await newNote.save();
    // await note.save(newNote);
    res.status(201).json({ message: 'Note created', note: newNote });
};

// update -> put
export const updateNote = async (req, res) => {
    try {
        const note = await note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        const { name, age, weight } = req.body;
        if (name) note.name = name;
        if (age) note.age = age;
        if (weight) note.weight = weight;
        await note.save();
        res.status(200).json({ message: 'Note updated', note });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Note updated', note });
};

// delete -> delete
export const deleteNote = async (req, res) => {
    try {
        const note = await note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await note.remove();
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// export default { getAllNotes, getNoteById, createNote, updateNote, deleteNote };