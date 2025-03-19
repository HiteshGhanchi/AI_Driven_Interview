'use client';

// CandidateAnalytics.jsx
import { useState , useEffect} from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const CandidateAnalytics = () => {
  
  const [candidateData, setCandidateData] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [sessionId] = useState(useParams().id)


  // Questions and answers data
  useEffect(() => {
    const fetchData = async () => {
  
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/candidate/${sessionId}/performance`,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = response.data;

        // Assuming the API response structure matches your state
        setCandidateData({
          id: data.candidate_id,
          score: data.final_score,
          summary: data.summary,
        });

        setQuestionsAndAnswers(data.questions_answers);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, [sessionId]);

  if (!candidateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full mx-auto bg-gray-50">
      <header className="w-full bg-purple-600 text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Candidate Analytics</h1>
          <div className="text-lg">Candidate ID: {candidateData.id}</div>
        </div>
      </header>
      
      <div className="p-6 container mx-auto">
        <div className="bg-purple-100 rounded-lg p-6 mb-8 text-center shadow-md">
          <h2 className="text-purple-600 text-xl font-semibold mb-2">Overall Score</h2>
          <div className="text-5xl font-bold text-purple-600">{candidateData.score}/100</div>
    
        </div>
        
        <div className="mb-8">
          <h2 className="text-purple-600 text-xl font-semibold mb-4">Questions & Answers</h2>
          
          {questionsAndAnswers.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div className="font-bold text-purple-600 mb-2">
                Q{index + 1}: {item.question_text}
              </div>
              <div className="ml-4 text-gray-700">
                {item.answer_text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-purple-600 text-xl font-semibold mb-2">Candidate Summary</h2>
          <p className="text-gray-700">{candidateData.summary}</p>
        </div>
        
        <div className="text-center font-bold text-xl py-4 text-purple-600 border-t-2 border-purple-100">
          Final Assessment: {candidateData.score}/100
        </div>
      </div>
    </div>
  );
};

export default CandidateAnalytics;
