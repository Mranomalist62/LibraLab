import multer from 'multer';
import path from 'path';

// Configure where and how to store uploaded files
const storage = multer.diskStorage({
    // Define destination folder for uploaded files
    destination: function (req, file, cb) {
        cb(null, 'libralab-api/media/image/book'); // 'uploads/' is the directory where the files will be stored
    },
    
    // Define how the uploaded file should be named
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Adds original file extension
    }
});

// File size limit (e.g., 5MB) and file type validation (JPEG, PNG, GIF)
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },  // 5MB max file size
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;  // Accepted file types (images)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extname) {
            return cb(null, true); // file type is valid
        } else {
            cb(new Error('Only image files are allowed!'), false); // Invalid file type
        }
    }
});

export { upload };

