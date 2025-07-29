import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useApiData } from "../contexts/ApiContext";
import { useNavigate, useLocation } from "react-router-dom";

const BarcodeScanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState("");
  const { setApiData } = useApiData();

  // Determine category from URL path
  const getCategoryFromPath = () => {
    if (location.pathname.includes('/beauty/scan')) return 'beauty';
    if (location.pathname.includes('/food/scan')) return 'food';
    return 'food'; // default to food
  };

  const category = getCategoryFromPath();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let stream = null;

    const startScanner = async () => {
      try {
        setIsScanning(true);
        setError("");
        
        // Stop any existing stream first
        if (videoRef.current && videoRef.current.srcObject) {
          const existingStream = videoRef.current.srcObject;
          existingStream.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
        
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", true);
        }

        codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, err) => {
            if (result) {
              setScanResult(result.text);
              setIsScanning(false);

              // Send barcode number to backend
              sendBarcodeToBackend(result.text);

              // Stop scanning after successful detection
              codeReader.reset();
            }
          }
        );
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Failed to access camera. Please check permissions.");
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      // Cleanup: stop the stream and reset the reader
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const existingStream = videoRef.current.srcObject;
        existingStream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      codeReader.reset();
    };
  }, []);

  // Function to send barcode number to the backend
  const sendBarcodeToBackend = async (barcode) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/product/${category}/search/${barcode}`,
        { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Add this to send session cookies
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send barcode to backend");
      }

      const data = await response.json();
      setApiData(data);
      
      // Navigate to appropriate product page based on category
      if (category === 'food') {
        navigate(`/product/food/${barcode}`);
      } else if (category === 'beauty') {
        navigate(`/product/beauty/${barcode}`);
      }
    } catch (error) {
      console.error("Error sending barcode:", error);
      setError("Failed to fetch product information. Please try again.");
    }
  };

  const handleRetry = () => {
    setScanResult("");
    setError("");
    setIsScanning(true);
    
    // Clean up video stream before reloading
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {category === 'food' ? '🥤 Food' : category === 'beauty' ? '🧴 Beauty' : '💊 Medicine'} Scanner
          </h1>
          <p className="text-gray-300 text-lg">
            Point your camera at a {category} product barcode to get instant information
          </p>
        </div>

        {/* Scanner Container */}
        <div className="glass-effect p-8 rounded-3xl">
          {/* Video Container */}
          <div className="relative mb-6">
            <video
              ref={videoRef}
              className="w-full rounded-2xl shadow-2xl"
              autoPlay
              playsInline
            />
            
            {/* Scanning Overlay */}
            {isScanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-blue-400 rounded-2xl relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
                  
                  {/* Scanning Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {isScanning && !error && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 font-semibold">Scanning...</span>
              </div>
              <p className="text-gray-300 text-sm">
                Hold steady and align the barcode within the frame
              </p>
            </div>
          )}

          {scanResult && (
            <div className="text-center mb-6">
              <div className="bg-green-500 text-white px-6 py-4 rounded-2xl mb-4">
                <div className="text-2xl mb-2">✅ Barcode Detected!</div>
                <div className="font-mono text-lg">{scanResult}</div>
              </div>
              <p className="text-gray-300">
                Fetching product information...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center mb-6">
              <div className="bg-red-500 text-white px-6 py-4 rounded-2xl mb-4">
                <div className="text-xl mb-2">❌ Error</div>
                <div>{error}</div>
              </div>
              <button
                onClick={handleRetry}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-white/10 rounded-2xl">
            <h3 className="text-white font-semibold mb-3">Tips for best results:</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Ensure good lighting conditions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Keep the barcode steady and centered
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Make sure the barcode is not damaged or obscured
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Hold your device about 6-8 inches from the barcode
              </li>
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
