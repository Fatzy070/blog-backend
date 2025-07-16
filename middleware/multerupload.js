const multer = require('multer');
const { storage } = require('../config/cloudinary'); // this is cloudinary storage

const upload = multer({ storage }); // use cloudinary storage

module.exports = upload;
