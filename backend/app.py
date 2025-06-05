from flask import Flask, request, jsonify
from deepface import DeepFace
import base64
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/emotion", methods=["POST"])
def detect_emotion():
    data = request.get_json()
    image_data = base64.b64decode(data['image'].split(',')[1])
    np_arr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    result = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)
    emotion = result[0]['dominant_emotion']
    return jsonify({"emotion": emotion})

if __name__ == "__main__":
    app.run(debug=True)
