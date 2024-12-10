import multer from 'multer';
import path from 'path';

// Configure where and how to store uploaded files
const imageStorage = multer.diskStorage({
    // Define destination folder for uploaded files
    destination: function (req, file, cb) {
        cb(null, 'media/image/book'); // 'uploads/' is the directory where the files will be stored
    },
    
    // Define how the uploaded file should be named
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Adds original file extension
    }
});

const readableStorage = multer.diskStorage({
    // Define destination folder for uploaded files
    destination: function (req, file, cb) {
        cb(null, 'media/readable/book'); // 'uploads/' is the directory where the files will be stored
    },
    
    // Define how the uploaded file should be named
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Adds original file extension
    }
});

// File size limit (e.g., 50MB) and file type validation (JPEG, PNG, GIF)
const imageUpload = multer({ 
    storage: imageStorage,
    limits: { fileSize: 50 * 1024 * 1024 },  // 50MB max file size
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

const readableUpload = multer({ 
    storage: readableStorage,
    limits: { fileSize: 50 * 1024 * 1024 },  // 5MB max file size
    fileFilter: function (req, file, cb) {
        const fileTypes = /pdf/;  // Accepted file types (images)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extname) {
            return cb(null, true); // file type is valid
        } else {
            cb(new Error('Only pdf files are allowed!'), false); // Invalid file type
        }
    }
});

//to handle both upload image and readable in same time
const dynamicUpload = () => {
    return (req, res, next) => {
        const upload = multer({
            
            //this for the storage setting
            storage: multer.diskStorage({
            
                destination: function (req, file, cb) {
                    const dest =
                        file.fieldname === 'coverfile'
                            ? 'media/image/book'
                            : 'media/readable/book';
                    cb(null, dest);
                },

                filename: function (req, file, cb) {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
                },
            }),

            //this for the file filter
            fileFilter: function (req, file, cb) {
                const allowedTypes =
                    file.fieldname === 'coverfile'
                        ? /jpeg|jpg|png|gif/
                        : /pdf/;

                const isValid = allowedTypes.test(file.mimetype) &&
                    allowedTypes.test(path.extname(file.originalname).toLowerCase());

                if (isValid) cb(null, true);
                else cb(new Error(`Invalid file type for ${file.fieldname}.`), false);
            },

        //the parameter will be returned here
        }).fields([
            { name: 'coverfile', maxCount: 1 },
            { name: 'readablefile', maxCount: 1 },
        ]);

        
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    };
};

export { imageUpload, readableUpload, dynamicUpload };

