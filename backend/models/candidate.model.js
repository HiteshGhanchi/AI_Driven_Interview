import mongoose from "mongoose"

const candidateSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    skills:{type:[String], required: true},
    experience:{type: Number, required: true},
    created_at: { type: Date, default: Date.now }
})

const Candidate = mongoose.model('Candidate', candidateSchema)

export default Candidate