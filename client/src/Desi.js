import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import CameraFeed from './Components/CameraFeed2';
import CaptureFrames from './components/CaptureFrames';
import PopUp from './components/PopUp';

function App() {
  return (
    <div>
      <NavBar />
      <CameraFeed />
      <PopUp />
      {/*<CaptureFrames />*/}
    </div>
  );
}

export default App;