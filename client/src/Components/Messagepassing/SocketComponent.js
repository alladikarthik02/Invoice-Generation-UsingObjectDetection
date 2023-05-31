import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketComponent = () => {
  const [product, setProduct] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('redirect', (data) => {
      const { product } = data;
      setProduct(product);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (product) {
      // Perform the redirection
      window.location.href = `http://127.0.0.1:5000/product-name?prod=${product}`;
    }
  }, [product]);

  return (
    <div>
      Product: {product}
    </div>
  );
};

export default SocketComponent;
