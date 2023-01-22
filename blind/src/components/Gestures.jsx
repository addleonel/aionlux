import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../utils.js";

import {loveYouGesture} from "../Fingers.js"; 

import * as fp from "fingerpose";
import thumbs_up from "../assets/static/gestures/thumbs_up.png";
import victory from "../assets/static/gestures/victory.png";
import ily from "../assets/static/gestures/ily.png";
import "../assets/styles/Gestures.scss";

function Gestures() {
  const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
        setIsAuth(true);
        }
    }, []);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory, i_love_you:  ily};
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
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
      const hand = await net.estimateHands(video);
      // console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
        fp.Gestures.ThumbsUpGesture,
          fp.Gestures.VictoryGesture,
          loveYouGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji);
        }
      }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
   <React.Fragment>
    {
      isAuth ? (
        <div className="cam-container">
      <header className="webcam-header">
        <Webcam
          ref={webcamRef}
          className="webcam"
          videoConstraints={videoConstraints}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1200,
            height: 620,
          }}
        />

        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              top: '10%',
              right: '10%',
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
      ): (
        <div></div>
      )
    }
   </React.Fragment> 
    
  );
}

export default Gestures;