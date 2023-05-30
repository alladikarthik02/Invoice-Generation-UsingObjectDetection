import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import ShoppingCart from './Components/SC/ShoppingCart';
import NavBar from './Components/NavBar/NavBar';
import CameraFeed2 from './Components/CameraFeed/CameraFeed2';
import SocketComponent from './Components/Messagepassing/SocketComponent';
const App = () => {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div class="homebody">
          <h1>Welcome to the Automated Billing System</h1>
          <p>
            Reduce your checkout time and enjoy a seamless billing experience.
          </p>
        </div>
      </div>
      <div className="cart">
        <CameraFeed2 />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default App;

