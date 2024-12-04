import express from 'express';
import * as jobdeskController from '../controller/jobdeskController.js';

const router = express.Router(); // Correct method to instantiate the router

// get Operation
router.get('/getJobdeskAll', jobdeskController.getJobdeskAll);

export default router;
