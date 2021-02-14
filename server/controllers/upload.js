const multer = require("multer");

// Ensuring that our image uploaded is a valid file type
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
