import express from 'express';
import * as transactionController from '../controller/transactionController.js';
import { imagePaymentUpload } from '../middleware/multerMiddleware.js';


const router = express.Router(); // Correct method to instantiate the router

router.post('/postTransaction', imagePaymentUpload.single('paymentFile'), transactionController.postTransaction);


router.get('/getTransactionByAuthorID', transactionController.getTransactionByAuthorID);
router.get('/getTransactionUnconfirmedByAuthorID', transactionController.getTransactionUnconfirmedByAuthorID);
// router.get('/getBookByRandom/',bookController.getRandomBook);
// router.get('/media/image/:cover_path',bookController.getBookCoverByUrl);
// router.get('/media/readable/:readable_path',bookController.getBookReadableByUrl);


// //path for editing book
// router.put('/putBook', dynamicUpload(), bookController.putBookByBookId)

// //path for deleting book
// router.delete('/deleteBook',bookController.deleteBookById)

export default router;