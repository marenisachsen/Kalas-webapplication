import React, { Component } from "react";
import axios from "axios";

import KalasTable from "./AdminTable";

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

  delete_kalas = async event => {
      try {
          event.preventDefault();
          const response = await axios.post(IP + "/delete_user");
          await this.setState({allKalas: response.data});
      } catch (error) {
          console.log("error", error);
      }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.get_kalas}>
          <button type="submit">Finn kalas</button>
        </form>
        <form onSubmit={this.delete_kalas}>
            <button type="submit">Slett valgt kalas</button>
        </form>

        <KalasTable kalas={this.state.allKalas} isEmpty={this.state.allKalas.length === 0} />
      </div>
    );
  }
}

export default FindKalas;
