// const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage()

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, new Date().getTime() + path.extname(file.originalname));
//   }
// });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only jpg, png and jpeg are allowed"), false);
  }
}

const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});

module.exports = {
  uploadImage
};
