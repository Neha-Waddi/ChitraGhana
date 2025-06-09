import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [song, setSong] = useState("");
  const [error, setError] = useState("");

  const capture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const res = await axios.post("http://localhost:5000/detect", { image: imageSrc });

      const detectedEmotion = res.data.emotion;
      setEmotion(detectedEmotion);
      playSong(detectedEmotion);
      setError("");
    } catch (err) {
      console.error("Error detecting emotion:", err);
      setError("Failed to connect to the backend. Is Flask running?");
    }
  };

  const playSong = (emotion) => {
  const playlist = {
    happy: ["song1.mp3", "song2.mp3", "song3.mp3"],
    sad: ["song1.mp3", "song2.mp3", "song3.mp3"],
    angry: ["song1.mp3", "song2.mp3", "song3.mp3"],
    surprise: ["song1.mp3", "song2.mp3", "song3.mp3"],
    fear: ["song1.mp3", "song2.mp3", "song3.mp3"],
    neutral: ["song1.mp3", "song2.mp3", "song3.mp3"],
    disgust:["song1.mp3", "song2.mp3", "song3.mp3"]
  };

  const songsForEmotion = playlist[emotion] || ["default.mp3"];
  const randomSong = songsForEmotion[Math.floor(Math.random() * songsForEmotion.length)];

  setSong(`/songs/${emotion}/${randomSong}`);
};


  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <br />
      <button onClick={capture}>Detect Mood</button>

      {emotion && <h3>🎭 Detected Emotion: {emotion}</h3>}

      {song && <audio src={song} autoPlay controls />}


      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WebcamCapture;
