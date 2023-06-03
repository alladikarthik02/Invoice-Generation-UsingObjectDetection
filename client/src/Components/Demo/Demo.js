import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Demo = () => {
	const { id } = useParams();

	const dispatcher = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const items = localStorage.getItem("cartItems");
		console.log(items);
		if(items == null){
			localStorage.setItem("cartItems", id);
		}else{
			localStorage.setItem("cartItems", items + "_" + id)
		}
		if(id == 'None'){
			alert(`Product was not detected properly.\nPlease try again.`)
			navigate("/cart");
		}
		else{
			alert(`You are trying to enter product with ID: ${id}
			Please enter the appropriate quantity`);
      		dispatcher({ type: "add-to-cart", value: "product_id" });
			navigate("/cart");
		}
	}, []);

	return <div>{id}</div>;
};

export default Demo;
