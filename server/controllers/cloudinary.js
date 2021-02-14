const cloudinary = require("cloudinary");

// configuring the cloudinary account for image upload, values hidden

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET,
});
