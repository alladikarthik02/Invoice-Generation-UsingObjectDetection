import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLoggedIn);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
        Invoice generation by object detection using yolo v8
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end p-1" style={{ width: "100%" }}>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link href="https://github.com/alladikarthik02/Invoice-Generation-UsingObjectDetection">
              Git Repo
            </Nav.Link>
            <NavDropdown title="Available Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Cocoa Powder
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Colgate</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Closeup</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Hershey's</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Keraglo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">Lays</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">L'Oreal</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8">Maggi</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.9">
                Marie Light
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.10">Perk</NavDropdown.Item>
            </NavDropdown>
            {userLoggedIn && (
              <Nav.Link
                onClick={() => {
                  navigate("/previous-items");
                }}
              >
                Previous Items
              </Nav.Link>
            )}
            {userLoggedIn ? (
              <>
                <Nav.Link
                  onClick={() => {
                    dispatch({ type: "logout" });
                    navigate("/");
                  }}
                >
                  Logout
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <AiOutlineShoppingCart /> Cart
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Signin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
