import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home.js'
import Moldes from './pages/Moldes.js'
import Machines from './pages/Machines.js'
import Models from './pages/Models.js'
import Issues from './pages/Issues.js'
import Toolbar from './pages/Toolbar.js'

import AddMachine from './pages/forms/AddMachine.js'
import AddMold from './pages/forms/AddMold.js'
import AddModel from './pages/forms/AddModel.js'
import AddIssue from './pages/forms/AddIssue.js'

import './App.css';

class App extends React.Component {
  state = { 
    machines: [],
    machineMessage: 'new',
    moldeMessage: 'new',
    modelMessage: 'new',
    issueMessage: 'new',
    moldes: [],
    models: [],
    issues: [],
    server: 'https://injection.irvinfiz.now.sh/injection'
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

    const url = this.state.server;
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

  close = (message) =>{
    this.setState({[message]: 'new'})
  }

  addMachine = async (newMachine)=>{

    const query = `mutation{newMachine(input:{
      machineNumber: "${newMachine.machineNumber}"
      machineSerial: "${newMachine.machineSerial}"
    }) {
      _id
      machineNumber
      machineSerial
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    console.log(data.errors)
    this.setState({machineMessage: 'error'})
    } else{
      let machines = [...this.state.machines];
      machines.push(data.data.newMachine);
      this.setState({machines: machines, machineMessage: 'sucess'});
    }

  }

  addMolde = async (newMolde)=>{

    const query = `mutation{newMolde(input:{
      moldeNumber: "${newMolde.moldeNumber}"
      moldeSerial: "${newMolde.moldeSerial}"
    }) {
      _id
      moldeNumber
      moldeSerial
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    console.log(data.errors)
    this.setState({moldeMessage: 'error'})
    } else{
      let moldes = [...this.state.moldes];
      moldes.push(data.data.newMolde);
      this.setState({moldes: moldes, moldeMessage: 'sucess'});
    }

  }

  addModel = async (newModel)=>{

    const query = `mutation{newPartNumber(input:{
      partNumber: "${newModel.partNumber}"
    }) {
      _id
      partNumber
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    console.log(data.errors)
    this.setState({modelMessage: 'error'})
    } else{
      let models = [...this.state.models];
      models.push(data.data.newPartNumber);
      this.setState({models: models, modelMessage: 'sucess'});
    }

  }

  addIssue = async (newIssue)=>{

    const query = `mutation{newIssue(input:{
      issueName: "${newIssue.issueName}"
    }) {
      _id
      issueName
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    console.log(data.errors)
    this.setState({issueMessage: 'error'})
    } else{
      let issues = [...this.state.issues];
      issues.push(data.data.newIssue);
      this.setState({issues: issues, issueMessage: 'sucess'});
    }

  }


  render(){


    return (
      <BrowserRouter>
        <div className="App">
            <Toolbar></Toolbar>
          <div className="Content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Molds" exact component={ props => ( <Moldes {...props} moldes={this.state.moldes}/> )} /> 
              <Route path="/Machines" exact render={ props => ( <Machines {...props} machines={this.state.machines}/> )}  />
              <Route path="/Models" exact component={ props => ( <Models {...props} models={this.state.models}/> )} /> 
              <Route path="/Issues" exact component={ props => ( <Issues {...props} issues={this.state.issues}/> )} />
              <Route path="/Machines/Add" exact component={ props => ( <AddMachine {...props} 
                message={this.state.machineMessage} close={this.close} addMachine={this.addMachine}/> )} 
              />
              <Route path="/Molds/Add" exact component={ props => ( <AddMold {...props} 
                message={this.state.moldeMessage} close={this.close} addMolde={this.addMolde}/> )} 
              />
              <Route path="/Models/Add" exact component={ props => ( <AddModel {...props}
                message={this.state.modelMessage} close={this.close} addModel={this.addModel}/> )} 
              />
              <Route path="/Issues/Add" exact component={ props => ( <AddIssue {...props} 
                message={this.state.issueMessage} close={this.close} addIssue={this.addIssue}/> )} 
              />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
