import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx'
import Moldes from './components/Moldes.jsx'
import Machines from './components/Machines.jsx'
import Models from './components/Models.jsx'
import Issues from './components/Issues.jsx'
import Toolbar from './components/Toolbar.jsx'

import './App.css';

class App extends Component {


  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Toolbar></Toolbar>
          <div className="Content">
            <Switch>
              <Route path="/" exact component={Home} /> 
              <Route path="/Moldes" exact component={Moldes} /> 
              <Route path="/Machines" exact component={Machines} />
              <Route path="/Models" exact component={Models} /> 
              <Route path="/Issues" exact component={Issues} /> 
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
