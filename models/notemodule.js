import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const MySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  age : {
    type: Number,
    required: true,
  },
  weight : {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model('User', MySchema);

export default userModel;

// import mongoose from 'mongoose';
// const { Schema, model, models } = mongoose;

// const NoteSchema = new Schema({
//  name: {
//     type: String,
//     required: true,
//     maxlength: 50
//   },
//   age : {
//     type: Number,
//     required: true,
//   },
//   weight : {
//     type: Number,
//     required: true,
//   },
// }, { timestamps: true });

// const Note = models.Note || model('Note', NoteSchema);
// export default Note;