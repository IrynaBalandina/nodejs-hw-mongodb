import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

import {unlink} from "node:fs/promises";

dotenv.config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder: "posters"
    });
    await unlink(file.path);
    return response.secure_url;
};
