const mongoose = require('mongoose');

const schema = mongoose.Schema

const jobsSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        required:true
    },
   
},{timestamps:true})

const JobsList = mongoose.model('Joblist', jobsSchema);

module.exports = JobsList