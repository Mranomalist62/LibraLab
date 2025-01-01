import express from 'express';
import * as authorController from '../controller/authorController.js';

const router = express.Router(); // Correct method to instantiate the router

// CRUD operation
// router.get('/get/name', authorController.getUserbyName);
// router.get('/get/email', authorController.getUserbyEmail);
// router.get('/get/:id', authorController.getUserbyID);
// router.post('/post', authorController.postUser);
// router.put('/put/:id', authorController.putUser);
// router.delete('/delete/:id', authorController.deleteUser);

// Sign Up Operation
router.post('/initiateSignUp', authorController.initiateSignUp);
router.post('/reinitiateSignUp',authorController.reinitiateSignUp)
router.post('/finishSignUp', authorController.finishSignUp);

// Login Operation
router.post('/login', authorController.loginAuthor);


router.get('/getAuthorByID', authorController.getAuthorByID);

export default router;