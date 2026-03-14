// controllers/noteController.js
const { validationResult } = require('express-validator');

let notes = [
    // { id: 1, title: 'First Note', body: 'This is the body' }
];

const getAllNotes = (req, res) => {
    res.status(200).json({ count: notes.length, notes });
};

const getNoteById = (req, res) => {
    const note = notes.find(n => n.id === Number(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ note });
};

const createNote = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { title, body } = req.body;
    const newNote = { id: notes.length+1, title, body };
    notes.push(newNote);
    res.status(201).json({ message: 'Note created', note: newNote });
};

const updateNote = (req, res) => {
    const note = notes.find(n => n.id === Number(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    const { title, body } = req.body;
    if (title) note.title = title;
    if (body) note.body = body;
    res.status(200).json({ message: 'Note updated', note });
};

const deleteNote = (req, res) => {
    const index = notes.findIndex(n => n.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Note not found' });
    notes.splice(index, 1);
    res.status(200).json({ message: 'Note deleted' });
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };