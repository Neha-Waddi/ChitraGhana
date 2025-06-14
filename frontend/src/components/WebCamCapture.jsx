import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {  FaStepBackward, FaStepForward } from "react-icons/fa";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [song, setSong] = useState("");
  const [error, setError] = useState("");
  const [songIndex, setSongIndex] = useState(0);

  const playlist = {
    happy: ["song1.mp3", "song2.mp3", "song3.mp3"],
    sad: ["song1.mp3", "song2.mp3", "song3.mp3"],
    angry: ["song1.mp3", "song2.mp3", "song3.mp3"],
    surprise: ["song1.mp3", "song2.mp3", "song3.mp3"],
    fear: ["song1.mp3", "song2.mp3", "song3.mp3"],
    neutral: ["song1.mp3", "song2.mp3", "song3.mp3"],
    disgust: ["song1.mp3", "song2.mp3", "song3.mp3"],
  };

  const capture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const res = await axios.post("https://chitraghana.onrender.com/detect", { image: imageSrc });

      const detectedEmotion = res.data.emotion;
      setEmotion(detectedEmotion);
      playSong(detectedEmotion, 0);
      setError("");
    } catch (err) {
      console.error("Error detecting emotion:", err);
      setError("⚠️ Failed to connect");
    }
  };

  const playSong = (emotion, index = 0) => {
    const songsForEmotion = playlist[emotion] || ["default.mp3"];
    const validIndex = ((index % songsForEmotion.length) + songsForEmotion.length) % songsForEmotion.length;
    const selectedSong = songsForEmotion[validIndex];
    setSong(`/songs/${emotion}/${selectedSong}`);
    setSongIndex(validIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-pink-200 to-purple-500 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-8 border border-white border-opacity-30">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-3 tracking-wide drop-shadow-lg">🎧 ChitraGhana</h1>
        <p className="text-center text-gray-800 text-lg italic mb-6">“When Emotion Speaks, ChitraGhana Listens.”</p>

        <div className="flex justify-center mb-6 relative">
          <div className="rounded-xl border-4 border-pink-400 shadow-xl  p-2 w-76 h-72">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-xl w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={capture}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg"
          >
            🎭 Detect Mood
          </button>
        </div>

        {emotion && (
          <div className="text-center text-gray-800 text-2xl font-semibold mb-4">
            Detected Emotion: <span className="capitalize text-yellow-600">{emotion}</span>
          </div>
        )}

        {song && (
          <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-xl text-center text-gray-900 mb-4">
            <audio src={song} autoPlay controls className="w-full rounded-xl bg-white bg-opacity-30" />
            <div className="flex justify-center items-center gap-6 mt-2">
              <button onClick={() => playSong(emotion, songIndex - 1)}>
                <FaStepBackward size={28} className="hover:scale-125 transition-transform text-purple-600" />
              </button>
              <button onClick={() => playSong(emotion, songIndex + 1)}>
                <FaStepForward size={28} className="hover:scale-125 transition-transform text-purple-600" />
              </button>
            </div>
{emotion && playlist[emotion] && (
  <div className="mt-4 text-center">
    <h4 className="text-lg font-semibold text-gray-800 mb-2">🎵 Suggested Songs:</h4>
    <div className="flex flex-wrap justify-center gap-3">
      {playlist[emotion].map((s, i) => (
        <button
          key={i}
          onClick={() => playSong(emotion, i)}
          className={`px-4 py-2 rounded-full text-sm shadow transition-all duration-200 ${
            i === songIndex
              ? "bg-purple-600 text-white font-bold ring-2 ring-purple-400"
              : "bg-white bg-opacity-40 text-gray-800 hover:bg-opacity-70"
          }`}
        >
          {i === songIndex ? "🔊 " : ""}{s}
        </button>
      ))}
    </div>
  </div>
)}

            <div className="flex justify-center mt-4 space-x-2">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-pink-500 rounded-t-lg animate-bounce"
                  style={{ height: `${h * 8}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-800 text-center bg-red-200 bg-opacity-40 p-4 rounded-xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
