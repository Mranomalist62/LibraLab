
import express from 'express';
import bodyParser from 'body-parser';
import * as controller from '../controller/userController.js'

const app = express();
app.use(bodyParser.json());

app.get('/user', controller.getUser);

app.get('/user/:id',controller.getUserbyID);

app.post('/user',controller.postUser);

app.put('/user/:id',controller.putUser);

app.delete('/user/:id',dcontroller.deleteUser);

app.listen(3000, () => console.log('server started'))
