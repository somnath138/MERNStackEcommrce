import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";
function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
