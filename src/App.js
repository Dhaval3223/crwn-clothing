import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import HomePage  from './pages/homepage/homepage.component';

const Hatspage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
)

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={Hatspage} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
