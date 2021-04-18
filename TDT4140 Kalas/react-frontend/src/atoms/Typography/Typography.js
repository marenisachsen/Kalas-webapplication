import React from "react";
import colors from "../../constants/colors.json";

function setColor(color) {
  switch (color) {
    case "red":
      return colors.red;
    case "indigo":
      return colors.indigo;
    case "white":
      return colors.white;
    case "darkblue":
      return colors.darkblue;
    case "lightblue":
      return colors.lightblue;
    case "grey":
      return colors.grey;
    default:
      return colors.darkblue;
  }
}

const logoStyle = props => ({
  color: setColor(props.color),
  fontFamily: "broadway",
  fontSize: props.size ? props.size : 50
});

const headerStyle = props => ({
  color: setColor(props.color),
  fontFamily: "versaler",
  fontSize: props.size ? props.size : 30
});

const bodyStyle = props => ({
  color: setColor(props.color),
  fontFamily: "raleway",
  fontSize: props.size ? props.size : 20
});

export function LogoText(props) {
  return <h1 style={logoStyle(props)}>{props.children}</h1>;
}

export function HeaderText(props) {
  return <h2 style={headerStyle(props)}>{props.children}</h2>;
}

export function BodyText(props) {
  return <p style={bodyStyle(props)}>{props.children}</p>;
}
