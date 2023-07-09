import React from "react";

import "../../App.css";

const Home = () => {
	return (
    <div className="home">
      <div class="homebody">
        <h1>
          Welcome to the Invoice generation by object detection using yolo v8
        </h1>
        <p style={{ marginBlock: 15 }}>
          Reduce your checkout time and enjoy a seamless billing experience.
        </p>
        <p style={{ marginBlock: 30 }}>
          The automated billing system is a technological solution designed to
          streamline the retail checkout process and enhance customer
          satisfaction. By leveraging advanced technologies such as computer
          vision and machine learning, this system eliminates the need for
          traditional barcode scanning or RFID tag scanning.{" "}
        </p>
        <p style={{ marginBlock: 40 }}>
          The system's potential for further development includes integration
          with mobile applications, enabling customers to scan items and
          generate bills using their smartphones.
        </p>
        <p style={{ marginBlock: 30 }}>
          We use advanced computer vision algorithm like YOLOv8 (You Only Look
          Once) by <a href="https://ultralytics.com/"> Ultralytics</a> to detect
          the objects and then use <a href="https://opencv.org/"> OpenCV</a>, a
          popular library to process the live feed.
        </p>
      </div>
    </div>
  );
};

export default Home;
