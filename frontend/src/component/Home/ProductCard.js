import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
//import { options } from "../../../../backend/app";

const ProductCard = ({ Products }) => {
  if (!Products) {
    return null;
  }
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerHeight < 600 ? 20 : 25,
    value: Products.ratings, //eta likhay value point korbe koto hote pare
    isHalf: true,
  };
  console.log("hello", Products);
  return (
    <Link className="productCard" to={`/product/${Products._id}`}>
      <img src={Products.images[0].url} alt={Products.name} />
      <p>{Products.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span>({Products.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${Products.price}`}</span>
    </Link>
  );
};

export default ProductCard;

//npm i react-rating-stars-component we are impliment the rating
