import express from 'express';
import * as staffController from '../controller/staffController.js';

const router = express.Router(); // Correct method to instantiate the router

// Sign Up Operation
router.post('/initiateSignUp', staffController.initiateSignUp);

// Login Operation
router.post('/login', staffController.loginStaff);

export default router;