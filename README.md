# Kalas-webapplication
Kalas webapplication from TDT4140

Kalas is a web application that makes it possible for its users to join their social gathering, Kalas, with other users' gatherings.
The application seeks to make registration and search of Kalases as user friendly as possible.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

# Motivation

Project as part of the subject TDT4140 Software Engineering at the Norwegian University of Science and Technology (NTNU).  
The goal was to learn about Scrum and Extreme Programming by using the processes while developing an application.

# Run application

1. Clone the gitlab repository to your computer by running `git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2020/34.git` in your terminal.

2. Install node.js on your computer: https://nodejs.org/en/download/

3. Run `npm install` in your terminal from inside the project folder "34".

4. To run backend you need to use NTNU's VPN by following the directions here: https://software.ntnu.no/ntnu/vpn. Log in with your username and password.

5. Go to the folder named "34/database" in your terminal. Run `node index.js`. Keep the terminal open.

6. To run frontend, go to "34/react-frontend" folder in a new terminal. Run `npm run start`. Keep the terminal open.

7. Open localhost:3000 on your browser to see the application.

# Commit messages

`git commit -m "00-0 Add message here"`

1. Start message with issue ID like this: "01-2: Add TextField.js"
2. Use imperative (ex. Fix, not Fixed)
3. Capitalize first letter
4. Don't use period marks
5. Write only what you did, not how.

# Prettier - Code formatter

Prettier is used as code formatter in VSCode to make the code look pretty.

Go to Extencions (Ctrl+Shift+X).  
Search for Prettier - Code formatter. Install.

Go to Settings (Ctrl+,).  
Search for "formatter" and find the following settings.  
Editor: Default formatter -> Choose "esbenp.prettier-vscode"  
Editor: Format On Save -> Check the box.

# Atomic Design

We are using atomic design principles for front end design, but we are skipping the folder named templates.
https://atomicdesign.bradfrost.com/chapter-2/

Folders within src are named:  
atoms  
molecules  
organisms  
pages

Within these there are folders with .js-files and .css-files for each component.

# Naming conventions

Component files use PascalCase (ex. TextField.js)  
Other files use camelCase (ex. serviceWorker.js)  
Classes use PascalCase (ex. TextField)  
Functions use camelCase (ex. buttonStyle)

# Usage of atoms and constants

## Button

```javascript
<Button
  buttonName="Enter button name"
  onClick={onClick} //Need to be defined
/>
```

## Logo

Logo will size to the div around it.  
There are three colors to choose from; black (default), blue and white.

```javascript
<div>
  <Logo color="black" />
  <Logo />
  <Logo color="white" />
  <Logo color="blue" />
</div>
```

## TextField

```javascript
<TextField
type = "text"
placeholder = "Field placholder text"
value = {this.state.value}
onChange = {this.handleChange} //Need to be defined
/>

//Define handleChange
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
    this.setState({value: event.target.value});
  }
```

## Typography

There are three types of typography to be used; LogoText, HeaderText and BodyText.  
Color options are red, indigo, white, darkblue, lightblue and grey. Default color is darkblue.  
Sizes are chosen freely. Default sizes are 50, 30, 20 for logo, header, body respectively.

```javascript
import {
  HeaderText,
  BodyText,
  LogoText
} from "./atoms/Typography/Typography.js";

<LogoText color="darkblue" size={50}>
    Kalas!
</LogoText>
<HeaderText color="red" size={30}>
    Hurray, this is nice!
</HeaderText>
<BodyText color="grey" size={20}>
    Some info about Kalas.
</BodyText>
```

## Colors and fonts

NB! Avoid using fonts with &lt;p&gt;. Use typography instead.

Import (if you are in src-folder) and use the colors and fonts like this:

```javascript
import colors from "./constants/Colors/colors.json";

<p style={{ color: colors.indigo, fontFamily: "broadway" }}>Kalas!</p>;
```

The options for colors are red, indigo, white, darkblue, lightblue and grey.  
The options for fonts are broadway (for logo), versaler (for headers) and raleway (for text).

