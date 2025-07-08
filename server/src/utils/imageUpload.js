const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");

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

// Function to upload a file to ImageKit
async function uploadFileToImageKit(file, folder) {
    return await imagekit.upload({
        file: file.data, 
        fileName: file.name,
        folder: `/${folder}`,
        useUniqueFileName: true
    });
}


// Function to delete a file from ImageKit
async function deleteFileFromImageKit(fileUrl) {
    try {
        if (!fileUrl) return;

        // Extract file path after the urlEndpoint
        const filePath = fileUrl.replace(`${process.env.IMAGEKIT_URL_ENDPOINT}/`, '');
        
        // Get file ID from ImageKit
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

        // Ensure it's an array
        if (!Array.isArray(files)) {
            files = [files];
        }

        const urls = [];

        for (const file of files) {
            const url = await imageUpload(file); // no `req` here, just file
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
