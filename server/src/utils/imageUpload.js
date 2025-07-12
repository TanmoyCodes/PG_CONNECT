const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp"); // ✅ added sharp for image compression

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Function to check if a file type is supported
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// Function to upload a file to ImageKit (with compression)
async function uploadFileToImageKit(file, folder) {
    try {
        const fileType = file.name.split('.').pop().toLowerCase();
        const supportedTypes = ["jpg", "jpeg", "png"];

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            throw new Error("Unsupported file type.");
        }

        // ✅ Compress image using sharp
        const compressedBuffer = await sharp(file.data)
            .resize({ width: 1024 }) // optional resize to max width 1024px
            .toFormat("jpeg", { quality: 70 }) // compress to jpeg with 70% quality
            .toBuffer();

        // ✅ Upload compressed image to ImageKit
        return await imagekit.upload({
            file: compressedBuffer,
            fileName: file.name,
            folder: `/${folder}`,
            useUniqueFileName: true
        });
    } catch (error) {
        throw new Error("Error during image compression/upload: " + error.message);
    }
}

// Function to delete a file from ImageKit
async function deleteFileFromImageKit(fileUrl) {
    try {
        if (!fileUrl) return;

        const filePath = fileUrl.replace(`${process.env.IMAGEKIT_URL_ENDPOINT}/`, '');
        const searchResult = await imagekit.listFiles({
            path: filePath,
        });

        if (searchResult.length > 0) {
            await imagekit.deleteFile(searchResult[0].fileId);
        }
    } catch (error) {
        console.log("Error deleting image from ImageKit:", error.message);
    }
}

async function imageUpload(file, existingImageUrl) {
    try {
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();

        // Optional: validate file type
        // if (!isFileTypeSupported(fileType, supportedTypes)) {
        //     throw new Error("Image format not supported.");
        // }

        if (existingImageUrl) {
            await deleteFileFromImageKit(existingImageUrl);
        }

        const response = await uploadFileToImageKit(file, "fileUploadFolder");
        return response.url;

    } catch (error) {
        throw new Error("Error in imageUpload: " + error.message);
    }
}

async function multipleImageUpload(req) {
    try {
        let files = req.files?.imageFiles;
        if (!files) throw new Error("No files received");

        if (!Array.isArray(files)) {
            files = [files];
        }

        const urls = [];

        for (const file of files) {
            const url = await imageUpload(file);
            urls.push(url);
        }

        return urls;

    } catch (error) {
        throw new Error("Error in multipleImageUpload: " + error.message);
    }
}

module.exports = {
    imageUpload,
    multipleImageUpload
};
