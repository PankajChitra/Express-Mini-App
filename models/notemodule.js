import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['personal', 'work', 'ideas', 'todo', 'archive'],
      default: 'personal'
    },
    color: {
      type: String,
      default: '#ffd93d'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Note = models.Note || model('Note', NoteSchema);

export default Note;
