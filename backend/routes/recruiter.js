import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import Recruiter from "../models/recruiter.model.js";
import Interview from "../models/interview.model.js";
import Report from "../models/report.model.js";
import recruiterAuth from "../middleware/recruiterAuth.js";
const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({error: "All fields are required"});

        const hashpassword = await bcrypt.hash(password, 10);        
        const recruiter = new Recruiter({name, email, password: hashpassword});
        await recruiter.save();

        const token = jwt.sign({id: recruiter._id}, process.env.SECRET_KEY);        
        res.status(201).json({token});
    }catch(error){
        res.status(500).json({error: error.message});    
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({error: "All fields are required"});

        const recruiter = await Recruiter.findOne({email});
        if(!recruiter) return res.status(400).json({error: "Recruiter not found"});
        const isMatch = await bcrypt.compare(password, recruiter.password);
        if(!isMatch) return res.status(400).json({error: "Invalid credentials"});

        const token = jwt.sign({id: recruiter._id}, process.env.SECRET_KEY);
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.post('/makeInterview', recruiterAuth, async (req, res) => {
    try{
        const {job_role, job_description, job_experience, deadline, openings} = req.body;
        if(!job_role || !job_description || !job_experience || !deadline || !openings) return res.status(400).json({error: "All fields are required"});

        const newInterview = new Interview({recruiter: req.userId, job_role, job_description, job_experience, deadline, openings });
        await newInterview.save();

        res.status(201).json({message: "Interview created successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/:interviewId/candidates', recruiterAuth, async (req, res) => {
    try{
        const {interviewId} = req.params;
        const interview = await Interview.findById(interviewId);
        if(!interview) return res.status(404).json({error: "Interview not found"});

        if(interview.recruiter != req.userId) return res.status(400).json({error: "Unauthorized access"});

        const reports = await Report.find({interview_id: interviewId , appeared: true});

        res.status(200).json(reports);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/:interviewId&:candidateId/performance', recruiterAuth , async (req, res) => {
    try{
        const {interviewId , candidateId} = req.params;
        const interview = await Interview.findById(interviewId)
        if(!interview) return res.status(404).json({error: "Interview not found"});

        if(interview.recruiter != req.userId) return res.status(400).json({error: "Unauthorized access"});

        const report = await Report.findOne({interview_id: interviewId , candidate_id: candidateId});
        if(!report) return res.status(400).json({error: "Candidate not registered for this interview"});

        res.status(200).json(report);
    }
    catch(error){
        res.status(500).json({'message':"Could not get performabce"})
    }
})


export default router