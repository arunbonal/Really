from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import easyocr
import numpy as np

app = Flask(__name__)
CORS(app)

# Limit upload size to 2MB
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # 2 MB

# Lazy-load EasyOCR model
reader = None
def get_reader():
    global reader
    if reader is None:
        print("Loading EasyOCR model...")
        reader = easyocr.Reader(['en'], gpu=False)
    return reader

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Decode image
        np_img = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Resize large images to max width
        max_width = 800
        if image.shape[1] > max_width:
            scale_ratio = max_width / image.shape[1]
            new_height = int(image.shape[0] * scale_ratio)
            image = cv2.resize(image, (max_width, new_height))

        # Perform OCR
        results = get_reader().readtext(image, paragraph=False)
        texts = [text for (_, text, _) in results]

        return jsonify({"text": texts})
    
    except Exception as e:
        print("Error processing image:", str(e))
        return jsonify({"error": "Failed to process image", "details": str(e)}), 500

if __name__ == '__main__':
    print("Server is running on port 3000")
    app.run(debug=True, host='0.0.0.0', port=3000)
