# 🎵 Chitraghana - Emotion-Based Music Recommender 🎭

Chitraghana is a facial expression-based music recommendation web app that detects the user's emotion in real-time using their webcam and plays an appropriate song. The emotion detection is powered by a CNN model trained on the FER2013 dataset, and the songs are selected based on your mood.

---

## Features

-  Real-time webcam capture using React and `react-webcam`
-  Emotion detection with a TensorFlow CNN model
-  Flask backend for inference with REST API support
-  Emotion-to-song mapping with local MP3 files
-  Auto-play songs based on detected mood
-  Beautiful, responsive UI built with Tailwind CSS
-  Next/Previous buttons to switch songs in the same emotion category
-  Suggestions listed below the main player

---

## What I Learned

- Implementing computer vision (OpenCV) and deep learning models in real-world apps
- Connecting React frontend with a Flask backend via REST API
-  Capturing and sending webcam frames as Base64 image data
-  Designing a robust CNN model for emotion classification
-  Crafting interactive and clean UI using Tailwind CSS
-  Managing audio playback and emotion-driven interactions in the browser

---

## Emotion Detection Model

- **Dataset**: [FER2013](https://www.kaggle.com/datasets/msambare/fer2013)
- **Model Architecture**: Custom CNN with Conv2D, MaxPooling, Dropout, and Dense layers
- **Classes Detected**:
  - Angry
  - Disgust
  - Fear
  - Happy
  - Sad
  - Surprise
  - Neutral
- **Model Path**: `backend/model/emotion_model.h5`

---

## Local Setup Guide (Frontend + Backend)

###  Prerequisites

- Python 3.9 or 3.10  
- Node.js (v16 or v18)  
- pip  

---

###  Backend Setup (Flask + TensorFlow)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
-Your Flask API will start on http://localhost:5000

-Ensure emotion_model.h5 is present in the model/ folder.

###  Frontend Setup (React + Webcam)

```bash
cd frontend
npm install
npm start
```
Your React app will run on http://localhost:3000.

### Key Dependencies
Frontend
- React
- Axios
- react-webcam
- Tailwind CSS
Backend
- Flask
- Flask-CORS
- TensorFlow 2.18
- OpenCV
- NumPy

## Authors

[Neha Waddi](https://www.linkedin.com/in/neha-waddi-a4280625b/)

[Kusuma Pothuraju](https://www.linkedin.com/in/kusuma-akshya-pothuraju-a81a58268/)
