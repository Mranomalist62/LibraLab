import express from 'express';
import * as userController from '../controller/userController.js';

const router = express.Router(); // Correct method to instantiate the router

// CRUD operation
router.get('/get/name', userController.getUserbyName);
router.get('/get/email', userController.getUserbyEmail);
router.get('/get/:id', userController.getUserbyID);
router.post('/post', userController.postUser);
router.put('/put/:id', userController.putUser);
router.delete('/delete/:id', userController.deleteUser);

// Sign Up Operation
router.post('/initiateSignUp', userController.InitiateSignUp);
router.post('/finishSignUp', userController.finishSignUp);

// Login Operation
router.post('/login', userController.loginUser);

export default router;