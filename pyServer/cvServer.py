from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import easyocr
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

reader = easyocr.Reader(['en'], gpu=False)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    np_img = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    results = reader.readtext(image, paragraph=False)
    texts = [text for (_, text, _) in results]

    return jsonify({"text": texts})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    print(f"Server is running on port {port}")
    app.run(debug=True, host='0.0.0.0', port=port)
