from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=["https://really-neon.vercel.app", "http://localhost:5173"])

@app.route('/')
def home():
    return jsonify({"message": "Test server is running!"})

@app.route('/test')
def test():
    return jsonify({"status": "Test endpoint working!"})

@app.route('/upload', methods=['POST'])
def upload():
    return jsonify({"text": ["Test response"]})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    print(f"Starting Test Server on port {port}")
    app.run(debug=False, host='0.0.0.0', port=port) 