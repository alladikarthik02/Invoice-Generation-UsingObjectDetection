import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billVisible, setBillVisible] = useState(false);
  const [billDateTime, setBillDateTime] = useState("");
  const userDetails = useSelector((state) => state.userDetails);

  const products = [
    { id: "hdsbi78dfY", name: "CloseUp", price: 10 },
    { id: "kahv238923", name: "Cocoa Powder", price: 20 },
    { id: "etyd7890we", name: "Colgate", price: 15 },
    { id: "kjbw23jhvh", name: "Hershey-s", price: 10 },
    { id: "JHVgcYVj67", name: "KeraGlo", price: 10 },
    { id: "Ftuc88cUTI", name: "Lays", price: 10 },
    { id: "hvIViV89yv", name: "Loreal", price: 10 },
    { id: "jhdvsDjh3f", name: "Maggi", price: 10 },
    { id: "iyv9779v97", name: "MarieLight", price: 10 },
    { id: "iyvI9v9V76", name: "Perk", price: 10 },
  ];

  useEffect(() => {
    console.log(userDetails);
    let demoProducts = [];
    // if (userDetails.cart !== undefined) {
    // }
    const localCart = localStorage.getItem("cartItems");
    console.log(localCart);
    if (localCart !== null) {
      const temp = localCart.split("_");
      const set1 = new Set(temp);
      const arr = Array.from(set1);
      console.log(arr);
      for (let id of arr) {
        const filteredProducts = products.filter(
          (product) => product.id === id
        );
        if (filteredProducts.length !== 0) {
          demoProducts.push({ ...filteredProducts[0], quantity: 1 });
        }
      }
      setCartItems(demoProducts);
    }
  }, []);

  const addToCart = () => {
    const product = products.find((item) => item.name === selectedProduct);
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    };
    setCartItems([...cartItems, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };
  const generateBill = async () => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    setBillVisible(true);
    setBillDateTime(currentDateTime);

    const order = {
      username: userDetails.username,
      dateTime: currentDateTime,
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
    };

    try {
      await axios.post("http://localhost:8080/models/Order", order);
      console.log("Order saved successfully!");
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const scanHandler = () => {
    window.location.replace(" http://127.0.0.1:5000/video-feed");
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
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
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
          <Button
            variant="primary"
            onClick={addToCart}
            disabled={!selectedProduct}
          >
            Add to Cart
          </Button>
          <br />
          <br />
          <Button variant="primary" onClick={scanHandler}>
            Scan a product
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
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="product">
                  <div className="icon"></div>
                  <div className="name">{item.name}</div>
                </div>
              </td>
              <td>₹{item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="text-right">
              Total:
            </td>
            <td>₹{calculateTotalPrice()}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Button variant="danger" onClick={clearCart}>
        Clear Cart
      </Button>

      <Button
        variant="success"
        onClick={generateBill}
        disabled={cartItems.length === 0}
      >
        Generate Bill
      </Button>

      {billVisible && (
        <div className="bill">
          <h2>Bill</h2>
          <p>Username: {userDetails.username}</p> {/* Display the username */}
          <p>Date and Time: {billDateTime}</p> {/* Display the date-time */}
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="text-right">
                  Total:
                </td>
                <td>₹{calculateTotalPrice()}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ShoppingCart;
