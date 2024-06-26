import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
//
import { thunk } from "redux-thunk";

//for connection
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    //jodi peye jaiii localstorage ee kichu then ota return kore dibe otherwise it will return empty array
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
}; //initial object
const middleware = [thunk]; //middleware
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;

//reducer
//action
//constant
