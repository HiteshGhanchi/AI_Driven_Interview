import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Candidate from "../models/candidate.model.js";
import candidateAuth from "../middleware/candidateAuth.js";
import Interview from "../models/interview.model.js";
import Report from "../models/report.model.js";
const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const {name, email, password , skills, experience} = req.body;
        if(!name || !email || !password || !skills || !experience) return res.status(400).json({error: "All fields are required"});

        const hashpassword = await bcrypt.hash(password, 10);
        const candidate = new Candidate({name, email, password: hashpassword, skills, experience});
        await candidate.save();

        const token = jwt.sign({id: candidate._id}, process.env.SECRET_KEY);

        res.status(201).json({token});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({error: "All fields are required"});

        const candidate = await Candidate.findOne({email});
        if(!candidate) return res.status(400).json({error: "Candidate not found"});
        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch) return res.status(400).json({error: "Invalid credentials"});

        const token = jwt.sign({id: candidate._id}, process.env.SECRET_KEY);
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/:interviewId/register', candidateAuth , async (req, res) => {
    try{
        const {interviewId} = req.params;
        console.log(interviewId)
        const interview = await Interview.findById(interviewId)
        if(!interview) return res.status(404).json({error: "Interview not found"});

        if(interview.deadline < Date.now()) return res.status(400).json({error: "Interview is already over"});

        if(interview.type == 'mock' && interview.recruiter != req.userId) return res.status(400).json({error: "Not your mock interview idiot"});

        const report = await Report.findOne({interview_id: interviewId , candidate_id: req.userId});
        if(report) return res.status(400).json({error: "Candidate already registered for this interview"});



        const newReport = new Report({interview_id: interviewId, candidate_id: req.userId});
        await newReport.save();

        res.status(201).json({message: "Candidate registered successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/:sessionId/performance', candidateAuth , async (req, res) => {
    try{
        const {sessionId} = req.params;
        const report = await Report.findOne({_id:sessionId})
        if(!report) return res.status(404).json({error: "Report not found"});

        res.status(200).json(report);
    }
    catch(error){
        res.status(500).json({'message':"Could not get performabce"})
    }
})

router.post('/makeInterview',candidateAuth,async(req,res) =>{
    try{
        const {job_role, job_description, job_experience, deadline, openings} = req.body;
        if(!job_role || !job_description || !job_experience) return res.status(400).json({error: "All fields are required"});

        const newInterview = new Interview({recruiter: req.userId, job_role, job_description, job_experience, deadline, openings , type: 'mock'});
        await newInterview.save();

        res.status(201).json({message: "Interview created successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

// this sessionid is basically our main session id ok remember it // it is report ka id

router.get('/:interviewId/getSessionId' , candidateAuth , async (req, res) => {
    try{
        const {interviewId} = req.params;
        const interview = await Interview.findById(interviewId)
        if(!interview) return res.status(404).json({error: "Interview not found"});

        const report = await Report.findOne({interview_id: interviewId , candidate_id: req.userId});
        if(!report) return res.status(400).json({error: "Candidate not registered for this interview"});

        res.status(200).json({session_id : report._id});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})



export default router;
