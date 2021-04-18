import React from "react";
import "./Button.css";
import Grid from "@material-ui/core/Grid";

function Button(props) {
  return (
    <button type="button" className="btn" onClick={props.onClick}>
      {props.buttonName}
    </button>
  );
}

export default Button;
