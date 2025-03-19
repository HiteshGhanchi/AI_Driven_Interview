import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./database.js";



const app = express();
const PORT = process.env.PORT

app.listen(PORT || 8000, () => {
    console.log(`Server is running on port ${PORT}`);
})

connectDb()
app.use(cors())
app.use(express.json())

// routes
import candidate from "./routes/candidate.js";
import interview from "./routes/interview.js";
import recruiter from "./routes/recruiter.js";

app.use("/recruiter", recruiter);
app.use("/candidate", candidate);
app.use("/interview", interview);


