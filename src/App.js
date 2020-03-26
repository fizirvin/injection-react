import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home.js'
import Moldes from './pages/Moldes.js'
import Machines from './pages/Machines.js'
import Models from './pages/Models.js'
import Issues from './pages/Issues.js'
import Toolbar from './pages/Toolbar.js'
import Form from './pages/Form.js'

import './App.css';

class App extends React.Component {
  state = { 
    machines: [],
    moldes: [],
    models: [],
    issues: []
  };


  async componentDidMount(){
    const query = `query{
      machines{
        _id
        machineNumber
        machineSerial
      } moldes{
        _id
        moldeNumber
        moldeSerial
      } parts {
        _id
        partNumber
      }
      issues{
        _id
        issueName
      }
    }`

    const url = "https://injection.irvinfiz.now.sh/injection";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    };
    const res = await fetch(url, opts);
    const data = await res.json();
    console.log(data.data)
    this.setState({ machines: data.data.machines, moldes: data.data.moldes, models: data.data.parts, issues: data.data.issues })
  }


  render(){


    return (
      <BrowserRouter>
        <div className="App">
            <Toolbar></Toolbar>
          <div className="Content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Moldes" exact component={ props => ( <Moldes {...props} moldes={this.state.moldes}/> )} /> 
              <Route path="/Machines" exact render={ props => ( <Machines {...props} machines={this.state.machines}/> )}  />
              <Route path="/Models" exact component={ props => ( <Models {...props} models={this.state.models}/> )} /> 
              <Route path="/Issues" exact component={ props => ( <Issues {...props} issues={this.state.issues}/> )} />
              <Route path="/Form" exact component={ props => ( <Form {...props}/> )} />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
