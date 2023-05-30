import React from 'react';
import './CameraFeed.css'

const CameraFeed = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="http://127.0.0.1:5000/video-feed" alt="Video"/>
    </div>
  );
};

export default CameraFeed;
