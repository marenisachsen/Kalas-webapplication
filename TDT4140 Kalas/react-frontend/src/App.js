import React from "react";
import "./App.css";
import Logo from "./atoms/Logo/Logo";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import UserRegistration from "./pages/UserRegistration/UserRegistration";
import Layout from "./atoms/Layout/Layout";
import Button from "./atoms/Button/Button";
import AdminPage from "./pages/Admin/AdminPage";
import Grid from "@material-ui/core/Grid";
import FindKalas from "./pages/FindKalas/FindKalas";

function App(props) {
  return (
    <Layout>
      <Router>
        <div className="app">
          <div style={{ height: 100 }}>
            <Link to="/admin" style={{ float: "right" }}>
              <Button buttonName="Admin" />
            </Link>
            <Link to="/">
              <Logo color="blue" />
            </Link>
          </div>
          <Grid container justify="center">
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/userregistration">
                <UserRegistration />
              </Route>
              <Route path="/findkalas">
                <FindKalas />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Grid>
        </div>
      </Router>
    </Layout>
  );
}

export default App;
