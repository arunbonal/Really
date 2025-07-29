import requests
import json

def test_cv_server():
    base_url = "https://really-cvserver.onrender.com"
    
    # Test 1: Health check
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health check status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test 2: Ping endpoint
    print("\nTesting ping endpoint...")
    try:
        response = requests.get(f"{base_url}/ping")
        print(f"Ping status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Ping failed: {e}")
    
    # Test 3: CORS test
    print("\nTesting CORS endpoint...")
    try:
        headers = {
            'Origin': 'https://really-neon.vercel.app',
            'Content-Type': 'application/json'
        }
        response = requests.get(f"{base_url}/cors-test", headers=headers)
        print(f"CORS test status: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"CORS headers: {dict(response.headers)}")
    except Exception as e:
        print(f"CORS test failed: {e}")

if __name__ == "__main__":
    test_cv_server() 