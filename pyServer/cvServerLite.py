from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
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
        
        # Initialize EasyOCR reader (will download models on first use)
        try:
            reader = easyocr.Reader(['en'])
            # Convert PIL image to numpy array
            img_array = np.array(img)
            # Use EasyOCR to do OCR
            results = reader.readtext(img_array)
            # Extract text from results
            lines = [result[1] for result in results if result[1].strip()]
            
            if not lines:
                return jsonify({"error": "No text detected in the image"}), 400
                
            return jsonify({"text": lines})
        except Exception as ocr_error:
            print(f"OCR Error: {str(ocr_error)}")
            return jsonify({"error": "OCR processing failed. Please try again."}), 500
            
    except Exception as e:
        print(f"Error processing upload: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    print(f"Server is running on port {port}")
    app.run(debug=True, host='0.0.0.0', port=port) 