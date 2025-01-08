import express from 'express';
import * as bookController from '../controller/bookController.js';
import { dynamicUpload } from '../middleware/multerMiddleware.js';


const router = express.Router(); // Correct method to instantiate the router

router.post('/postBook', dynamicUpload(), bookController.postBook);
// get Operation

router.get('/getBookByAuthorId', bookController.getBookByAuthorId);
router.get('/getBookByRandom/',bookController.getRandomBook);
router.get('/getBookByID',bookController.getBookById);
router.get('/media/image/:cover_path',bookController.getBookCoverByUrl);
router.get('/media/readable/:readable_path',bookController.getBookReadableByUrl);


//path for editing book
router.put('/putBook', dynamicUpload(), bookController.putBookByBookId)

//path for deleting book
router.delete('/deleteBook',bookController.deleteBookById)

export default router;