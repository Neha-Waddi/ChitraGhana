from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import base64
import os

app = Flask(__name__)
CORS(app)

model = load_model('model/emotion_model.h5')
emotion_map = {
    0: 'angry',
    1: 'disgust',
    2: 'fear',
    3: 'happy',
    4: 'sad',
    5: 'surprise',
    6: 'neutral'
}

def fetch_songs_by_emotion(emotion):
    try:
        folder_path = os.path.join("public", "songs", emotion)
        if not os.path.exists(folder_path):
            return []

        filenames = os.listdir(folder_path)
        songs = []

        for filename in filenames:
            if filename.endswith(".mp3"):
                songs.append({
                    "title": filename,
                    "artist": "Local Artist",
                    "url": f"/songs/{emotion}/{filename}"  # For frontend playback
                })

        return songs
    except Exception as e:
        print("❌ Error loading songs:", e)
        return []

def preprocess_image(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face = cv2.resize(gray, (48, 48))
    face = face.astype('float32') / 255.0
    face = np.expand_dims(face, axis=-1)  # (48,48,1)
    return face

@app.route('/detect', methods=['POST'])
def detect_emotion():
    try:
        data = request.get_json()
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        img_np = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

        # Predict emotion
        processed_face = preprocess_image(img)
        prediction = model.predict(np.array([processed_face]))[0]
        predicted_label = emotion_map[np.argmax(prediction)]

        print("🎭 Predicted Emotion:", predicted_label)

        # Fetch songs for that emotion
        songs = fetch_songs_by_emotion(predicted_label)

        return jsonify({
            'emotion': predicted_label,
            'songs': songs
        })
    except Exception as e:
        print("❌ Error in /detect:", e)
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
