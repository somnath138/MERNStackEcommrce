import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
const options = {
  profileIcon: true,
  profileIconColor: "#000",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "#000",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "#000",
  CartIconElement: MdAddShoppingCart,
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "6vmax",
  logoBorderRadius: "20vh!important",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#25bed7",
  link1Text: "Home",
  link2Text: "Medicines",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
