import "./App.css";
// import React, { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
//if you click the file path after clicking the control the it will be create a particular directory
import { Route, Routes } from "react-router-dom";
// import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
//import Loader from "./component/layout/Loader/Loader";
// import store from "./store";
// import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOption";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
// import axios from "axios";
import Payment from "./component/Cart/Payment";
import MyOrder from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
function App() {
  const { isAuthernticated, user } = useSelector((state) => state.user);
  console.log("app.js", isAuthernticated);
  // const [stripeApiKey, setStripeApiKey] = useState("");
  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   const res = await fetch("/api/v1/payment/process", {
  //     method: "POST",
  //   });

  //   const { client_secret: client_secret } = await res.json();
  //   setStripeApiKey({ key: data.stripeApiKey, secret: client_secret });
  // }
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid sans", "Chilanka"],
  //     },
  //   });
  //   store.dispatch(loadUser());
  //   getStripeApiKey();
  // }, []);
  // const StripePayment = () => (
  //   <Elements stripe={loadStripe(stripeApiKey.key)}>
  //     <Payment />
  //   </Elements>
  // );
  return (
    <>
      <Header />
      {isAuthernticated && <UserOption user={user} />}
      {/* //it's constant for every file so it's impliment here */}
      <Routes>
        <Route exact path="/" Component={Home} />
        {/* <Route extact path="/sad" Component={Loader} />  for check loader */}

        {/* for productdetails page */}

        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />
        {isAuthernticated && (
          <Route exact path="/account" Component={Profile} />
        )}
        {isAuthernticated && (
          <Route exact path="/me/update" Component={UpdateProfile} />
        )}

        {isAuthernticated && (
          <Route exact path="/password/update" Component={UpdatePassword} />
        )}

        {isAuthernticated && (
          <Route exact path="/login/shipping" Component={Shipping} />
        )}

        {isAuthernticated && (
          <Route exact path="/order/confirm" Component={ConfirmOrder} />
        )}

        {isAuthernticated && (
          <Route exact path="/process/payment" Component={Payment} />
        )}

        {isAuthernticated && <Route exact path="/orders" Component={MyOrder} />}

        {isAuthernticated && (
          <Route exact path="/orders/:id" Component={OrderDetails} />
        )}

        {/* {stripeApiKey && ( */}
        {/* <Route
          exact
          path="/process/payment"
          element={
            // <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
            // </Elements>
          }
        />
        )} */}

        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />

        <Route exact path="/login" Component={LoginSignUp}></Route>
        <Route exact path="/cart" Component={Cart}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
