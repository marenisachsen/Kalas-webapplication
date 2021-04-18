import React from "react";
import { Link } from "react-router-dom";
import colors from "../../constants/colors.json";
import Button from "../../atoms/Button/Button";
import { BodyText } from "../../atoms/Typography/Typography";
import TextField from "../../atoms/TextField/TextField";
import axios from "axios";
import "./UserRegistration.css";

const IP = "http://localhost:4000";

const styles = {
  container: {
    width: 200,
    textColor: colors.red,
    backgroundcolor: colors.lightblue,
    alignItems: "flex"
  }
};

class UserReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      name: "",
      birthyear: "",
      success: false
    };
    this.usernameTaken = false;
    this.unidenticalPasswords = false;
    this.invalidYear = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(
      this
    );
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBirthyearChange = this.handleBirthyearChange.bind(this);
  }

  emptyFields() {
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.repeatPassword == "" ||
      this.state.name == "" ||
      this.state.birthyear == ""
    ) {
      return true;
    }
    return false;
  }

  add_user = async (event, username, password, birthyear, name) => {
    console.log("add user: ", username, password, birthyear, name);
    try {
      event.persist();
      const response = await axios.post(
        IP + "/add_user",
        {
          username: username,
          password: password,
          birthyear: birthyear,
          name: name
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async check_username() {
    try {
      const response = await axios.get(IP + "/get_usernames");
      for (let i = 0; i < response.data.length; i++) {
        const username = Object.values(response.data[i]);
        console.log(this.state.username, username);
        if (this.state.username == username) {
          this.usernameTaken = true;
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  handleSubmit = async event => {
    console.log("handleSubmit running");
    this.usernameTaken = false;
    this.unidenticalPasswords = false;
    this.invalidYear = false;
    if (this.state.password != this.state.repeatPassword) {
      this.unidenticalPasswords = true;
      return;
    }
    if (
      Number(this.state.birthyear) == NaN ||
      Number(this.state.birthyear) < 1850 ||
      Number(this.state.birthyear) > 2020
    ) {
      console.log("Invalid birthyear");
      this.invalidYear = true;
      return;
    }
    await this.check_username(event);
    console.log(this.usernameTaken);
    if (this.usernameTaken) {
      return console.log("Brukernavn tatt");
    }
    this.add_user(
      event,
      this.state.username,
      this.state.password,
      this.state.birthyear,
      this.state.name
    );
    this.setState({
      username: "",
      password: "",
      repeatPassword: "",
      name: "",
      birthyear: ""
    });
    this.setState({ success: true });
    return;
  };
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleRepeatPasswordChange(event) {
    this.setState({ repeatPassword: event.target.value });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleBirthyearChange(event) {
    this.setState({ birthyear: event.target.value });
  }

  render() {
    return (
      <div className="UserReg" style={styles.container}>
        <TextField
          type="text"
          placeholder="Brukernavn"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <TextField
          type="password"
          placeholder="Passord"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <TextField
          type="password"
          placeholder="Gjenta passord"
          value={this.state.repeatPassword}
          onChange={this.handleRepeatPasswordChange}
        />
        <TextField
          type="text"
          placeholder="Navn"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextField
          type="text"
          placeholder="Fødselsår"
          value={this.state.birthyear}
          onChange={this.handleBirthyearChange}
        />
        <BodyText color="red" size={15}>
          {this.usernameTaken ? "Username is already taken." : null}
          {this.unidenticalPasswords ? "Passwords are unidentical." : null}
          {this.invalidYear ? "Birthyear invalid." : null}
          {this.state.success ? "Registrering fullført" : null}
        </BodyText>
        <Link to={this.state.success ? "/" : "/userRegistration"}>
          {this.state.success ? (
            <Button
              onClick={this.handleSubmit}
              buttonName={"Tilbake til login"}
            />
          ) : (
            <Button
              onClick={this.handleSubmit}
              buttonName={"Registrer bruker"}
              disabled={this.emptyFields()}
            />
          )}
        </Link>
      </div>
    );
  }
}
export default UserReg;
