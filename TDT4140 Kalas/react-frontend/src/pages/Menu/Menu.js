import React from "react";
import { HeaderText } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { Link } from "react-router-dom";

import axios from "axios";

const IP = "http://localhost:4000";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {console.log(this.state)}
        {/*<Link to="/editkalas">
        <Button buttonName="Rediger Kalas"/>
        </Link> */}
        <Link to="/findkalas">
          <Button buttonName="Finn Kalas" />
        </Link>
      </div>
    );
  }
}
