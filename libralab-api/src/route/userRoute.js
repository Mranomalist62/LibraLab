
import express from 'express';
import bodyParser from 'body-parser';
import * as userController from '../controller/userController.js'

const app = express();
app.use(bodyParser.json());

//CRUD operation

app.get('/get', userController.getUser);

app.get('/get/name', userController.getUserbyName);

app.get('/get/email',userController.getUserbyEmail);

app.get('/get/:id',userController.getUserbyID);

app.post('/post',userController.postUser);

app.put('/put/:id',userController.putUser);

app.delete('/delete/:id',userController.deleteUser);

//Sign Up Operation

app.post('/initiateSignUp',userController.InitiateSignUp);

app.post('/finishSignUp', userController.finishSignUp);

//login Operation

