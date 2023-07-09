import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/models/Order");
      const filteredOrders = response.data.filter(
        (order) => order.username === username
      );
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <Container>
      <h2>Previous Orders</h2>
      {orders.reverse().map((order) => (
        <Card key={order._id} className="mb-4">
          <Card.Body>
            <Card.Title>Date/Time: {order.dateTime}</Card.Title>
            <Card.Text>
              <strong>Items:</strong>{" "}
              {order.items.map((item) => item.name).join(", ")}
            </Card.Text>
            <Card.Text>
              <strong>Total Price:</strong> {order.totalPrice}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <p>
        For Any Returns Please Contact The Store Staff With Your Respective
        Bill.
      </p>
    </Container>
  );
};

export default PreviousOrders;
