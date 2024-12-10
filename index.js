import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; 
import userRoute from './src/route/userRoute.js'; // Importing the default export
import authorRoute from './src/route/authorRoute.js';
import bookRoute from './src/route/bookRoute.js';
import staffRoute from './src/route/staffRoute.js';
import jobdeskRoute from './src/route/jobdeskRoute.js';


const app = express();

//this will be necessary if we ever run api server and web server in same url

app.use(cors({
    origin: 'http://localhost',  // Adjust the origin to your frontend URL
    credentials: true            // Allow cookies to be sent with requests
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRoute); // Prefixing user routes with /user
app.use('/author', authorRoute); // Prefixing author routes with /author
app.use('/book',bookRoute); // Prefixing book routes with /book
app.use('/staff',staffRoute); // Prefixing staff routes with /staff
app.use('/jobdesk',jobdeskRoute);// Prefixing jobdesk route with /Jobdesk


app.listen(3000, () => console.log('Server started on port 3000'));