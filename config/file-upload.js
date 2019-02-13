const multer = require("multer");

const cloudinary = require("cloudinary");

const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  // never hard write these info, write them in .env file and use a variable
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "ndi-pictures"

  //to upload things that are NOT images
  // params: {
  //   resource_type: 'raw'
  // }
});

// this is a multer upload object that should connect to a ROUTE
const fileUploader = multer({ storage });

module.exports = fileUploader;
