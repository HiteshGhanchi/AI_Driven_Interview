import { useState, useRef } from "react";

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [questions] = useState([
    "Describe your experience working with React.js, highlighting specific projects and the challenges you faced.",
    "What are the key differences between Redux and Context API?",
    "How would you optimize a React application for performance?",
    "Explain the role of useEffect and useMemo in React.",
    "How do you handle authentication in a React application?"
  ]);

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-2/3 bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex gap-4 mb-4">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${questionIndex === index ? "bg-black text-white" : "bg-gray-200"}`}
              onClick={() => setQuestionIndex(index)}
            >
              Question #{index + 1}
            </button>
          ))}
        </div>
        <p className="text-lg font-semibold">Question #{questionIndex + 1}</p>
        <p className="mt-2">{questions[questionIndex]}</p>
        <div className="mt-4 bg-blue-100 p-3 rounded-lg">
          <p className="font-bold">Note:</p>
          <p className="text-sm">Enable video and microphone to start the mock interview. The webcam will stay on, and you can record your answers.</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col items-center">
        <video ref={videoRef} autoPlay className="w-full h-auto rounded-lg border border-black" />
        <div className="mt-4 flex gap-4">
          <button onClick={stopRecording} disabled={!isRecording} className="bg-black text-white px-4 py-2 rounded">
            Close WebCam
          </button>
          <button onClick={startRecording} disabled={isRecording} className="bg-white border px-4 py-2 rounded">
            Record Answer
          </button>
        </div>
      </div>
      <button onClick={handleNextQuestion} className="bg-black text-white px-4 py-2 rounded self-end">
        Next Question
      </button>
    </div>
  );
};

export default Interview;
