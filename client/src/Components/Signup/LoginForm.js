import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";

const LoginPage = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const details = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(details);
    props.onSignin(details);
  };

  return (
    <Container className="login-page">
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitHandler}>
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
