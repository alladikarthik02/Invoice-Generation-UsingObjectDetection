import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const products = [
    { id: 1, name: "CloseUp", price: 10 },
    { id: 2, name: "Cocoa Powder", price: 20 },
    { id: 3, name: "Colgate", price: 15 },
    { id: 4, name: "Hershey-s", price: 10 },
    { id: 5, name: "KeraGlo", price: 10 },
    { id: 6, name: "Lays", price: 10 },
    { id: 7, name: "Loreal", price: 10 },
    { id: 8, name: "Maggi", price: 10 },
    { id: 9, name: "MarieLight", price: 10 },
    { id: 10, name: "Perk", price: 10 },
  ];

  const addToCart = () => {
    const product = products.find(item => item.name === selectedProduct);
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    };
    setCartItems([...cartItems, newItem]);
    setSelectedProduct('');
    setQuantity(1);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container>
      <h1>Shopping Cart</h1>
      <Row>
        <Col>
          <Form.Group controlId="productSelect">
            <Form.Label>Select a Product:</Form.Label>
            <Form.Control
              as="select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">-- Select Product --</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="quantityInput">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" onClick={addToCart} disabled={!selectedProduct}>
            Add to Cart
          </Button>
        </Col>
      </Row>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <div className="product">
                  <div className="icon">
                    
                  </div>
                  <div className="name">{item.name}</div>
                </div>
              </td>
              <td>${item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="text-right">Total:</td>
            <td>${calculateTotalPrice()}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ShoppingCart;
