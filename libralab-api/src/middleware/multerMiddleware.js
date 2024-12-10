import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure where and how to store uploaded files
const storage = multer.diskStorage({
  // Define destination folder for uploaded files
  destination: function (req, file, cb) {
    const dir = path.resolve('libralab-api/media/image/book');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Buat direktori jika belum ada
    }
    cb(null, dir); // Set direktori tujuan
  },

  // Define how the uploaded file should be named
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Unique name
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    ); // Adds original file extension
  },
});

// File size limit and file type validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/; // Accepted file types (images)
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true); // File type is valid
    } else {
      cb(new Error('Only image files are allowed!'), false); // Invalid file type
    }
  },
});

export { upload };
