from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import numpy as np
import os

app = Flask(__name__)
CORS(app, origins=["https://really-neon.vercel.app", "http://localhost:5173"], 
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

# Handle preflight requests
@app.route('/upload', methods=['OPTIONS'])
def handle_preflight():
    return '', 200

@app.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        # Read image file as numpy array
        img = Image.open(file.stream).convert('RGB')
        # Use pytesseract to do OCR
        text = pytesseract.image_to_string(img)
        # Split into lines, remove empty lines
        lines = [line for line in text.split('\n') if line.strip()]
        return jsonify({"text": lines})
    except Exception as e:
        print(f"Error processing upload: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    print(f"Server is running on port {port}")
    app.run(debug=True, host='0.0.0.0', port=port) 