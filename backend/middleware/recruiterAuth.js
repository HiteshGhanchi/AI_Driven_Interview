import jwt from "jsonwebtoken";
import Recruiter from "../models/recruiter.model.js";

export const recruiterAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const recruiter = await Recruiter.findById(decoded.id);
        if (!recruiter) {
            return res.status(401).json({ error: "Recruiter not found" });
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(500).json({ error: "Unauthorized" });
    }
};

export default recruiterAuth