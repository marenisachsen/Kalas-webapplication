import React from "react";
import "./Logo.css";
import logo_white from "./logo_hvit.png";
import logo_black from "./logo_svart.png";
import logo_blue from "./logo_blue.png";

function colorOfLogo(color) {
  switch (color) {
    case "black":
      return logo_black;
    case "white":
      return logo_white;
    case "blue":
      return logo_blue;
    default:
      return logo_black;
  }
}

function Logo(props) {
  return (
    <div className="container">
      <img src={colorOfLogo(props.color)} alt="Logo" />
    </div>
  );
}

export default Logo;
