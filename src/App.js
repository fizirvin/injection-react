import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home.js'
import Moldes from './pages/Moldes.js'
import Machines from './pages/Machines.js'
import Models from './pages/Models.js'
import Issues from './pages/Issues.js'
import Toolbar from './pages/Toolbar.js'

import AddMachine from './pages/forms/AddMachine.js'
import UpdateMachine from './pages/forms/UpdateMachine.js'
import AddMold from './pages/forms/AddMold.js'
import UpdateMold from './pages/forms/UpdateMold.js'
import AddModel from './pages/forms/AddModel.js'
import UpdateModel from './pages/forms/UpdateModel.js'
import AddIssue from './pages/forms/AddIssue.js'
import UpdateIssue from './pages/forms/UpdateIssue.js'

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
    
    this.setState({machineMessage: 'error'})
    } else{
      let machines = [...this.state.machines];
      machines.push(data.data.newMachine);
      this.setState({machines: machines, machineMessage: 'sucess'});
    }

  }

  updateMachine = async (updateMachine)=>{

    const query = `mutation{updateMachine(_id: "${updateMachine._id}", input:{
      machineNumber: "${updateMachine.machineNumber}"
      machineSerial: "${updateMachine.machineSerial}"
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
    
    this.setState({machineMessage: 'error'})
    } else{

    let machine = data.data.updateMachine;
    let machines = [...this.state.machines];
    machines[machines.findIndex(el => el._id === machine._id)] = machine;
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
   
    this.setState({moldeMessage: 'error'})
    } else{
      let moldes = [...this.state.moldes];

      moldes.push(data.data.newMolde);
      this.setState({moldes: moldes, moldeMessage: 'sucess'});
    }

  }

  updateMolde = async (updateMolde)=>{

    const query = `mutation{updateMolde(_id: "${updateMolde._id}", input:{
      moldeNumber: "${updateMolde.moldeNumber}"
      moldeSerial: "${updateMolde.moldeSerial}"
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
    
    this.setState({moldeMessage: 'error'})
    } else{
      let molde = data.data.updateMolde;
      let moldes = [...this.state.moldes];
      moldes[moldes.findIndex(el => el._id === molde._id)] = molde;
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
    
    this.setState({modelMessage: 'error'})
    } else{
      let models = [...this.state.models];
      models.push(data.data.newPartNumber);
      this.setState({models: models, modelMessage: 'sucess'});
    }

  }

  updateModel = async (updateModel)=>{

    const query = `mutation{updatePartNumber(_id: "${updateModel._id}",input:{
      partNumber: "${updateModel.partNumber}"
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
    
    this.setState({modelMessage: 'error'})
    } else{
      let model = data.data.updatePartNumber;
      let models = [...this.state.models];
      models[models.findIndex(el => el._id === model._id)] = model;
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
    
    this.setState({issueMessage: 'error'})
    } else{
      let issues = [...this.state.issues];
      issues.push(data.data.newIssue);
      this.setState({issues: issues, issueMessage: 'sucess'});
    }

  }

  updateIssue = async (updateIssue)=>{

    const query = `mutation{updateIssue(_id: "${updateIssue._id}", input:{
      issueName: "${updateIssue.issueName}"
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
    
    this.setState({issueMessage: 'error'})
    } else{
      let issue = data.data.updateIssue;
      let issues = [...this.state.issues];
      issues[issues.findIndex(el => el._id === issue._id)] = issue;
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
              <Route path="/molds" exact component={ props => ( <Moldes {...props} moldes={this.state.moldes}/> )} /> 
              <Route path="/machines" exact render={ props => ( <Machines {...props} machines={this.state.machines}/> )}  />
              <Route path="/models" exact component={ props => ( <Models {...props} models={this.state.models}/> )} /> 
              <Route path="/issues" exact component={ props => ( <Issues {...props} issues={this.state.issues}/> )} />
              <Route path="/machines/add" exact component={ props => ( <AddMachine {...props} 
                message={this.state.machineMessage} close={this.close} addMachine={this.addMachine}/> )} 
              />
              <Route path="/machines/update/:id" exact component={ props => ( <UpdateMachine {...props} 
                machines={this.state.machines} message={this.state.machineMessage} close={this.close} updateMachine={this.updateMachine}/> )} 
              />
              <Route path="/molds/add" exact component={ props => ( <AddMold {...props} 
                message={this.state.moldeMessage} close={this.close} addMolde={this.addMolde}/> )} 
              />
              <Route path="/molds/update/:id" exact component={ props => ( <UpdateMold {...props} 
                moldes={this.state.moldes} message={this.state.moldeMessage} close={this.close} updateMolde={this.updateMolde}/> )} 
              />
              <Route path="/models/add" exact component={ props => ( <AddModel {...props}
                message={this.state.modelMessage} close={this.close} addModel={this.addModel}/> )} 
              />
              <Route path="/models/update/:id" exact component={ props => ( <UpdateModel {...props}
                models={this.state.models} message={this.state.modelMessage} close={this.close} updateModel={this.updateModel}/> )} 
              />
              <Route path="/issues/add" exact component={ props => ( <AddIssue {...props} 
                message={this.state.issueMessage} close={this.close} addIssue={this.addIssue}/> )} 
              />
              <Route path="/issues/update/:id" exact component={ props => ( <UpdateIssue {...props} 
                issues={this.state.issues} message={this.state.issueMessage} close={this.close} updateIssue={this.updateIssue}/> )} 
              />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
