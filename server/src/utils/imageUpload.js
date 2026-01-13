const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToImageKit(file, folder) {
    try {

        const compressedBuffer = await sharp(file.data)
            .resize({ width: 1024 }) 
            .toFormat("jpeg", { quality: 70 }) 
            .toBuffer();

        
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
