import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Demo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    console.log(items);
    if (items === null) {
      localStorage.setItem("cartItems", id);
    } else {
      localStorage.setItem("cartItems", items + "_" + id);
    }

    if (id === "None") {
      alert("Product was not detected properly.\nPlease try again.");
      navigate("/cart");
    } else {
      alert(`You are trying to enter product with ID: ${id}.
Please enter the appropriate quantity`);
      dispatch({ type: "add-to-cart", value: id });
      dispatch({ type: "loginaftercall" });
      navigate("/cart");
    }
  }, [dispatch, id, navigate, userDetails]);

  return <div>{id}</div>;
};

export default Demo;
