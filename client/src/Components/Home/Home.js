import React from "react";
import { Container, Image } from "react-bootstrap";
import "../../App.css";
import laysImage from "../../assets/Lays.jpeg";
import maggiImage from "../../assets/Maggi.jpeg";
import lorealImage from "../../assets/Loreal.jpeg";
import perkImage from "../../assets/Perk.png";
import closeupImage from "../../assets/closeup.png";

const Home = () => {
  return (
    <Container className="home d-flex align-items-center justify-content-center">
      <div className="homebody">
        <h1>
          Welcome to the Invoice generation by object detection using yolo v8
        </h1>
        <p style={{ marginBlock: 15 }}>
          Reduce your checkout time and enjoy a seamless billing experience.
        </p>
        <p style={{ marginBlock: 30 }}>
          The invoice generation system is a technological solution designed to
          streamline the retail checkout process and enhance customer
          satisfaction. By leveraging advanced technologies such as computer
          vision and machine learning, this system eliminates the need for
          traditional barcode scanning or RFID tag scanning.
        </p>
        <p style={{ marginBlock: 40 }}>
          The system's potential for further development includes integration
          with mobile applications, enabling customers to scan items and
          generate bills using their smartphones.
        </p>
        <p style={{ marginBlock: 30 }}>
          We use advanced computer vision algorithm like YOLOv8 (You Only Look
          Once) by <a href="https://ultralytics.com/">Ultralytics</a> to detect
          the objects and then use <a href="https://opencv.org/">OpenCV</a>, a
          popular library to process the live feed.
        </p>
        <div className="side-heading">
          <h2>Available Products</h2>
        </div>
        <div className="image-container">
          <Image src={laysImage} fluid />
          <Image src={maggiImage} fluid />
          <Image src={lorealImage} fluid />
          <Image src={perkImage} fluid />
          <Image src={closeupImage} fluid />
        </div>
      </div>
    </Container>
  );
};

export default Home;
