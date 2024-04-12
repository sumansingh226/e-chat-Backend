import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
    username: string;
    email: string;
    mobile: string;
    password: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: "male" | "female" | "other";
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zip?: string;
    };
}

// Define the user schema
const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String },
    },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
