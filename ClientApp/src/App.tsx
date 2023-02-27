import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEmp from "./components/add";
import Emp from "./components/empcomp";
import EmpList from "./components/list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Emp"} className="navbar-brand">
            Assignment 6
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Emp"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Emp"]} component={EmpList} />
            <Route exact path="/add" component={AddEmp} />
            <Route path="/Emp/:id" component={Emp} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;