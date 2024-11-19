
import express from 'express';
import bodyParser from 'body-parser';
import * as userController from '../controller/userController.js'

const app = express();
app.use(bodyParser.json());

//CRUD operation

app.get('/get', userController.getUser);

app.get('/get/name', userController.getUserbyName);

app.get('/get/email',userController.getUserbyEmail);

app.get('/user/get/:id',userController.getUserbyID);

app.post('/user/post',userController.postUser);

app.put('/user/put/:id',userController.putUser);

app.delete('/user/delete/:id',userController.deleteUser);

//Sign Up Operation

app.post('/user/initiateSignUp',userController.InitiateSignUp);

app.post('/user/finishSignUp', userController.finishSignUp);

//login Operation

