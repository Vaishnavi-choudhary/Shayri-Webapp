import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));

app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);
const PORT = 8800;

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,

}).then(()=>app.listen(PORT,()=>console.log(`Server is running on Port ${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);
