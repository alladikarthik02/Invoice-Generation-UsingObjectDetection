import { createStore } from "redux";

// needs reducing function, and initial state
const initialState = { userLoggedIn: false, userDetails: {} };

const reducerFunction = (state = initialState, action) => {
	if (action.type === "login") {
		console.log(`Logging in!`);
		return { ...state, userLoggedIn: true, userDetails: action.value };
	}

	if (action.type === "logout") {
		console.log("Logging out!");
		return { ...state, userDetails: {}, userLoggedIn: false };
	}

	if(action.type === 'add-to-cart'){
		const uD = state.userDetails;
		const tempSet = new Set(uD.cart);
		tempSet.add(action.value);
		const newCart = Array.from(tempSet);
		uD.cart = newCart;
		return { ...state, userDetails: uD}
	}

	return state;
};

const store = createStore(reducerFunction);

export default store;
