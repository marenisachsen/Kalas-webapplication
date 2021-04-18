import React from "react";
import "./../../App.css";
import "./TextField.css";
import Container from "@material-ui/core/Container";

export default class TextField extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <input
            type={this.props.type}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          />
        </div>
      </Container>
    );
  }
}
