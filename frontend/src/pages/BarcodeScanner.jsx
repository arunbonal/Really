import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useApiData } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const BarcodeScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [scanResult, setScanResult] = useState("");
  const { setApiData } = useApiData();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
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
              console.log("Barcode detected:", result.text);
              setScanResult(result.text);

              // Send barcode number to backend
              sendBarcodeToBackend(result.text);

              // Stop scanning after successful detection
              codeReader.reset();
            }
          }
        );
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Failed to access camera.");
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, []);

  // Function to send barcode number to the backend
  const sendBarcodeToBackend = async (barcode) => {
    try {
      const response = await fetch(
        `http://localhost:8080/product/food/search/${barcode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send barcode to backend");
      }

      const data = await response.json();
      setApiData(data);
      navigate(`/product/food/${barcode}`);
    } catch (error) {
      console.error("Error sending barcode:", error);
    }
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
      <h1>Live Barcode Scanner</h1>
      <video
        ref={videoRef}
        style={{ border: "2px solid #0f0", width: "80%", maxWidth: "640px" }}
        autoPlay
      ></video>
      {scanResult && (
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
          {scanResult}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
