import React, { useRef, useEffect, useState } from "react";
import { useApiData } from "../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const MedsScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setDetectedText } = useApiData();
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [scanningAnimation, setScanningAnimation] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(false);
      } catch (error) {
        console.error("Camera access denied:", error);
        setCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    setScanningAnimation(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "captured.jpg");

      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        setDetectedText(result.text.join(", "));
        
        // Add a small delay for better UX
        setTimeout(() => {
          navigate(`/product/meds/${result.text[0]}`);
        }, 500);
      } catch (error) {
        console.error("Error processing image:", error);
        setIsScanning(false);
        setScanningAnimation(false);
        alert("Error processing image. Please try again.");
      }
    }, "image/jpeg");
  };

  const retryCamera = () => {
    setCameraError(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Medicine Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Point your camera at medicine labels, packaging, or text to get detailed information about ingredients, side effects, and safety data.
          </p>
        </div>

        {/* Scanner Container */}
        <div className="glass-effect p-8 rounded-3xl mb-8">
          {cameraError ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Camera Access Required</h2>
              <p className="text-gray-600 mb-6">
                Please allow camera access to scan medicine labels and packaging.
              </p>
              <button
                onClick={retryCamera}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Retry Camera Access
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Video Container */}
              <div className="relative mx-auto max-w-2xl">
                <video
                  ref={videoRef}
                  className="w-full rounded-2xl shadow-2xl"
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none">
                  {/* Corner Guides */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
                  
                  {/* Scanning Line Animation */}
                  {scanningAnimation && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
                  )}
                  
                  {/* Center Target */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-blue-400/50 rounded-lg relative">
                      <div className="absolute inset-0 border-2 border-blue-300/30 rounded-lg animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 text-center">
                <div className="bg-white/70 p-4 rounded-xl inline-block">
                  <p className="text-gray-700 font-medium">
                    📋 Point camera at medicine labels, packaging, or text
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          {!cameraError && (
            <button
              onClick={captureImage}
              disabled={isScanning}
              className={`relative px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isScanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
              }`}
            >
              {isScanning ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Scanning...
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="mr-2">🔍</span>
                  Scan Medicine
                </div>
              )}
            </button>
          )}
          
          <button
            onClick={() => navigate(-1)}
            className="mt-4 ml-4 px-8 py-3 rounded-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            ← Back
          </button>
        </div>

        {/* Tips Section */}
        <div className="mt-12 glass-effect p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Scanning Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="mr-2">📖</span>
              <span>Ensure good lighting for better text recognition</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">📱</span>
              <span>Hold camera steady and close to the text</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">🔍</span>
              <span>Focus on ingredient lists and dosage information</span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">⚡</span>
              <span>Works best with clear, printed text on labels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MedsScanner;
