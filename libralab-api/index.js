import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from './src/route/userRoute.js'; // Importing the default export

const app = express();
app.use(cors()); 

app.use(bodyParser.json());
app.use('/user', userRoute); // Prefixing all routes with /user

app.listen(3000, () => console.log('Server started on port 3000'));