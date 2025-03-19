import express from 'express';
import Report from '../models/report.model.js';
import candidateAuth from '../middleware/candidateAuth.js';
import Interview from '../models/interview.model.js';
import { generateNextQuestion ,generateSummaryandScore } from '../services/questionService.js';


const interviewQ = [
  "Introduce yourself and tell us something unique about you.",
  "Can you tell us about some of your professional experiences?",
  "Have you ever lead a team",
  "What is XG BOOST and wxplain more about it",
  "What is Redis and tell me some of teh best features of it",
]

const router = express.Router();

// Start interview and get the first question
router.get('/:id/start', candidateAuth , async (req, res) => {
  // this is the id of report ok , 
  const { id } = req.params;
  try {
    const report = await Report.findById(id).populate('candidate_id');
    if (!report) return res.status(404).json({ error: 'Interview not found' });

    const interviewset = [
        "Introduce yourself and tell us something unique about you.",
        "Can you walk us through your professional background?",
        "What led you to pursue a career in this field?",
        "What attracted you to this role and our company?",
        "How would you describe yourself in a few sentences?",
        "What motivates you to perform your best in a professional setting?",
        "What are the key skills and experiences you bring to this position?",
        "Why do you want to take on this role at this stage of your career?",
        "What accomplishments are you most proud of in your career so far?",
        "Can you tell us a little bit about your educational background and how it relates to this role?"
      ];

    const firstQuestion = interviewset[Math.floor(Math.random() * interviewset.length)];

    res.json({ question: firstQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Process answer and generate the next question
router.post('/:id/answer', candidateAuth , async (req, res) => {
  try {
    const { id } = req.params; // yehi hai sessionid remember
    const { answer, question } = req.body;
    const report = await Report.findById(id).populate('candidate_id').populate('interview_id');
    if (!report) return res.status(404).json({ error: 'Interview not found' });
    console.log(id)
  
    const jobRole = report.interview_id.job_role;
    const jobDescription = report.interview_id.job_description;
    // console.log("hi")

    // Generate follow-up question based on the current answer and previous Q&A
    const nextQuestion = await generateNextQuestion(id, jobRole, jobDescription);
    console.log("hi")

    report.questions_answers.push({
      question_number: report.questions_answers.length + 1,
      question_text: question, 
      answer_text: answer,
      confidence_score: Math.random().toFixed(2),
      stress_score: Math.random().toFixed(2),
      cheating_flag: false,
    });

    await report.save();

    // Respond with the next question
    res.json({ nextQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/summary', async (req, res) => {
    const { id } = req.params;


    try {
        // Fetch the interview details
       const report = await Report.findById(id).populate('candidate_id').populate('interview_id');
        if(!report) return res.status(404).json({ error: 'Interview not found' });

        const jobRole = report.interview_id.job_role;
        const jobDescription = report.interview_id.job_description;


        const {summary , score} = await generateSummaryandScore(id, jobRole, jobDescription);
        report.summary = summary;
        report.final_score = score;
        await report.save();
        res.json({ summary, score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
  try{
    const interviews = await Interview.find({type: 'actual'});
    res.status(200).json(interviews);
  }catch(error){
    res.status(500).json({error: error.message});
  }
})

  
export default router;
