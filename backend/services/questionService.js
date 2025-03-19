import axios from 'axios';
import Report from '../models/report.model.js';

// Hugging Face Inference API endpoint for Mistral 7B or Zephyr 7B
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"; // Replace with the model endpoint
const HF_API_KEY = process.env.HF_API_KEY; // Add your Hugging Face API key to environment variables

async function getRelevantPastQnA(id) {
  const report = await Report.findOne({ _id: id });

  if (report) {
    return report.questions_answers;
  }
  throw new Error('Report not found');
}

async function generateNextQuestion(id, jobRole, jobDescription) {
  try {
    const relevantQnA = await getRelevantPastQnA(id);

    const historyContext = relevantQnA.map(qa =>
      `Question: ${qa.question_text}\nAnswer: ${qa.answer_text}\n`
    ).join("\n");

    const response = await axios.post(
      HF_API_URL,
      {
        inputs: `You are conducting an interview for the role of ${jobRole}. 
    The goal of this interview is to assess not only the theoretical knowledge of the candidate but also their practical experience, project work, and problem-solving abilities.
    
    Here is the job description: ${jobDescription}.
    
    Below are the previous questions and answers from the candidate:
    ${historyContext}
    
    Based on the information provided and the context of the job, ask a follow-up question that dives deeper into the candidate's experience with hands-on projects, real-world scenarios, or practical problem-solving. Focus on areas where they demonstrated innovation, overcame challenges, or applied relevant skills to achieve results. Avoid general or purely theoretical questions—prioritize questions that can gauge their real-world experience, decision-making process, and ability to handle situations similar to those required for this role.
    
    Generate only the next question for the candidate, without any additional text or context.`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7
        }
      },
      {
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    const rawResponse = response.data[0].generated_text.trim();

    // Extract only the question by splitting on the delimiter
    const delimiter = "Generate only the next question for the candidate, without any additional text or context.";
    const question = rawResponse.split(delimiter).pop().trim();

    console.log(question); // This will log only the question
    const perfect = question.substring(9, question.length - 1);
    return perfect;
  } catch (error) {
    console.error("Error generating next question:", error);
    throw error;
  }
}

async function generateSummaryandScore(sessionId, jobRole, jobDescription) {
  try {
    const relevantQnA = await getRelevantPastQnA(sessionId);

    const historyContext = relevantQnA.map(qa =>
      `Question: ${qa.question_text}\nAnswer: ${qa.answer_text}\n`
    ).join("\n");

    // Generate summary
    const summaryResponse = await axios.post(
      HF_API_URL,
      {
        inputs: `You are an interview evaluator for the role of ${jobRole}. 
        Here is the job description: ${jobDescription}.
        Below are the questions and answers from the candidate:
        ${historyContext}
        
        Based on this, generate a detailed summary of the candidate's performance. 
        Please include an evaluation of their strengths, weaknesses, practical experience, areas for improvement, and a recommendation on how they can improve further.
        
        Generate only the summary, without any additional text or context.`, // Explicit instruction
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7
        }
      },
      {
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Extract only the summary
    const rawSummaryResponse = summaryResponse.data[0].generated_text.trim();

    // Extract only the summary by splitting on the delimiter
    const delimiter = "Generate only the summary, without any additional text or context.";
    const summary = rawSummaryResponse.split(delimiter).pop().trim();
    // console.log(summary);
    

    // Generate score
    const scoreResponse = await axios.post(
      HF_API_URL,
      {
        inputs: `You are an interview evaluator for the role of ${jobRole}. 
        Here is the job description: ${jobDescription}.
        Below is the summary of the candidate's performance:
        ${summary}
        
        Based on this, provide an overall score out of 100 for the candidate's performance.
        Give score as only one number, no other text.`, // Explicit instruction
        parameters: {
          max_new_tokens: 50,
          temperature: 0.3
        }
      },
      {
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // console.log(scoreResponse.data[0].generated_text.trim());

    // Extract only the score (a number between 0 and 100)
    const scoreText = scoreResponse.data[0].generated_text.trim();
    const delimiter1 = "Give score as only one number, no other text.";
    const score = scoreText.split(delimiter1).pop().trim();

    return { summary, score };
  } catch (error) {
    console.error("Error generating summary and score:", error);
    throw error;
  }
}

export { generateNextQuestion, generateSummaryandScore };