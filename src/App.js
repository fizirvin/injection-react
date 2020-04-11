import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home.js'
import Moldes from './pages/Moldes.js'
import AddMold from './pages/forms/AddMold.js'
import UpdateMold from './pages/forms/UpdateMold.js'
import Machines from './pages/Machines.js'
import AddMachine from './pages/forms/AddMachine.js'
import UpdateMachine from './pages/forms/UpdateMachine.js'
import Models from './pages/Models.js'
import AddModel from './pages/forms/AddModel.js'
import UpdateModel from './pages/forms/UpdateModel.js'
import Issues from './pages/Issues.js'
import AddIssue from './pages/forms/AddIssue.js'
import UpdateIssue from './pages/forms/UpdateIssue.js'
import Programs from './pages/Programs.js'
import AddProgram from './pages/forms/AddProgram.js'
import UpdateProgram from './pages/forms/UpdateProgram.js'
import Reports from './pages/Reports.js'
import AddReport from './pages/forms/AddReport.js'
import UpdateReport from './pages/forms/UpdateReport.js'
import Toolbar from './pages/Toolbar.js'
import Production from './pages/Production.js'


import './App.css';

class App extends React.Component {
  state = { 
    machines: [],
    machineMessage: 'new',
    moldeMessage: 'new',
    modelMessage: 'new',
    issueMessage: 'new',
    programMessage: 'new',
    reportMessage: 'new',
    moldes: [],
    models: [],
    issues: [],
    programs: [],
    reports: [],
    reportsDate: [],
    server: 'https://injection.irvinfiz.now.sh/injection'
  };

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate();
    const m = date.getMonth()+1

    function M(){
      if(m < 10){
        return '0'+ m
      } else { return m } 
    }
    
    function D(){
      if(d < 10){
        return '0'+ d
      } else { return d }
    }
  
