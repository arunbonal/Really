import requests
import json
from PIL import Image
import io
import numpy as np

def create_test_image():
    """Create a simple test image with text"""
    # Create a white image with black text
    img = Image.new('RGB', (400, 200), color='white')
    # For now, just return a simple image without text
    return img

def test_upload_endpoint():
    base_url = "https://really-cvserver.onrender.com"
    
    # Create a test image
    test_img = create_test_image()
    
    # Convert to bytes
    img_byte_arr = io.BytesIO()
    test_img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    # Test upload endpoint
    print("Testing upload endpoint...")
    try:
        files = {'file': ('test.png', img_byte_arr, 'image/png')}
        headers = {
            'Origin': 'https://really-neon.vercel.app'
        }
        
        response = requests.post(f"{base_url}/upload", files=files, headers=headers)
        print(f"Upload status: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print(f"Response: {response.json()}")
        else:
            print(f"Error response: {response.text}")
            
    except Exception as e:
        print(f"Upload test failed: {e}")

if __name__ == "__main__":
    test_upload_endpoint() 