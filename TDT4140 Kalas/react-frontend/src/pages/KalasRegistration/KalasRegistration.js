import React, { Component } from "react";
import Button from "../../atoms/Button/Button";
import TextField from "../../atoms/TextField/TextField";
import { BodyText } from "../../atoms/Typography/Typography";
import axios from "axios";
import "./KalasRegistation.css";
//import "./KalasRegistration.css";

const IP = "http://localhost:4000";

class KalasRegistration extends Component {
  state = {
    submitted: false,
    checked: false,
    title: "",
    numberOfPeople: "",
    phoneNumber: "",
    description: "",
    address: "",
    start: "",
    end: "",
    capacity: "",
    storage: []
  };

  submitState = element => {
    this.setState({
      storage: this.state.storage.concat(element)
    });
  };

  canSubmit = () => {
    //Shortens condition in if statements
    const title = this.state.title.length;
    const numberOfPeople = this.state.numberOfPeople.length;
    const description = this.state.description.length;
    const address = this.state.address.length;
    const start = this.state.start.length;
    const end = this.state.end.length;
    const capacity = this.state.capacity.length;
    const phoneNumber = this.state.phoneNumber.length;
    if (
      title === 0 ||
      numberOfPeople === 0 ||
      Number(this.state.numberOfPeople) < 0 ||
      description === 0
    ) {
      return false;
    }
    if (
      this.state.checked &&
      (address === 0 ||
        start === 0 ||
        end === 0 ||
        capacity === 0 ||
        phoneNumber === 0)
    ) {
      return false;
    }
    return true;
  };

  handleAddressChange = async event => {
    await this.setState({ address: event.target.value });
    console.log(this.state.address);
  };
  handlePhoneNumberChange = async event => {
    await this.setState({ phoneNumber: event.target.value });
    console.log(this.state.phoneNumber);
  };
  handleCapacityChange = async event => {
    await this.setState({ capacity: event.target.value });
    console.log(this.state.capacity);
  };
  handleEndChange = async event => {
    await this.setState({ end: event.target.value });
    console.log(this.state.end);
  };
  handleStartChange = async event => {
    await this.setState({ start: event.target.value });
    console.log(this.state.start);
  };
  handleDescriptionChange = async event => {
    await this.setState({ description: event.target.value });
    console.log(this.state.description);
  };
  handleTitleChange = async event => {
    await this.setState({ title: event.target.value });
    console.log(this.state.title);
  };
  handlePeopleChange = async event => {
    await this.setState({ numberOfPeople: event.target.value });
    console.log(this.state.numberOfPeople);
  };
  handleCheckboxChange = async event => {
    await this.setState({ checked: event.target.checked });
    console.log(this.state.checked);
  };

  //use async and await to update state immediatly
  handleButtonClick = async event => {
    const canSubmit = this.canSubmit();
    if (canSubmit) {
      await this.submitState(this.state.title);
      await this.submitState(this.state.numberOfPeople);
      await this.submitState(this.state.description);
      if (this.state.checked) {
        await this.submitState(this.state.address);
        await this.submitState(this.state.start);
        await this.submitState(this.state.end);
        await this.submitState(this.state.capacity);
        await this.submitState(this.state.phoneNumber);
      }
      await this.setState({ submitted: true });
    } else {
      console.log("Fyll ut alle feltene");
    }
    console.log(this.state.storage);
    console.log(this.state.submitted);
    if (this.state.submitted) {
      this.add_kalas(
        event,
        this.state.numberOfPeople,
        this.state.title,
        this.state.description,
        this.state.checked,
        this.state.address,
        this.state.start,
        this.state.end,
        this.state.capacity,
        this.state.phoneNumber
      );
    } else {
      console.log("kan ikke registrere");
    }
  };

  add_kalas = async (
    event,
    numberOfPeople,
    title,
    description,
    checked,
    address,
    start,
    end,
    capacity,
    phoneNumber
  ) => {
    const username = this.props.username;
    console.log(
      numberOfPeople,
      title,
      description,
      checked,
      address,
      start,
      end,
      capacity,
      phoneNumber,
      username
    );
    try {
      event.persist();
      const response = await axios.post(
        IP + "/add_kalas",
        {
          username: username,
          numberOfPersons: numberOfPeople,
          title: title,
          description: description,
          host: checked,
          address: address,
          startTime: start,
          endTime: end,
          capacity: capacity,
          phoneNumber: phoneNumber
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return (
      <div className="KalasReg">
        <header className="header">Registrer Kalas!</header>
        <TextField
          type="text"
          placeholder="Tittel"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <TextField
          type="text"
          placeholder="Antall"
          value={this.state.numberOfPeople}
          onChange={this.handlePeopleChange}
        />
        <TextField
          type="text"
          placeholder="beskrivelse"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <label>
          <span>Host:</span>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
        </label>
        <p></p>
        <div style={{ display: this.state.checked ? "block" : "none" }}>
          <TextField
            type="text"
            placeholder="Adresse"
            value={this.state.address}
            onChange={this.handleAddressChange}
          />
          <TextField
            type="text"
            placeholder="Fra"
            value={this.state.start}
            onChange={this.handleStartChange}
          />
          <TextField
            type="text"
            placeholder="Til"
            value={this.state.end}
            onChange={this.handleEndChange}
          />
          <TextField
            type="text"
            placeholder="Kapasitet"
            value={this.state.capacity}
            onChange={this.handleCapacityChange}
          />
          <TextField
            type="text"
            placeholder="Mobilnummer"
            value={this.state.phoneNumber}
            onChange={this.handlePhoneNumberChange}
          />
        </div>
        <Button
          disabled={!this.canSubmit()}
          buttonName="Registrer"
          onClick={this.handleButtonClick}
        />
        <p></p>
        <div style={{ display: this.state.submitted ? "block" : "none" }}>
          <ul>Tittel: {this.state.title}</ul>
          <ul>Antall: {this.state.numberOfPeople}</ul>
          <li>Beskrivelse: {this.state.description}</li>
          <div style={{ display: this.state.checked ? "block" : "none" }}>
            <ul>Adresse: {this.state.address}</ul>
            <ul>Fra: {this.state.start}</ul>
            <ul>Til: {this.state.end}</ul>
            <ul>Kapasitet: {this.state.capacity}</ul>
            <ul>Mobilnummer: {this.state.phoneNumber}</ul>
          </div>
        </div>
        <style jsx="true">
          {`
            .KalasReg {
              text-align: center;
            }
          `}
        </style>
      </div>
    );
  }
}
export default KalasRegistration;
