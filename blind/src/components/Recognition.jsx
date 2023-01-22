import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils.js";
import "../assets/styles/Recognition.scss";


function Recognition() {
  const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
        setIsAuth(true);
        }
    }, []);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const videoConstraints = {
    width: 1200,
    height: 620,
    facingMode: "user"
  };
  
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 

    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <React.Fragment>
    {
      isAuth ? (
        <div className="cam-container">
        <header className="webcam-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            videoConstraints={videoConstraints}
            className="webcam"
          />

          <canvas
            ref={canvasRef}
            className="webcam-canvas"
          />
        </header>
      </div>
      ): (
       <div></div> 
      )
    }
    </React.Fragment>  
  );

}

export default Recognition;