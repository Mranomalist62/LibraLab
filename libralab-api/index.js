import 'dotenv/config'
import express from 'express';
import UserRoute from './src/route/userRoute.js'

const app = express();

app.use('/user',UserRoute)


app.listen(3000, () => console.log('server started'));