import mongoose from "mongoose"

const recruiterSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    created_at: { type: Date, default: Date.now }
})

const Recruiter = mongoose.model('Recruiter', recruiterSchema)

export default Recruiter