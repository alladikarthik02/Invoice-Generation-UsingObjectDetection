import React, { useRef } from "react";
import { Table, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const BillPage = ({
  userDetails,
  cartItems,
  billDateTime,
  calculateTotalPrice,
}) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="bill">
      <h2>Bill</h2>
      <div className="UserDetails">Username: {userDetails.username}</div>
      <div className="DateTime">Date and Time: {billDateTime}</div>
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

      <Button variant="primary" onClick={handlePrint}>
        Print Bill
      </Button>
    </div>
  );
};

export default BillPage;
