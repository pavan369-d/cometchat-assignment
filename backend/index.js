const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors')

const jobsRoute = require('./routes/jobsRoute')

const app = express();
require('dotenv').config()



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

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