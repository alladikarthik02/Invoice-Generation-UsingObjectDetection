import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";



const SignupForm = (props) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const details = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log(details);
        props.onSignin(details);
    }

	return (
		<div className="signup">
			<div className="signup-connect">
				<h1>Login into your account</h1>
			</div>
			<div className="signup-classic">
				<Form className="form">
					<Form.Group controlId="formEmail" className="email">
						<Form.Control type="email" placeholder="email" ref={emailRef}/>
					</Form.Group>
					<Form.Group controlId="formPassword" className="password">
						<Form.Control type="password" placeholder="password" ref = {passwordRef}/>
					</Form.Group>
					<Button type="submit" className="btn" onClick={submitHandler}>
						Sign Up
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default SignupForm;
