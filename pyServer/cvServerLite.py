from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import os

# Try to import easyocr, with fallback
try:
    import easyocr
    EASYOCR_AVAILABLE = True
    print("EasyOCR imported successfully")
except ImportError as e:
    print(f"EasyOCR import failed: {e}")
    EASYOCR_AVAILABLE = False

app = Flask(__name__)

# Configure CORS properly
from flask_cors import CORS
CORS(app, 
     origins=["https://really-neon.vercel.app", "http://localhost:5173"], 
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True)

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "CV Server is running!", "status": "healthy"})

# Test endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "CV Server is running!"})

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "easyocr_available": EASYOCR_AVAILABLE,
        "port": os.environ.get("PORT", "not set")
    })

@app.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        # Read image file as numpy array
        img = Image.open(file.stream).convert('RGB')
        
        # Check if EasyOCR is available
        if not EASYOCR_AVAILABLE:
            return jsonify({"error": "OCR service not available"}), 500
            
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
    print(f"Starting CV Server on port {port}")
    print(f"Environment: {os.environ.get('NODE_ENV', 'development')}")
    try:
        app.run(debug=False, host='0.0.0.0', port=port)
    except Exception as e:
        print(f"Error starting server: {e}")
        import traceback
        traceback.print_exc() 