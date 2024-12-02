import express from 'express';
import * as bookController from '../controller/bookController.js';
import { upload } from '../middleware/multerMiddleware.js/index.js';


const router = express.Router(); // Correct method to instantiate the router

router.post('/postBook', upload.single('coverfile'), bookController.postBook);
// get Operation

router.get('/getBookByAuthorId', bookController.getBookByAuthorId);
router.get('/media/image/:cover_path',bookController.getBookCoverByUrl);


//path for editing book
router.put('/putBook', upload.single('coverfile'), bookController.putBookByBookId)

//path for deleting book
router.delete('/deleteBook',bookController.deleteBookById)

export default router;