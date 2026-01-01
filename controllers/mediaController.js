import { Image } from '../models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

const upload = multer({ storage: multer.memoryStorage() }); // store files in memory

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Upload images to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url); // public URL
            }
        );
        stream.end(fileBuffer);
    });
};

export const getImages = async (req, res) => {
    const images = await Image.find({});
    res.status(200).json(images);
}
// Upload images and save URLs to DB
export const sendImages = [
    upload.array("images"), // "images" = name of field in FormData
    async (req, res) => {
        const userId = req.userId;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        try {
            // Upload each file to Cloudinary
            const uploadedUrls = [];
            for (const file of req.files) {
                const url = await uploadToCloudinary(file.buffer);
                uploadedUrls.push(url);
            }

            // Save URLs in MongoDB
            const imageDoc = new Image({ url: uploadedUrls, userId });
            await imageDoc.save();

            res.status(201).json(imageDoc);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Upload failed" });
        }
    }
];