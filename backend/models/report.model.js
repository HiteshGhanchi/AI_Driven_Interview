import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  interview_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  appeared:{type: Boolean, required: true , default: false},
  questions_answers: [
    {
      question_number: Number,
      question_text: String,
      answer_text: String,
      confidence_score: Number,
      stress_score: Number,
      cheating_flag: Boolean,
      created_at: { type: Date, default: Date.now }
    }
  ],
  final_score: {type:Number , default: 0},
  summary: {type:String , default: ""},
  created_at: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);
export default Report