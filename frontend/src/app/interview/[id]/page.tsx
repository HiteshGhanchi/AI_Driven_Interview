"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

// Cloudinary Config
const CLOUDINARY_NAME = "dre7k8dlv";
const CLOUDINARY_UPLOAD_PRESET = "webCamVids";

const Interview = () => {
  const router = useRouter();
  const params = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

 



  
  // Fetch the first question when sessionId is available
  useEffect(() => {
    if (sessionId) {
      fetchFirstQuestion();
    }
  }, [sessionId]);

  // This effect handles the interview completion
  useEffect(() => {
    if (isInterviewComplete) {
      endInterview();
    }
  }, [isInterviewComplete]);


  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
  
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
  
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
  
        setTranscript(prev => finalTranscript + interimTranscript);
      };
  
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
  
      recognition.onend = () => {
        setIsListening(false);
      };
  
      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Fetch session ID when component mounts
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const id = params.id;
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:8000/candidate/${id}/getSessionId`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200 || !response.data.session_id) {
          throw new Error("Failed to fetch session_id");
        }

        setSessionId(response.data.session_id);
        localStorage.setItem("session_id", response.data.session_id);
        console.log("Session ID stored:", response.data.session_id);
      } catch (error) {
        console.error("Error fetching session_id:", error);
        alert("Failed to start the interview. Please try again.");
        router.push("/");
      }
    };

    fetchSessionId();
  }, [params, router]);

  // Start interview when session ID is available
  useEffect(() => {
    if (sessionId) {
      fetchFirstQuestion();
    }
  }, [sessionId]);

  // End interview when complete
  useEffect(() => {
    if (isInterviewComplete) {
      endInterview();
    }
  }, [isInterviewComplete]);

  // Speech recognition functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript(""); // Clear previous transcript
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };


  // Fetch the first question from the backend
  const fetchFirstQuestion = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/interview/${sessionId}/start`,
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.status !== 200 || !response.data.question) {
        throw new Error("Failed to fetch first question");
      }

      setQuestion(response.data.question);
      setLoading(false);
      startCountdown();
    } catch (error) {
      console.error("Error fetching first question:", error);
      setLoading(false);
    }
  };

  // Fetch the next question after submitting an answer
  const fetchNextQuestion = async (question, answer, videoUrl) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Prepare data payload for the answer submission
      const data = { 
        question: question, 
        answer: answer,
        video_url: videoUrl
      };

      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/interview/${sessionId}/answer`,
        data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.status !== 200) {
        throw new Error("Failed to submit answer and get next question");
      }

      // Increment question index ONLY after successful API response
      const newQuestionIndex = questionIndex + 1;
      setQuestionIndex(newQuestionIndex);
      console.log("Updated question index to:", newQuestionIndex);

      if(newQuestionIndex === 8) {
        setIsInterviewComplete(true);
      }
      console.log(response)
      const nextQuestion = response.data.nextQuestion;
      setQuestion(nextQuestion);
      startCountdown();
      setLoading(false);

      
    } catch (error) {
      console.error("Error submitting answer and getting next question:", error);
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    try {
      // Stop previous stream if exists
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
  
      // Clear the transcript for the new question
      setTranscript("");
  
      // Use more flexible constraints that work across browsers
      const constraints = {
        video: true,  // Request default video without specific constraints
        audio: true   // Request default audio without specific constraints
      };
  
      console.log("Requesting media access with basic constraints...");
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
  
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }
  
      // Reset recorded chunks
      recordedChunks.current = [];
  
      // Check for supported MIME types
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4'
      ];
  
      let options = {};
      // Find the first supported MIME type
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          options = { mimeType: type };
          console.log(`Using supported MIME type: ${type}`);
          break;
        }
      }
  
      // Create MediaRecorder with the best available options
      mediaRecorderRef.current = new MediaRecorder(stream, options);
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };
  
      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      startListening();
      console.log("Successfully started recording for question:", questionIndex);
    } catch (error) {
      console.error("Error details:", error.name, error.message);
  
      // Handle specific permission errors
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        alert("Camera/microphone access denied. Please check your browser permissions and allow access when prompted.");
      }
      // Handle device constraints errors
      else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        console.log("Falling back to basic constraints due to device limitations...");
        try {
          // Fall back to very basic constraints
          const basicStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: true
          });
  
          streamRef.current = basicStream;
          if (videoRef.current) {
            videoRef.current.srcObject = basicStream;
            videoRef.current.muted = true;
          }
  
          mediaRecorderRef.current = new MediaRecorder(basicStream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.current.push(event.data);
            }
          };
  
          mediaRecorderRef.current.start();
          setIsRecording(true);
          console.log("Started recording with fallback constraints");
        } catch (fallbackError) {
          console.error("Even fallback recording failed:", fallbackError);
          alert("Unable to access camera/microphone. Please make sure your device has a working camera and microphone.");
        }
      }
      // Handle other errors
      else {
        alert(`Recording error: ${error.message}. Please check that your camera and microphone are connected and working properly.`);
      }
    }
  };
  
  const stopRecording = async () => {
    console.log("Manual stop recording requested");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      setIsProcessing(true);
      stopListening();
  
      // Save current question before it changes
      const currentQuestion = question;
      const currentQuestionIndex = questionIndex;
  
      mediaRecorderRef.current.stop();
  
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
  
      // Handle the recorded data when stopped
      mediaRecorderRef.current.onstop = async () => {
        console.log("Recording stopped for question:", currentQuestionIndex);
        setIsRecording(false);
  
        try {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
  
          // Use the actual transcript
          const actualTranscript = transcript;
  
          // Start upload process
          console.log(`Starting upload process for question ${currentQuestionIndex + 1}`);
  
          // Upload with better progress tracking
          const videoUrl = await uploadToCloudinary(blob, currentQuestionIndex);
  
          if (videoUrl) {
            setUploadedVideoUrl(videoUrl);
            await fetchNextQuestion(currentQuestion, actualTranscript, videoUrl);
          } else {
            throw new Error("Failed to upload video");
          }
        } catch (error) {
          console.error("Error in upload process:", error);
          alert("There was an issue with the video upload. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      };
    }
  };

  const uploadToCloudinary = async (blob: Blob, currentQuestionIndex: number) => {
    try {
      console.log(`Preparing video for question ${currentQuestionIndex + 1}...`);
      
      // Instead of aggressive compression, use moderate optimization
      const optimizedBlob = await optimizeVideoForAI(blob);
      console.log(`Original size: ${(blob.size / 1024 / 1024).toFixed(2)}MB, Optimized: ${(optimizedBlob.size / 1024 / 1024).toFixed(2)}MB`);
      
      const videoNumber = currentQuestionIndex + 1;
      const timestamp = Date.now();
      const publicId = `${sessionId}_video${videoNumber}_${timestamp}`;
  
      const formData = new FormData();
      formData.append("file", optimizedBlob);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("public_id", publicId);
      
      // Use efficient chunked upload to improve speed
      const chunkSize = 5 * 1024 * 1024; // 5MB chunks
      formData.append("chunk_size", chunkSize.toString());
      
      console.log(`Uploading optimized video ${videoNumber} to Cloudinary...`);
      
      // Show progress indicator during upload
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/video/upload`);
      
      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          console.log(`Upload progress: ${percentComplete}%`);
          // You could update a progress UI element here
        }
      };
      
      // Create a promise to handle the XHR request
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            reject(new Error(`HTTP error ${xhr.status}`));
          }
        };
        xhr.onerror = function() {
          reject(new Error("Network error"));
        };
      });
      
      // Send the request
      xhr.send(formData);
      
      // Wait for upload to complete
      const data = await uploadPromise;
      console.log(`Cloudinary Upload Success for question ${videoNumber}:`, data);
  
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Failed to upload video - no secure URL returned");
      }
    } catch (error) {
      console.error(`Error uploading video ${currentQuestionIndex + 1}:`, error);
      return null;
    }
  };
  
  // Optimize video for AI analysis while reducing size
  const optimizeVideoForAI = async (inputBlob: Blob): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        // For videos that are too large, use moderate compression
        if (inputBlob.size > 50 * 1024 * 1024) { // If larger than 50MB
          // Create video element to process the blob
          const videoElement = document.createElement('video');
          videoElement.autoplay = false;
          videoElement.muted = true;
          
          const blobUrl = URL.createObjectURL(inputBlob);
          videoElement.src = blobUrl;
          
          // Wait for metadata to load
          await new Promise(resolve => {
            videoElement.onloadedmetadata = resolve;
          });
          
          // Maintain higher resolution for AI analysis
          // Original resolution but capped at 1080p
          const videoWidth = videoElement.videoWidth;
          const videoHeight = videoElement.videoHeight;
          
          const targetWidth = Math.min(videoWidth, 1920);
          const targetHeight = Math.round((targetWidth / videoWidth) * videoHeight);
          
          // Play the video
          await videoElement.play();
          
          // Set up canvas
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error('Could not get canvas context');
          }
          
          // Set up MediaRecorder with AI-friendly settings
          const stream = canvas.captureStream(30); // 30 FPS
          const options = {
            mimeType: 'video/webm;codecs=vp9', // Better quality codec
            videoBitsPerSecond: 2500000 // 2.5 Mbps - good for facial analysis
          };
          
          const mediaRecorder = new MediaRecorder(stream, options);
          const chunks: Blob[] = [];
          
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };
          
          mediaRecorder.onstop = () => {
            const optimizedBlob = new Blob(chunks, { type: 'video/webm' });
            URL.revokeObjectURL(blobUrl);
            resolve(optimizedBlob);
          };
          
          // Start recording
          mediaRecorder.start();
          
          // Keep full duration for AI analysis, but add a safety cap
          const maxDuration = Math.min(videoElement.duration, 120); // Max 2 minutes
          
          // Process frames
          let startTime = performance.now();
          
          const processFrame = async () => {
            const elapsed = (performance.now() - startTime) / 1000;
            
            if (elapsed < maxDuration) {
              // Draw the current frame at high quality
              ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);
              requestAnimationFrame(processFrame);
            } else {
              // Done processing
              mediaRecorder.stop();
              videoElement.pause();
            }
          };
          
          // Start processing frames
          processFrame();
        } else {
          // If video is already reasonably sized, use it as is for best AI analysis
          resolve(inputBlob);
        }
      } catch (error) {
        console.error('Video optimization error:', error);
        // If optimization fails, return original to ensure AI has data to work with
        resolve(inputBlob);
      }
    });
  };
  

  const endInterview = () => {
    // Stop any active recording before navigation
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    // Stop all media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    console.log("Interview completed, navigating to analysis page");
    // Wait a moment to ensure everything is processed
    setTimeout(() => {
      router.push(`/analytics/${sessionId}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white min-h-screen text-black">
      {/* Video Recording Section */}
      <div className="md:w-2/3 flex flex-col items-center">
        <div className="relative w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-[600px] rounded-lg border border-blue-500 shadow-lg object-cover"
          />
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-2 animate-pulse"></div>
              <span>Recording</span>
            </div>
          )}
          {isProcessing && (
            <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
              <span>Processing</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4 items-center">
          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-5 py-2 rounded-lg font-bold text-lg bg-red-600 hover:bg-red-700 text-white"
            >
              ⏹ Stop Recording
            </button>
          )}
          <div className="text-sm text-gray-600">
            {isProcessing ? "Processing video, please wait..." : ""}
          </div>
        </div>
      </div>

      {/* Question Panel */}
      <div className="md:w-1/3 bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col justify-center">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-blue-600">Progress:</h3>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{width: `${(questionIndex / 10) * 100}%`}}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {questionIndex} of 10 questions completed
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-semibold">Loading next question...</p>
          </div>
        ) : isInterviewComplete ? (
          <div className="text-center text-xl font-semibold">
            ✅ Interview Completed! Redirecting to analysis...
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-600">
              Question {questionIndex + 1} of 10:
            </h2>
            <p className="mt-2 text-lg text-gray-800">{question}</p>
            {countdown > 0 && (
              <p className="mt-2 text-red-500 font-bold text-lg">
                🎤 Recording starts in {countdown}s...
              </p>
            )}
            {/* Transcript Display Box */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-blue-600">Transcript:</h3>
              <div className="mt-2 p-4 bg-white rounded-lg shadow-inner text-gray-800 h-40 overflow-y-auto">
                {transcript || "Transcript will appear here..."}
              </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Interview;