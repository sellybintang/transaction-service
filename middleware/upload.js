const multer = require("multer");
const path = require("path");

// Konfigurasi multer untuk mengunggah file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "lib/ktp_user/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname).toLowerCase(); // Mendapatkan ekstensi file
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".pdf"]; // Ekstensi yang diizinkan

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(extname)) {
    cb(null, true); // File diizinkan
  } else {
    cb(new Error("File type is not allowed"), false); // File tidak diizinkan
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
// console.log(upload);
module.exports = upload;