    const formatD = D();
    const formatM = M();
    formatDate = y + '-'+ formatM + '-'+ formatD
    return formatDate
  }

  

  getDateofTable = (number)=>{
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const dayOfMonth = today.getDate();
    const difference = dayOfMonth - dayOfWeek;
    const day = difference + number;
    const date= today.setDate(day)
    return this.formatDate(date)
  }


  async componentDidMount(){

    const initial = this.getDateofTable(1)
    const end = this.getDateofTable(7)

    

    const query = `query{
      machines{
        _id
        machineNumber
        machineSerial
      } 
      moldes{
        _id
        moldeNumber
        moldeSerial
      } 
      parts {
        _id
        partNumber
      }
      issues{
        _id
        issueName
      }
      programs{
        _id
        machineNumber{
          _id
          machineNumber
          machineSerial
        }
        moldeNumber{
          _id
          moldeNumber
          moldeSerial
        }
        partNumber{
          _id
          partNumber
        }
        cycles
        capacity
      }
      reports{
        _id
        reportDate
        shift
        machine{
          _id
          machineNumber
          machineSerial
        }
        totalReal
        totalOK
        totalNG
        totalCapacity
        totalTime
        downtime
        efficiency
        production{
          _id
          real
          ng
          ok
          time
          oee
          capacity
          partNumber {
            _id
            partNumber
          }
          molde{
            _id
            moldeNumber
            moldeSerial
          }
        }
        downtimeDetail {
          _id
          issueId{
            _id
            issueName
          }
          mins
        }
      }
      reportsDate(initial: "${initial}T00:30:00.000+00:00", end: "${end}T23:00:00.000+00:00"){
        date
 	      report
        machine
        part
        molde
        ok
        ng
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
    console.log('holalalala')
    this.setState({ 
      machines: data.data.machines, 
      moldes: data.data.moldes, 
      models: data.data.parts, 
      issues: data.data.issues,
      programs: data.data.programs,
      reports: data.data.reports,
      reportsDate: data.data.reportsDate
    })
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

      let programs = [...this.state.programs]
      let reports = [...this.state.reports]

      const updateProgramMachine = (programs, machine) => {
        return programs.map(item => {
            var temp = Object.assign({}, item);
            if (temp.machineNumber._id === machine._id) {
                temp.machineNumber = machine;
            }
            return temp;
        });
      }

      const updateReportMachine = (reports, machine) => {
        return reports.map(item => {
            var temp = Object.assign({}, item);
            if (temp.machine._id === machine._id) {
                temp.machine = machine;
            }
            return temp;
        });
      }
    
      const updatedPrograms = updateProgramMachine(programs, machine);
      const updatedReports = updateReportMachine(reports, machine);

      this.setState({machines: machines, programs: updatedPrograms, reports: updatedReports, machineMessage: 'sucess'});
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

      let programs = [...this.state.programs]

      const updateProgramMolde = (programs, molde) => {
        return programs.map(item => {
            var temp = Object.assign({}, item);
            if (temp.moldeNumber._id === molde._id) {
                temp.moldeNumber = molde;
            }
            return temp;
        });
      }
    
      const updatedPrograms = updateProgramMolde(programs, molde);
    

      this.setState({moldes: moldes, programs: updatedPrograms, moldeMessage: 'sucess'});
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

      let programs = [...this.state.programs]

      const updateProgramModel = (programs, model) => {
        return programs.map(item => {
            var temp = Object.assign({}, item);
            if (temp.partNumber._id === model._id) {
                temp.partNumber = model;
            }
            return temp;
        });
      }
    
      const updatedPrograms = updateProgramModel(programs, model);

      this.setState({models: models, programs: updatedPrograms, modelMessage: 'sucess'});
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

  addProgram = async (program)=>{

    const query = `mutation{newProgram(input:{
      machineNumber: "${program.machine}"
      moldeNumber: "${program.molde}"
      partNumber: "${program.model}"
      cycles: ${program.cycles}
      capacity: ${program.capacity}
    }) {
      _id
    machineNumber {
      _id
      machineNumber
      machineSerial
    }
    moldeNumber {
      _id
      moldeNumber
      moldeSerial
    }
    partNumber {
      _id
      partNumber

    }
    cycles
    capacity
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
    
    this.setState({programMessage: 'error'})
    } else{
      let programs = [...this.state.programs];
      programs.push(data.data.newProgram);
      this.setState({programs: programs, programMessage: 'sucess'});
    }

  }

  updateProgram = async (program)=>{

    const query = `mutation{updateProgram(_id: "${program._id}", input:{
      machineNumber: "${program.machine}"
      moldeNumber: "${program.molde}"
      partNumber: "${program.model}"
      cycles: ${program.cycles}
      capacity: ${program.capacity}
    }) {
      _id
    machineNumber {
      _id
      machineNumber
      machineSerial
    }
    moldeNumber {
      _id
      moldeNumber
      moldeSerial
    }
    partNumber {
      _id
      partNumber

    }
    cycles
    capacity
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
    
    this.setState({programMessage: 'error'})
    } else{
      let program = data.data.updateProgram;
      let programs = [...this.state.programs];
      programs[programs.findIndex(el => el._id === program._id)] = program;
      this.setState({programs: programs, programMessage: 'sucess'});
    }

  }

  addReport = async (report)=>{

      const reportDate = report.date
      const shift = report.shift
      const machine = report.machine
      const totalReal = report.totalReal
      const totalOK = report.totalOK
      const totalNG = report.totalNG
      const totalCapacity = report.totalCapacity
      const totalTime = report.totalTime
      const downtime = report.totalMins
      const efficiency = report.totalOEE
      const production = report.production
      const downtimeDetail = report.downtimeDetail


    const query = `mutation NewInjectionReport($input: NewInjectionReport ){
      newInjectionReport(input: $input){
        _id
        reportDate
        shift
        machine{
          _id
          machineNumber
          machineSerial}
        totalReal
        totalOK
        totalNG
        totalCapacity
        totalTime
        downtime
        efficiency
        production{
          _id
          real
          ng
          ok
          time
          oee
          capacity
          partNumber {
            _id
            partNumber
          }
          molde{
            _id
            moldeNumber
            moldeSerial
          }
        }
        downtimeDetail {
          _id
          issueId{
            _id
            issueName
          }
          mins
        }
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables:{
          input: {
            reportDate,
            shift,
            machine,
            totalReal,
            totalOK, 
            totalNG,
            totalCapacity ,
            totalTime, 
            downtime ,
            efficiency,
            production,
            downtimeDetail 
          }
        } })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    
    return this.setState({reportMessage: 'error'})
    } else{
      let reports = [...this.state.reports];
      reports.push(data.data.newInjectionReport);
      this.setState({reports: reports, reportMessage: 'sucess'});
    }

  }

  updateReport = async (report)=>{
    const _id = report._id
    const reportDate = report.date
    const shift = report.shift
    const machine = report.machine
    const totalReal = report.totalReal
    const totalOK = report.totalOK
    const totalNG = report.totalNG
    const totalCapacity = report.totalCapacity
    const totalTime = report.totalTime
    const downtime = report.totalMins
    const efficiency = report.totalOEE
    const production = report.production
    const downtimeDetail = report.downtimeDetail


  const query = `mutation UpdateInjectionReport($_id: ID, $input: NewInjectionReport ){
    updateInjectionReport(_id: $_id, input: $input){
      _id
      reportDate
      shift
      machine{
        _id
        machineNumber
        machineSerial}
      totalReal
      totalOK
      totalNG
      totalCapacity
      totalTime
      downtime
      efficiency
      production{
        _id
        real
        ng
        ok
        time
        oee
        capacity
        partNumber {
          _id
          partNumber
        }
        molde{
          _id
          moldeNumber
          moldeSerial
        }
      }
      downtimeDetail {
        _id
        issueId{
          _id
          issueName
        }
        mins
      }
  }}`;

  const url = this.state.server;
  const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables:{
        _id: _id,
        input: {
          reportDate,
          shift,
          machine,
          totalReal,
          totalOK, 
          totalNG,
          totalCapacity ,
          totalTime, 
          downtime ,
          efficiency,
          production,
          downtimeDetail 
        }
      } })
  };

  const res = await fetch(url, opts);
  const data = await res.json();
 
  if(data.errors){
  
  return this.setState({reportMessage: 'error'})
  } else{
    let report = data.data.updateInjectionReport;
    let reports = [...this.state.reports];
    reports[reports.findIndex(el => el._id === report._id)] = report;
    this.setState({reports: reports, reportMessage: 'sucess'});

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
              <Route path="/molds/add" exact component={ props => ( <AddMold {...props} 
                message={this.state.moldeMessage} close={this.close} addMolde={this.addMolde}/> )} 
              />
              <Route path="/molds/update/:id" exact component={ props => ( <UpdateMold {...props} 
                moldes={this.state.moldes} message={this.state.moldeMessage} close={this.close} updateMolde={this.updateMolde}/> )} 
              />

              <Route path="/machines" exact render={ props => ( <Machines {...props} machines={this.state.machines}/> )}  />
              <Route path="/machines/add" exact component={ props => ( <AddMachine {...props} 
                message={this.state.machineMessage} close={this.close} addMachine={this.addMachine}/> )} 
              />
              <Route path="/machines/update/:id" exact component={ props => ( <UpdateMachine {...props} 
                machines={this.state.machines} message={this.state.machineMessage} close={this.close} updateMachine={this.updateMachine}/> )} 
              />
              
              <Route path="/models" exact component={ props => ( <Models {...props} models={this.state.models}/> )} /> 
              <Route path="/models/add" exact component={ props => ( <AddModel {...props}
                message={this.state.modelMessage} close={this.close} addModel={this.addModel}/> )} 
              />
              <Route path="/models/update/:id" exact component={ props => ( <UpdateModel {...props}
                models={this.state.models} message={this.state.modelMessage} close={this.close} updateModel={this.updateModel}/> )} 
              />
              
              <Route path="/issues" exact component={ props => ( <Issues {...props} issues={this.state.issues}/> )} />
              <Route path="/issues/add" exact component={ props => ( <AddIssue {...props} 
                message={this.state.issueMessage} close={this.close} addIssue={this.addIssue}/> )} 
              />
              <Route path="/issues/update/:id" exact component={ props => ( <UpdateIssue {...props} 
                issues={this.state.issues} message={this.state.issueMessage} close={this.close} updateIssue={this.updateIssue}/> )} 
              />
              
              <Route path="/programs" exact component={ props => ( <Programs {...props} programs={this.state.programs}/> )} />
              <Route path="/programs/add" exact component={ props => ( <AddProgram {...props} 
                machines={this.state.machines} 
                moldes={this.state.moldes} 
                models={this.state.models}
                message={this.state.programMessage} close={this.close} addProgram={this.addProgram}/> )} 
              />
              <Route path="/programs/update/:id" exact component={ props => ( <UpdateProgram {...props} 
                programs={this.state.programs}
                machines={this.state.machines} 
                moldes={this.state.moldes} 
                models={this.state.models} message={this.state.programMessage} close={this.close} updateProgram={this.updateProgram}/> )} 
              />
              <Route path="/reports" exact component={ props => ( <Reports {...props} reports={this.state.reports}/> )} />
              <Route path="/reports/add" exact component={ props => ( <AddReport {...props}
                programs={this.state.programs} 
                machines={this.state.machines} 
                issues={this.state.issues}
                message={this.state.reportMessage} close={this.close} addReport={this.addReport}/> )} 
              />
              <Route path="/reports/update/:id" exact component={ props => ( <UpdateReport {...props}
                reports={this.state.reports} 
                programs={this.state.programs} 
                machines={this.state.machines} 
                issues={this.state.issues}
                message={this.state.reportMessage} close={this.close} updateReport={this.updateReport}/> )} 
              />
              <Route path="/production" exact component={ props => ( <Production {...props} 
              models={this.state.models} reportsDate={this.state.reportsDate}
              /> )} />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
