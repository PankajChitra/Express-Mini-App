import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const MySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email : {
        type: String,
        required: true,
        unique: true
    } ,
  password : {
      type: String,
      required: true,
      select: false 
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
//   email : {
//         type: String,
//         required: true,
//         unique: true
//     } ,
//   password : {
//       type: String,
//       required: true,
//       select: false 
//   }
// }, { timestamps: true });

// const Note = models.Note || model('Note', NoteSchema);
// export default Note;