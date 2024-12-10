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
import fs from 'fs';
import { format } from 'util';
import https from 'https';

const app = express();

//this will be necessary if we ever run api server and web server in same url

const corsOptions = {
  origin: 'localhost', // Your frontend URL
  credentials: true // Allow cookies to be sent with requests
};

// Log the CORS configuration
console.log('CORS Configuration:', corsOptions);
// Apply CORS middleware for preflight request
app.use(cors(corsOptions));

const options = {
  key: fs.readFileSync('./private.key'), // Path to private key
  cert: fs.readFileSync('./certificate.crt'), // Path to certificate
  ca: fs.readFileSync('./ca_bundles.crt'), // Path to CA bundle
};


app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRoute); // Prefixing user routes with /user
app.use('/author', authorRoute); // Prefixing author routes with /author
app.use('/book',bookRoute); // Prefixing book routes with /book
app.use('/staff',staffRoute); // Prefixing staff routes with /staff
app.use('/jobdesk',jobdeskRoute);// Prefixing jobdesk route with /Jobdesk

const log_file = fs.createWriteStream(new URL('./debug.log', import.meta.url), { flags: 'w' });
const log_stdout = process.stdout;

console.log = (d, e, f, g) => {
  log_file.write(format('LOG: ', d || '', e || '', f || '', g || '') + '\n');
  log_stdout.write(format('LOG: ', d || '', e || '', f || '', g || '') + '\n');
};

console.error = (d, e, f, g) => {
  log_file.write(format('ERROR: ', d || '', e || '', f || '', g || '') + '\n');
  log_stdout.write(format('ERROR: ', d || '', e || '', f || '', g || '') + '\n');
};

https.createServer(options, app).listen(3000, () => {
  console.log('Server is running on HTTPS, port 3000');
});