import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

require("dotenv").config();

const App = () => (
    <div className="main">
        <Router>
            <Route path="/:id?">
                <Home></Home>
            </Route>
        </Router>
    </div>
);

export default App;
