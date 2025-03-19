import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
    job_role: { type: String, required: true },
    job_description: { type: String, required: true },
    job_experience: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    deadline:{type: Date, required: true, default: () => Date.now() + 10 * 24 * 60 * 60 * 1000 },
    openings:{type: Number , default:1},
    type:{type: String, required: true, enum: ['mock', 'actual'] , default: 'actual'},
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview
