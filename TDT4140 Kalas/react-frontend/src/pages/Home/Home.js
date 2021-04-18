import React from "react";
import Login from "../Login/Login";
import KalasRegistration from "../KalasRegistration/KalasRegistration";
import { HeaderText } from "../../atoms/Typography/Typography";
import "./Home.css";
import Menu from "../Menu/Menu";

import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const IP = "http://localhost:4000";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: false,
      loginFailed: false,
      username: "",
      kalasRegistered: false
    };
  }

  checkUser = async (username, password) => {
    try {
      const response = await axios.post(
        IP + "/check_login_user",
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
        this.setState({ loggedInUser: true });
        this.setState({ username: username });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  handleLogin = async (username, password) => {
    this.setState({ loginFailed: false });
    console.log("handleLogin running");
    await this.checkUser(username, password);
    console.log("loggedInUser: " + this.state.loggedInUser);
    this.setState({ loginFailed: !this.state.loggedInUser });
    return this.state.loggedInUser;
  };

  handleRegistered = async () => {
    console.log("handleRegistrated is running");
    this.setState({ kalasRegistered: true });
  };

  render() {
    return (
      <Grid container justify="center">
        <div style={{ padding: 50 }}>
          {this.state.loggedInUser ? (
            this.state.kalasRegistered ? (
              <Menu />
            ) : (
              <KalasRegistration
                loggedInUser={this.state.loggedInUser}
                username={this.state.username}
                handleRegistered={this.handleRegistered}
              />
            )
          ) : (
            <Login
              loginFailed={this.state.loginFailed}
              handleLogin={this.handleLogin}
              isAdmin={false}
            />
          )}
        </div>
      </Grid>
    );
  }
}
