import { Image } from '../models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getImages = async (req, res) => {
    const images = await Image.find({});
    res.status(200).json(images);
}
export const sendImages = async (req, res) => {
    const { urls, userId } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ message: 'urls must be a non-empty array' });
    }

    try {
        const image = new Image({ url: urls, userId });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
