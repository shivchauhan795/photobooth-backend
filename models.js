import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URL);


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const imageSchema = new mongoose.Schema({
    url: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});


export const User = mongoose.model('User', userSchema);
export const Image = mongoose.model('Image', imageSchema);