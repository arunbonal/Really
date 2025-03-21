import React, { useRef, useEffect } from "react";
import { useApiData } from "../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const MedsScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setDetectedText } = useApiData();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        alert("Camera access denied.");
      }
    };

    startCamera();
  }, []);

  const captureImage = async () => {
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
        navigate(`/product/meds/${result.text[0]}`);
      } catch (error) {
        alert("Error processing image.");
      }
    }, "image/jpeg");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#222",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Live Text Scanner</h1>
      <video
        ref={videoRef}
        style={{ border: "2px solid #0f0", width: "80%", maxWidth: "640px" }}
        autoPlay
        playsInline
      ></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <br />
      <button
        onClick={captureImage}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontSize: "16px",
          background: "#0f0",
          border: "none",
          cursor: "pointer",
        }}
      >
        Capture & Scan
      </button>
      {/* {detectedText && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#0f0",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {detectedText}
        </div>
      )} */}
    </div>
  );
};

export default MedsScanner;
