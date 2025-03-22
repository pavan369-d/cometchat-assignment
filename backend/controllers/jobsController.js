const { default: mongoose } = require("mongoose");
const JobsList = require("../model/jobsModel");


const getAllApplies = async (req, res) => {
  

    try {
       
        const jobs = await JobsList.find({ }).sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({ error: 'No job applications found!' });
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ error: 'Server error, please try again later!' });
    }
};


const createJobApply = async(req,res)=>{
    const {title,description,link,status} = req.body;
   
    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!description){
        emptyFields.push('description');
    }
    if(!link){
        emptyFields.push('link');
    }
    if(!status){
        emptyFields.push('status');
    }

    if(emptyFields.length >0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }
    try{
        
        
        const response = await JobsList.create({title,description,link,status})
        console.log(response);
    res.status(201).json(response)
   }catch(error){
    res.status(500).json({error:error.message})
   }
};

const getJobApply = async(req,res)=>{
   const {id} = req.params;
   console.log(id);

   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Invalid Job ID'})
   }
    try{
        const appliedJob = await JobsList.findById(id);
        if(!appliedJob){
          return  res.status(404).json({error:'No such Job apply'});
        }
        res.status(200).json(appliedJob)
    }catch(error){
        res.status(500).json({error:error.message})
    }
};

const updateJobApply = async(req,res)=>{
   const {id} = req.params;

   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Invalid Job ID'})
   }
   try{
    
    const updateJob = req.body;
    if(Object.keys(updateJob).length === 0){
        return res.status(400).jobs({error:'Request body is required'});
    }
    const updatedJob = await JobsList.findByIdAndUpdate(id,updateJob,{new: true})
    if(!updatedJob){
      return  res.status(404).json({error:'No Such Job Apply!'})
    }
    res.status(200).json(updatedJob)
}catch(error){
    res.status(500).json({error:error.message})
   }
   
};

const deleteJobApply = async(req,res)=>{
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Invalid Job ID'})
   }
   try{
    const deletedJob = await JobsList.findByIdAndDelete(id);
    if(!deletedJob){
      return  res.status(404).json({error:'No such Job Apply'});
    }
    res.status(200).json({message:'Job successfully deleted',deletedJob})
   }catch(error){
    res.status(500).json({error:error.message})
   }
};

module.exports = {
    getAllApplies,
    createJobApply,
    getJobApply,
    updateJobApply,
    deleteJobApply
}