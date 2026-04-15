import { validationResult } from 'express-validator';
import Note from '../models/notemodule.js';



// view / read -> get
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// create -> post
export const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { title, body, category, color } = req.body;
    const newNote = await Note.create({ 
        title, 
        body, 
        category: category || 'personal',
        color: color || '#ffd93d',
        user: req.user._id 
    });
    res.status(201).json({ success: true, data: newNote });
};

// update -> put
export const updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ error: 'Note not found' });

        const { title, body, category, color } = req.body;
        if (typeof title === 'string') note.title = title;
        if (typeof body === 'string') note.body = body;
        if (typeof category === 'string') note.category = category;
        if (typeof color === 'string') note.color = color;

        await note.save();
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete -> delete
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await Note.deleteOne({ _id: note._id });
        res.status(200).json({ success: true, message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ─── ADMIN ONLY ───────────────────────────────────────────────────────────────

// GET /admin/all — fetch all notes from every user
export const getAllNotesAdmin = async (req, res) => {
    try {
        const notes = await Note.find()
            .populate('user', 'name email role')  // shows who owns each note
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: notes.length, data: notes });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /admin/:id — admin can delete any note regardless of owner
export const adminDeleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await Note.deleteOne({ _id: note._id });
        res.status(200).json({ success: true, message: 'Note deleted by admin' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// export default { getAllNotes, getNoteById, createNote, updateNote, deleteNote };