
import express from 'express';
import bodyParser from 'body-parser';
import * as controller from '../controller/userController.js'

const app = express();
app.use(bodyParser.json());

//CRUD operation

app.get('/user/get', controller.getUser);

app.get('/user/get', controller.getUser);

app.get('/user/get/:id',controller.getUserbyID);

app.post('/user/post',controller.postUser);

app.put('/user/put/:id',controller.putUser);

app.delete('/user/delete/:id',dcontroller.deleteUser);

//Login Operation

app.post('/user/login');
