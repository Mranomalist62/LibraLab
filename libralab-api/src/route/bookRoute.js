import express from 'express';
import * as bookController from '../controller/bookController.js';
import { upload } from '../middleware/multerMiddleware';
import path from 'path';
import { fileURLToPath } from 'url';


const router = express.Router(); // Correct method to instantiate the router

// get Operation
router.post('/postBook', upload.single('coverfile'), bookController.postBook);
router.get('/getBookByAuthorId', bookController.getBookByAuthorId);



//path for bookImage
router.get('/media/image/:cover_path',bookController.getBookCoverByUrl);


//path for deleting book
router.delete('/deleteBook',bookController.deleteBookById)

export default router;