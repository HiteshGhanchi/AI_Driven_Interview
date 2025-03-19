from flask import Flask, request, jsonify
import cv2
import librosa
import numpy as np
import os
import threading
import tempfile
import traceback
import uuid
import requests
from deepface import DeepFace
import mediapipe as mp
from transformers import pipeline
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1)

app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024  # 500MB limit
app.config['UPLOAD_FOLDER'] = tempfile.gettempdir()

# Load AI Models
sentiment_analyzer = pipeline("sentiment-analysis")
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

processing_results = {}

# Function to extract frames from video
def extract_frames(video_path, frame_skip=5):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception("Could not open video file.")
    frames, timestamps = [], []
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    for frame_num in range(0, total_frames, frame_skip):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
        timestamps.append(frame_num / fps)
    cap.release()
    return frames, timestamps

# Function to extract audio features
def extract_audio_features(video_path):
    try:
        y, sr = librosa.load(video_path, sr=16000, mono=True, duration=10)
        features = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13).T, axis=0)
        return features
    except:
        return None

# Function to analyze sentiment
def analyze_sentiment(audio_features):
    if audio_features is None:
        return "Error processing audio"
    return sentiment_analyzer("Audio analysis result")

# Function to analyze facial expressions
def analyze_facial_expressions(frames, timestamps):
    emotions, confidence_scores, stress_levels, significant_changes = [], [], [], []
    
    for i, frame in enumerate(frames):
        analysis = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        if analysis:
            dominant_emotion = analysis[0]['dominant_emotion']
            confidence = analysis[0]['emotion'].get("happy", 0) / 100
            stress = (analysis[0]['emotion'].get("angry", 0) + analysis[0]['emotion'].get("fear", 0)) / 100
            emotions.append(dominant_emotion)
            confidence_scores.append(confidence)
            stress_levels.append(stress)
            if confidence > 0.7 or confidence < 0.3:
                significant_changes.append((timestamps[i], "Confidence spike"))
            if stress > 0.6:
                significant_changes.append((timestamps[i], "Stress spike"))
    
    return emotions, confidence_scores, stress_levels, significant_changes

# Video processing function
def process_video(video_path, task_id):
    try:
        frames, timestamps = extract_frames(video_path)
        audio_features = extract_audio_features(video_path)
        emotions, confidence_scores, stress_levels, emotion_changes = analyze_facial_expressions(frames, timestamps)
        sentiment = analyze_sentiment(audio_features)
        os.remove(video_path)  # Clean up after processing
        processing_results[task_id] = {
            "facial_expressions": emotions,
            "confidence_scores": [round(score, 3) for score in confidence_scores],
            "stress_levels": [round(level, 3) for level in stress_levels],
            "speech_sentiment": sentiment,
            "significant_changes": emotion_changes,
            "aggregate_confidence_level": round(sum(confidence_scores) / len(confidence_scores), 3) if confidence_scores else None,
            "aggregate_stress_level": round(sum(stress_levels) / len(stress_levels), 3) if stress_levels else None
        }
    except Exception as e:
        traceback.print_exc()
        processing_results[task_id] = {"error": str(e)}

# Endpoint to analyze video (supports both file uploads and Cloudinary links)
@app.route("/analyze", methods=["POST"])
def analyze():
    temp_video_path = None
    
    if "video" in request.files:  # Handle direct file upload
        video = request.files["video"]
        temp_video_path = os.path.join(app.config['UPLOAD_FOLDER'], video.filename)
        video.save(temp_video_path)
    
    elif "video_url" in request.json:  # Handle Cloudinary URL
        video_url = request.json["video_url"]
        temp_video_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4()}.mp4")
        
        try:
            response = requests.get(video_url, stream=True)
            if response.status_code != 200:
                return jsonify({"error": "Failed to download video"}), 400
            
            with open(temp_video_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    else:
        return jsonify({"error": "No video file or URL provided"}), 400

    # Start processing the video
    task_id = str(uuid.uuid4())
    processing_results[task_id] = {"status": "processing"}
    threading.Thread(target=process_video, args=(temp_video_path, task_id)).start()
    
    return jsonify({"task_id": task_id})

# Endpoint to check results
@app.route("/results/<task_id>", methods=["GET"])
def get_results(task_id):
    if task_id not in processing_results:
        return jsonify({"error": "Invalid Task ID"}), 404
    return jsonify(processing_results[task_id])

# Run the Flask app
if _name_ == "_main_":
    app.run(host="0.0.0.0", port=5001, debug=True, threaded=True)