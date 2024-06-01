import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction"; //call from the action
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert(); //call useAlert
  const dispatch = useDispatch();
  //const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  // const product = {
  //   name: "Blue Tshirt",
  //   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  //   price: "$3000",
  //   _id: "somnath",
  // };
  console.log("", products);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="HOME PAGE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find AMAZING PRODUCTS BELLOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
            {/* achor tag ee a href er modhhe er value and kono div er container value
          same hole ota seii div ee point kore */}
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((Products, index) => (
                <Product Products={Products} key={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
