const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors')

const jobsRoute = require('./routes/jobsRoute')

const app = express();
require('dotenv').config()



app.use(cors({
    origin: 'https://mychatapp9.netlify.app',
    credentials: true,
  }));

app.use(express.json())


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('Database connected');
})
.catch((err)=>{
    console.log(err);
})



app.get('/', (req, res)=>{
    res.send('Hello');
})

app.use('/api/applies',jobsRoute)



app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`);
})