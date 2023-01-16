const express = require("express");
const router = express.Router();
const JobPosting = require('../models/jobModel')
const mongoose = require("mongoose")

const app = express();
// const cors = require('cors');
app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017");
router.post('/job',   async (req, res) => {
    // Create a new job posting
    const job = new JobPosting(req.body);
    try {
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(400).send(error);
    // res.send("ha")
    }
});

router.get('/jobs', (req, res) => {
    const { skills, experience } = req.query;
    
    // Find all job postings that match the provided skills and experience level
    JobPosting.find({ skills: { $in: skills }, experience: { $lte: experience } })
      .then(jobs => res.json(jobs))
      .catch(err => res.status(400).json('Error: ' + err));
 });

// router.get('/jobs', async (req, res) => {
//     // Get a list of all current job postings
//     const jobs = await JobPosting.find();
//     res.send(jobs);
// });

// app.get('/job/:id', async (req, res) => {
//     // Get the details of a specific job posting
//     const job = await JobPosting.findById(req.params.id);
//     if (!job) {
//         res.status(404).send();
//     } else {
//         res.send(job);
//     }
// });

// app.post('/job/:id/apply', async (req, res) => {
//     // Apply for a job posting
//     const job = await JobPosting.findById(req.params.id);
//     if (!job) {
//         res.status(404).send();
//     } else {
//         const application = new Jobs.JobApplication({
//             // jobId: job._id,
//             name: req.body.name,
//             email: req.body.email,
//             // resume: req.body.resume,
//             cover: req.body.cover,
//         })
//     }
// })

module.exports = router;