import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../../atoms/Button/Button.css";

import KalasTable from "./KalasTable";

const IP = "http://localhost:4000";

class FindKalas extends Component {
  state = {
    allKalas: []
  };

  get_kalas = async event => {
    try {
      event.preventDefault();
      const response = await axios.get(IP + "/all_kalas_hosts");
      await this.setState({ allKalas: response.data });
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    console.log(this.state);
    return (
      <div findKalas>
        <form onSubmit={this.get_kalas}>
          <button className="btn" type="submit">
            Finn Kalas
          </button>
        </form>

        <KalasTable
          kalas={this.state.allKalas}
          isEmpty={this.state.allKalas.length === 0}
        />
      </div>
    );
  }
}

export default withRouter(FindKalas);
