import mongoose from 'mongoose';
const { Schema, model,models } = mongoose;

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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}); 

const User = models.User || model('User', MySchema);
export default User;