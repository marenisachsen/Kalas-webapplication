import React from "react";
import colors from "../../constants/colors.json";
import Button from "../../atoms/Button/Button";
import { BodyText } from "../../atoms/Typography/Typography";
import TextField from "../../atoms/TextField/TextField";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const styles = {
  inputHolder: {
    width: 200,
    height: 50,
    alignItems: "center",
    paddingLeft: 10
  },
  submitHolder: {
    width: 100,
    height: 50,
    color: colors.red,
    alignItems: "center"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin() {
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ password: "" });
    return this.props.handleLogin(username, password);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="login">
        <Grid justify="center">
          <div style={styles.inputHolder}>
            <TextField
              type="text"
              placeholder="Brukernavn"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div style={styles.inputHolder}>
            <TextField
              type="password"
              placeholder="Passord"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div>
            {this.props.loginFailed ? (
              <BodyText color="red" size={15}>
                Wrong username or password. Try again.
              </BodyText>
            ) : null}
          </div>
          {this.props.isAdmin ? (
            <div style={styles.submitHolder}>
              <Link to={"/admin"}>
                <Button
                  onClick={this.handleLogin}
                  buttonName="Logg inn med adminbruker"
                />
              </Link>
            </div>
          ) : (
            <div style={styles.submitHolder}>
              <Link to={"/"}>
                <Button onClick={this.handleLogin} buttonName="Logg inn" />
              </Link>
              <Link to={"/userregistration"}>
                <Button buttonName="Registrer bruker" />
              </Link>
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

export default Login;
