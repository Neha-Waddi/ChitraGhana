import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [song, setSong] = useState("");

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const res = await axios.post('http://localhost:5000/emotion', { image: imageSrc });
    setEmotion(res.data.emotion);
    playSong(res.data.emotion);
  };

  const playSong = (emotion) => {
    const playlist = {
      happy: "happy_song.mp3",
      sad: "sad_song.mp3",
      angry: "angry_song.mp3",
      neutral: "calm_song.mp3"
    };
    setSong(playlist[emotion] || "default.mp3");
    console.log(playlist[emotion])
  };

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Detect Mood</button>
      {emotion && <h3>Detected Emotion: {emotion}</h3>}
      {song && <audio src={`/songs/${song}`} autoPlay controls />}

    </div>
  );
};

export default WebcamCapture;
