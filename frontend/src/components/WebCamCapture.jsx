import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/detect-emotion", { image: imageSrc });
      setEmotion(response.data.emotion);
    } catch (error) {
      console.error("Error detecting emotion:", error);
      setEmotion("Error detecting emotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={capture} disabled={loading}>
        {loading ? "Detecting..." : "Detect Mood"}
      </button>
      {emotion && <p>Detected Emotion: {emotion}</p>}
    </div>
  );
};

export default WebcamCapture;
