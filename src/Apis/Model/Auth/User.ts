import mongoose, { Schema, Document } from 'mongoose';

// Define the user model
interface UserDocument extends Document {
    username: string;
    email: string;
    mobile: string;
    password: string;
}

// Define the user schema
const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: { type: String, required: true },
});


const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
