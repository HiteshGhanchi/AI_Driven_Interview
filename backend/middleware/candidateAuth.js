import jwt from "jsonwebtoken";
import Candidate from "../models/candidate.model.js";

const candidateAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const candidate = await Candidate.findById(decoded.id);
        if(!candidate) return res.status(401).json({error: "Candidate not found"});
        req.userId = decoded.id;
        next();
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

export default candidateAuth