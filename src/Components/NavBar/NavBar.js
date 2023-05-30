import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ShoppingCart from '../SC/ShoppingCart';
const NavBar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Retail-Billing System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end p-1" style={{ width: '100%' }}>
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#link">Git Repo</Nav.Link>
            <Nav.Link href="#order-history">My Orders</Nav.Link>
              <NavDropdown title="Available Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cocoa Powder</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Colgate</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Closeup</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Hershey's</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Keraglo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">Lays</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">L'Oreal</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8">Maggi</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.9">Marie Light</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.10">Perk</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleCartClick}>
              <AiOutlineShoppingCart /> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
