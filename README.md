# 🎵 Chitraghana - Emotion-Based Music Recommender 🎭

Chitraghana is a facial expression-based music recommendation web app that detects the user's emotion in real-time using their webcam and plays an appropriate locally stored song. The emotion detection is powered by a trained CNN model on the FER2013 dataset.

## 📸 Features

- Real-time webcam capture using React and `react-webcam`.
- Emotion detection with a TensorFlow model trained on FER dataset.
- Flask backend for model inference.
- Emotion-to-song mapping based on local MP3 files.
- Auto-play emotion-based songs via HTML5 audio.
---

## 🧠 What I Learned:

-Implementing computer vision (OpenCV) and deep learning models in real-world apps
-Building and connecting REST APIs between a Flask backend and a React frontend
-Processing webcam image data in base64 format
-Designing clean, responsive UIs using Tailwind CSS
-Handling state and user interaction in React


## 🚀 Live Demo

You can check it out at-https://chitra-ghana.vercel.app/
or 
deploy locally

---

## 🧠 Emotion Detection Model

- 📊 **Dataset**: [FER2013](https://www.kaggle.com/datasets/msambare/fer2013)
- 🧠 **Architecture**: CNN with Conv2D, MaxPooling, and Dense layers
- 🎯 **Output Classes**:
  - Angry
  - Disgust
  - Fear
  - Happy
  - Sad
  - Surprise
  - Neutral


Model is stored in `backend/model/emotion_model.h5`.

---
## 📦 Dependencies
**Frontend**:

React.js

Axios

react-webcam

**Backend**:

Flask

Flask-CORS

TensorFlow

NumPy

OpenCV

## Authors

[Neha Waddi](https://www.linkedin.com/in/neha-waddi-a4280625b/)

[Kusuma Pothuraju](https://www.linkedin.com/in/kusuma-akshya-pothuraju-a81a58268/)


