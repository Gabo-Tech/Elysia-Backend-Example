import mongoose, { Schema, Document } from 'mongoose';


export interface UserInterface extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<UserInterface>('User', userSchema);
export default User;