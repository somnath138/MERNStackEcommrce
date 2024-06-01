import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  console.log(`/products/${keyword}`);
  const searchSubmitHandler = (e) => {
    // //remove the default behaviour of the form (searchSubmitHandler)
    e.preventDefault(); //remove default behaviour
    if (keyword.trim()) {
      //remove all searches
      navigate(`/products/${keyword}`); //push in the history
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="SEARCH A PRODUCT--PRODUCTS"></MetaData>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
