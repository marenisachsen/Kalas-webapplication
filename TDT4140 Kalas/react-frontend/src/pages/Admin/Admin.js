import React from "react";
import { HeaderText } from "../../atoms/Typography/Typography";
import Login from "../Login/Login";
import AdminPage from "./AdminPage"

import axios from "axios";

const IP = "http://localhost:4000";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInAdmin: false,
      loginFailed: false
    };
  }

  checkAdmin = async (username, password) => {
    try {
      const response = await axios.post(
        IP + "/check_login_admin",
        {
          username: username,
          password: password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      console.log("response", response);
      if (response.data) {
        console.log("response.data", response.data);
        this.setState({ loggedInAdmin: true });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  handleLogin = async (username, password) => {
    this.setState({ loginFailed: false });
    console.log("handleLogin running");
    await this.checkAdmin(username, password);
    console.log("LoggedInAdmin: " + this.state.loggedInAdmin);
    this.setState({ loginFailed: !this.state.loggedInAdmin });
    return this.state.loggedInAdmin;
  };

  render() {
    return (
      <div>
        {console.log(this.state)}
        {this.state.loggedInAdmin ? (
          <div>
          <HeaderText>Velkommen til adminsiden</HeaderText>
          <AdminPage></AdminPage>
          </div>
        ) : (
          <Login
            loginFailed={this.state.loginFailed}
            handleLogin={this.handleLogin}
            isAdmin={true}
          />
        )}
      </div>
    );
  }
}
