const express = require('express');
const { getAllApplies, createJobApply, getJobApply, updateJobApply, deleteJobApply } = require('../controllers/jobsController');

const router = express.Router();



router.get('/',getAllApplies)

router.post('/',createJobApply)

router.get('/:id',getJobApply)

router.put('/:id', updateJobApply)

router.delete('/:id', deleteJobApply)

module.exports = router