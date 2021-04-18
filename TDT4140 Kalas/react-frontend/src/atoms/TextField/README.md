// Genererer tekstfelt fra inputs 'text' gir placeholdertekst og 'type' endrer visuelt format på input.

```javascript
//For å bruke funskjonen
import TextField from "./atoms/TextField/TextField";
//funksjonskall
<TextField 
type = "text" 
placeholder = "Det som skal stå i feltet"
value = {this.state.value}
onChange = {this.handleChange}//OBS Denne funksjonen må defineres
/>

//Definere handleChange
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
    this.setState({value: event.target.value});
    //console.log(this.state.value)
  }



```
videre arbeid
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
} 