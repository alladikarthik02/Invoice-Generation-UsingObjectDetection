import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import moment from "moment";
import axios from "axios";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billVisible, setBillVisible] = useState(false);
  const [billDateTime, setBillDateTime] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState("");
  const products = [
    { id: "hdsbi78dfY", name: "CloseUp", price: 10, defaultDiscount: 10 },
    { id: "kahv238923", name: "Cocoa Powder", price: 20 },
    { id: "etyd7890we", name: "Colgate", price: 15, defaultDiscount: 10 },
    { id: "kjbw23jhvh", name: "Hershey-s", price: 10 },
    { id: "JHVgcYVj67", name: "KeraGlo", price: 10 },
    { id: "Ftuc88cUTI", name: "Lays", price: 10 },
    { id: "hvIViV89yv", name: "Loreal", price: 10 },
    { id: "jhdvsDjh3f", name: "Maggi", price: 10, defaultDiscount: 10 },
    { id: "iyv9779v97", name: "MarieLight", price: 10 },
    { id: "iyvI9v9V76", name: "Perk", price: 10 },
  ];
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const name = localStorage.getItem("username");
  useEffect(() => {
    let demoProducts = [];
    const localCart = localStorage.getItem("cartItems");
    if (localCart !== null) {
      const temp = localCart.split("_");
      const set1 = new Set(temp);
      const arr = Array.from(set1);
      for (let id of arr) {
        const filteredProducts = products.filter(
          (product) => product.id === id
        );
        if (filteredProducts.length !== 0) {
          demoProducts.push({ ...filteredProducts[0], quantity: 1 });
        }
      }

      const updatedProducts = demoProducts.map((product) => {
        const discount = product.defaultDiscount || 0;
        const discountedPrice =
          product.price - (product.price * discount) / 100;
        return { ...product, price: discountedPrice };
      });

      setCartItems(updatedProducts);
    }
    // eslint-disable-next-line
  }, []);


  const addToCart = () => {
    const product = products.find((item) => item.name === selectedProduct);
    if (product) {
      const discount = product.defaultDiscount || 0;
      const discountedPrice = product.price - (product.price * discount) / 100;
      const newItem = {
        id: product.id,
        name: product.name,
        price: discountedPrice,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
      setSelectedProduct("");
      setQuantity(1);
      console.log(
        `Added ${product.name} to the cart with price: $${discountedPrice}`
      );
    } else {
      console.log("Product not found");
    }
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

  const payBill = () => {
    // Perform the payment logic here...
    alert("Payment successful!");
  };

  const printBill = () => {
    const billContents = document.getElementById("billContents");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            /* Add any custom styles for the bill here */
          </style>
        </head>
        <body>
          <h2>Bill</h2>
          <p>Username: ${name}</p>
          <p>Date and Time: ${billDateTime}</p>
          <p>Invoice Number: ${invoiceNumber}</p>
          ${billContents.outerHTML}
          <script type="text/javascript">
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateRandomInvoiceNumber = () => {
    const uniqueId = "C1#"; // Unique identifier
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999

    return uniqueId + randomNumber;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const applyDiscount = () => {
    const discountCode = "10Percent";

    // Check if the entered discount coupon matches the expected code
    if (discountCoupon === discountCode) {
      // Example: Applying a 10% discount
      const discountPercentage = 10;
      const discountFactor = (100 - discountPercentage) / 100;

      const updatedCartItems = cartItems.map((item) => {
        const discountedPrice = item.price * discountFactor;
        return {
          ...item,
          price: discountedPrice.toFixed(2),
        };
      });

      setCartItems(updatedCartItems);
    } else {
      alert("Invalid discount coupon");
    }
  };

  const generateBill = async () => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    setBillVisible(true);
    setBillDateTime(currentDateTime);
    setInvoiceNumber(generateRandomInvoiceNumber());
    const order = {
      username: name,
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

  const scanHandler = () => {
    window.location.replace("http://127.0.0.1:5000/video-feed");
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
      <Row>
        <Col>
          <Form.Group controlId="discountCoupon">
            <Form.Label>Discount Coupon:</Form.Label>
            <Form.Control
              type="text"
              value={discountCoupon}
              onChange={(e) => setDiscountCoupon(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={applyDiscount}>
            Apply Discount
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
          <div>Username: {name}</div>
          <div>Date and Time: {billDateTime}</div>
          <div>Invoice Number: {invoiceNumber}</div>
          <div id="billContents" className="bill-contents">
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
          <Button variant="primary" onClick={payBill}>
            Pay
          </Button>
          <Button variant="primary" onClick={printBill}>
            Print Bill
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ShoppingCart;
