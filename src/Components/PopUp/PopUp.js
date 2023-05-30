import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from 'react';

const PopUp = () => {
   const prod_map = new Map([
        [0, "CloseUp"],
        [1, "Cocoa Powder"],
        [2, "Colgate"],
        [3, "Hershey-s"],
        [4, "Keraglo"],
        [5, "Lays"],
        [6, "Loreal"],
        [7, "Maggi"],
        [8, "Marie Light"],
        [9, "Perk"],
     ]);
   const products = [];
   const i = 0;
   const product_number=-1;
   useEffect(() => {
    fetch('http://127.0.0.1:5000/video-feed')
       .then((res) => res)
       .then((data) => {
          console.log(data);
          product_number = parseInt(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
   }, []);
   <Popup trigger={product_number!=-1} position="right center">
    <form>
        <div>Is this {prod_map[product_number]}?</div>
        <input type='text' id='answer'></input>
    </form>
   </Popup>
   if (document.getElementById('answer')=='Yes') {
    products[i] = prod_map[product_number]
    i = i+1;
   }
};

export default PopUp;