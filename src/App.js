import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import ShoppingCart from './Components/SC/ShoppingCart';
import NavBar from './Components/NavBar/NavBar';
import CameraFeed2 from './Components/CameraFeed/CameraFeed2';
import SocketComponent from './Components/Messagepassing/SocketComponent';
function App() {
  return (
    <div>
      <NavBar />
      <ShoppingCart />
    </div>
  );
}

export default App;
