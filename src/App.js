import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Moldes, Machines, Material, Models, Issues, 
  Defects, Programs, Reports, Toolbar, Production, Downtime, Users, Record } from './pages'
import { AddMold, UpdateMold, AddMachine, UpdateMachine, AddMaterial, UpdateMaterial, AddModel, UpdateModel, AddIssue,
  UpdateIssue, AddDefect, UpdateDefect, AddProgram, UpdateProgram, AddReport, UpdateReport, AddUser, UpdateUser } from './forms';
import { initialQuery } from './actions/queries'
import { addMachine, addMolde, addMaterial, addModel, addIssue, addDefect, addProgram, addReport, addUser, 
  modifyUser, modifyMachine, modifyMolde, modifyMaterial, modifyModel, modifyIssue, modifyDefect, modifyProgram, modifyReport } from './actions/mutations'
import { getDateofTable, getDateofTable49, formatDate } from './actions/helpers'
import { url, opts } from './actions/config'
import './App.css';
import './pages/styles/layout.css'
import './pages/Production.css'
import './pages/Downtime.css'

class App extends Component {
  state = {
    machines: [],
    machineMessage: 'new',
    moldeMessage: 'new',
    modelMessage: 'new',
    materialMessage: 'new',
    issueMessage: 'new',
    defectMessage: 'new',
    programMessage: 'new',
    reportMessage: 'new',
    userMessage: 'new',
    moldes: [],
    cycles: [],
    materials: [],
    models: [],
    issues: [],
    defects: [],
    programs: [],
    reports: [],
    downtimeByDate: [],
    defectsByDate: [],
    productionByDate: [],
    resinesByDate: [],
    users: [],
    initial49:'',
    end:'',
    server: 'https://injection.irvinfiz.now.sh/injection'
  };

  async componentDidMount(){
    const date = new Date();
    const today = formatDate(date)+'T23:59:00.000-06:00'
    const end = getDateofTable(7, today);
    const initial49 = getDateofTable49(1, today);
    initialQuery.variables = {
      initial: initial49,
      end: end
    }
    opts.body = JSON.stringify(initialQuery)
    const res = await fetch(url, opts);
    const data = await res.json();
    console.log('holalalala', data)
    this.setState({ 
      machines: data.data.machines,
      materials: data.data.materials, 
      moldes: data.data.moldes,
      cycles: data.data.cycles, 
      models: data.data.parts, 
      issues: data.data.issues,
      defects: data.data.defects,
      programs: data.data.programs,
      reports: data.data.reports,
      productionByDate: data.data.productionByDate,
      downtimeByDate: data.data.downtimeByDate,
      defectsByDate: data.data.defectsByDate,
      resinesByDate: data.data.resinesByDate,
      users: data.data.users,
      initial49: initial49,
      end: end
    })
  }

  close = message => this.setState({[message]: 'new'});

  addUser = async ({name, level, password})=>{
    const input = { name, level, password }
    addUser.variables = { input }
    opts.body = JSON.stringify(addUser)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({userMessage: 'error'})
    } else{
      const { newUser } = data.data
      const users = [...this.state.users, newUser ];
      this.setState({ users, userMessage: 'sucess'});
    }
  }

  updateUser = async ({_id, level, active})=>{
    const input = { level, active}
    console.log(input)
    modifyUser.variables = { _id, input }
    opts.body = JSON.stringify(modifyUser)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      console.log(data.errors)
      this.setState({userMessage: 'error'})
    } else{
      let user = data.data.updateUser;
      let users = [...this.state.users];
      users[users.findIndex(el => el._id === user._id)] = user;
      this.setState({ users, userMessage: 'sucess'});
    }
  }

  addMachine = async ({ machineNumber, machineSerial, closingForce, spindleDiameter })=>{
    const input = { machineNumber, machineSerial, closingForce, spindleDiameter }
    addMachine.variables = { input }
    opts.body = JSON.stringify(addMachine)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({machineMessage: 'error'})
    } else{
      const { newMachine } = data.data
      const machines = [...this.state.machines, newMachine ];
      this.setState({ machines, machineMessage: 'sucess'});
    }
  }

  updateMachine = async ({ _id, machineNumber, machineSerial, closingForce, spindleDiameter })=>{
    const input = { machineNumber, machineSerial, closingForce, spindleDiameter }
    modifyMachine.variables = { _id, input }
    opts.body = JSON.stringify(modifyMachine)
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
      this.setState({ machines: machines, programs: updatedPrograms, reports: updatedReports, machineMessage: 'sucess'});
    }
  }

  addMolde = async ({moldeNumber, moldeSerial, cavities, lifecycles})=>{
    const input = { moldeNumber, moldeSerial, cavities, lifecycles }
    addMolde.variables = { input }
    opts.body = JSON.stringify(addMolde)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({moldeMessage: 'error'})
    } else{
      const { newMolde } = data.data
      const moldes = [...this.state.moldes, newMolde ];
      this.setState({ moldes, moldeMessage: 'sucess'});
    }
  }

  updateMolde = async ({ _id, moldeNumber, moldeSerial, cavities, lifecycles, tcycles })=>{
    const input = { moldeNumber, moldeSerial, cavities, lifecycles, tcycles }
    modifyMolde.variables = { _id, input }
    opts.body = JSON.stringify(modifyMolde)
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
      this.setState({ moldes, programs: updatedPrograms, moldeMessage: 'sucess'});
    }
  }

  addMaterial = async ({ number, manufacturer, description, acronym, identification, type, unit, color })=>{
    const input = { number, manufacturer, description, acronym, identification, type, unit, color }
    addMaterial.variables = { input }
    opts.body = JSON.stringify(addMaterial)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({materialMessage: 'error'})
    } else{
      const { newMaterial } = data.data
      const materials = [...this.state.materials, newMaterial ];
      this.setState({ materials, materialMessage: 'sucess'});
    }

  }

  updateMaterial = async ({ _id, number, manufacturer, description, acronym, identification, type, color, unit })=>{
    const input = { number, manufacturer, description, acronym, identification, type, color, unit }
    modifyMaterial.variables = { _id, input }
    opts.body = JSON.stringify(modifyMaterial)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({materialMessage: 'error'})
    } else{
      let material = data.data.updateMaterial;
      let materials = [...this.state.materials];
      materials[materials.findIndex(el => el._id === material._id)] = material;
      this.setState({ materials, materialMessage: 'sucess'});
    }
  }

  addModel = async ({ partNumber, partName, family })=>{
    const input = { partNumber, partName, family }
    addModel.variables = { input }
    opts.body = JSON.stringify(addModel)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({modelMessage: 'error'})
    } else{
      const { newPartNumber } = data.data
      const models = [...this.state.models, newPartNumber ];
      this.setState({ models, modelMessage: 'sucess'});
    }
  }

  updateModel = async ({ _id, partNumber, partName, family })=>{
    const input = { partNumber, partName, family }
    modifyModel.variables = { _id, input }
    opts.body = JSON.stringify(modifyModel)
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
      this.setState({ models, programs: updatedPrograms, modelMessage: 'sucess'});
    }
  }

  addIssue = async ({ issueName, issueCode })=>{
    const input = { issueName, issueCode }
    addIssue.variables = { input }
    opts.body = JSON.stringify(addIssue)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
    this.setState({issueMessage: 'error'})
    } else{
      const { newIssue } = data.data
      const issues = [...this.state.issues, newIssue ];
      this.setState({ issues, issueMessage: 'sucess'});
    }
  }

  updateIssue = async ({ _id, issueName, issueCode })=>{
    const input = { issueName, issueCode }
    modifyIssue.variables = { _id, input }
    opts.body = JSON.stringify(modifyIssue)
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

  addDefect = async ({ defectName, defectCode, isInjection })=>{
    const input = { defectName, defectCode, isInjection }
    addDefect.variables = { input }
    opts.body = JSON.stringify(addDefect)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      console.log(data.errors)
      this.setState({defectMessage: 'error'})
    } else{
      const { newDefect } = data.data
      const defects = [...this.state.defects, newDefect ];
      this.setState({defects, defectMessage: 'sucess'});
    }
  }

  updateDefect = async ({ _id, defectName, defectCode, isInjection })=>{
    const input = { defectName, defectCode, isInjection }
    modifyDefect.variables = { _id, input }
    opts.body = JSON.stringify(modifyDefect)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      console.log(data.errors)
      this.setState({defectMessage: 'error'})
    } else{
      let defect = data.data.updateDefect;
      let defects = [...this.state.defects];
      defects[defects.findIndex(el => el._id === defect._id)] = defect;
      this.setState({defects: defects, defectMessage: 'sucess'});
    }
  }

  addProgram = async ({ machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity })=>{
    const input = { machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity }
    addProgram.variables = { input }
    opts.body = JSON.stringify(addProgram)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      this.setState({programMessage: 'error'})
    } else{
      const { newProgram } = data.data
      const programs = [...this.state.programs, newProgram];
      this.setState({programs, programMessage: 'sucess'});
    }
  }

  updateProgram = async ({ _id, machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity })=>{
    const input = { machineNumber, moldeNumber, partNumber, cycleTime, cycles, capacity }
    modifyProgram.variables = { _id, input }
    opts.body = JSON.stringify(modifyProgram)
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

  addReport = async ({ reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, userId, defects, resines, downtime })=>{
    const downtimeDetail = downtime
    const input = { reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE,
      production, userId, downtimeDetail, defects, resines }
    addReport.variables = { input }
    opts.body = JSON.stringify(addReport)
    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
      console.log('reporte', data)
      return this.setState({reportMessage: 'error'})
    } else{
      
      const reports = [ data.data.newInjectionReport, ...this.state.reports]
      const testArr = [data.data.newInjectionReport]
      const test = testArr.some(item => item.reportDate >= this.state.initial49 && item.reportDate <= this.state.end)
      if(test){
        const convert = testArr.map( item => { 
        const date = formatDate(item.reportDate);
        const id = item._id
        const shift = item.shift
        const machine = item.machine._id
        const production = item.production.map( prod =>{
          return { 
            report: id, 
            date: date,
            shift: shift, 
            machine: machine, 
            part: prod.partNumber._id, 
            molde: prod.molde._id,
            real: prod.real, 
            ng: prod.ng, 
            ok: prod.ok,
            plan: prod.plan,   
            wtime: prod.wtime,
            dtime: prod.dtime, 
            availability: prod.availability,
            performance: prod.performance, 
            quality: prod.quality,  
            oee: prod.oee
          }
        })
          return production
        })
        const convertDowntime = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine._id
          const shift = item.shift
          const downtime = item.downtimeDetail.map( downtime =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine, 
              issue: downtime.issueId._id, 
              issueName: downtime.issueId.issueName, 
              mins: downtime.mins 
            }
          })
          return downtime
        })
        const convertDefects = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine._id
          const shift = item.shift
          const defects = item.defects.map( defect =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine, 
              defect: defect.defect._id,
              defectCode: defect.defect.defectCode,
              defectName: defect.defect.defectName,
              partNumber: defect.partNumber._id,
              partName: defect.partNumber.partName,
              molde: defect.molde._id,
              moldeNumber: defect.molde.moldeNumber,
              defectPcs: defect.defectPcs 
            }
          })
          return defects
        })
        const convertResine = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine._id
          const shift = item.shift
          const resines = item.resines.map( resine =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine, 
              resine: resine.resine._id, 
              resineName: resine.resine.description, 
              purge: resine.purge,
              color: resine.resine.color,
              acronym: resine.resine.acronym
            }
          })
          return resines
        })

        const convertMolde = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const shift = item.shift
          const machine = item.machine._id
          const production = item.production.map( prod =>{
           
            return { 
              report: id, 
              date: date, 
              shift: shift, 
              machine: machine, 
              part: prod.partNumber._id,
              molde: prod.molde._id,
              real: prod.real,
              cycles: prod.cycles
               }
          })
            return production
        })
        
        
        const productionByDate= [...this.state.productionByDate, ...convert[0]]
        const downtimeByDate = [...this.state.downtimeByDate, ...convertDowntime[0]]
        const resinesByDate = [...this.state.resinesByDate, ...convertResine[0]]
        const defectsByDate = [...this.state.defectsByDate, ...convertDefects[0]]
        const cycles = [...this.state.cycles, ...convertMolde[0]]
        return this.setState({reports, productionByDate, cycles, defectsByDate, downtimeByDate, resinesByDate, reportMessage: 'sucess'});
      } 
      else{
        return this.setState({reports: reports, reportMessage: 'sucess'});
      }  
    }
  }

  updateReport = async ({ _id, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, defects, resines, downtime })=>{
    const downtimeDetail = downtime
    const input = { reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE,
      production, downtimeDetail, defects, resines }
    modifyReport.variables = { _id, input }
    opts.body = JSON.stringify(modifyReport)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
      return this.setState({reportMessage: 'error'})
    } 
    else{
      const report = data.data.updateInjectionReport;
      const oldReports = this.state.reports.filter( reports => reports._id !== report._id)
      const reports = [ report, ...oldReports]
      const testArr = [report]
      const test = testArr.some(item => item.reportDate >= this.state.initial49 && item.reportDate <= this.state.end)
      if(test){
        const convert = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const shift = item.shift
          const machine = item.machine._id
          const production = item.production.map( prod =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine, 
              part: prod.partNumber._id, 
              molde: prod.molde._id,
              real: prod.real, 
              ng: prod.ng, 
              ok: prod.ok,
              plan: prod.plan,   
              wtime: prod.wtime,
              dtime: prod.dtime, 
              availability: prod.availability,
              performance: prod.performance, 
              quality: prod.quality,  
              oee: prod.oee
            }
          })
            return production
          })
        const convertDowntime = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const shift = item.shift
          const machine = item.machine._id
          const downtime = item.downtimeDetail.map( downtime =>{
            return { report: id, date: date, shift, machine: machine, issue: downtime.issueId._id, issueName: downtime.issueId.issueName, mins: downtime.mins }
            })
            return downtime
          })
          const convertDefects = testArr.map( item => { 
            const date = formatDate(item.reportDate);
            const id = item._id
            const machine = item.machine._id
            const shift = item.shift
            const defects = item.defects.map( defect =>{
              return { 
                report: id, 
                date: date,
                shift: shift, 
                machine: machine, 
                defect: defect.defect._id,
                defectCode: defect.defect.defectCode,
                defectName: defect.defect.defectName,
                partNumber: defect.partNumber._id,
                partName: defect.partNumber.partName,
                molde: defect.molde._id,
                moldeNumber: defect.molde.moldeNumber,
                defectPcs: defect.defectPcs 
              }
            })
            return defects
          })  
        const convertResine = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine._id
          const shift = item.shift
          const resines = item.resines.map( resine =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine, 
              resine: resine.resine._id, 
              resineName: resine.resine.description, 
              purge: resine.purge,
              color: resine.resine.color,
              acronym: resine.resine.acronym
            }
          })
          return resines
        })

        const convertMolde = testArr.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const shift = item.shift
          const machine = item.machine._id
          const production = item.production.map( prod =>{
           
            return { 
              report: id, 
              date: date, 
              shift: shift, 
              machine: machine, 
              part: prod.partNumber._id,
              molde: prod.molde._id,
              real: prod.real,
              cycles: prod.cycles
               }
          })
            return production
        })

        const oldProductionByDate = this.state.productionByDate.filter( reportDate => reportDate.report !== report._id)
        const oldDowntimeByDate = this.state.downtimeByDate.filter( reportDate => reportDate.report !== report._id)
        const oldDefectsByDate = this.state.defectsByDate.filter( reportDate => reportDate.report !== report._id)
        const oldResinesByDate = this.state.resinesByDate.filter( reportDate => reportDate.report !== report._id)
        const oldCycles = this.state.cycles.filter( reportDate => reportDate.report !== report._id)
        const productionByDate= [...oldProductionByDate, ...convert[0]]
        const downtimeByDate = [...oldDowntimeByDate, ...convertDowntime[0]]
        const defectsByDate = [...oldDefectsByDate, ...convertDefects[0]]
        const resinesByDate = [...oldResinesByDate, ...convertResine[0]]
        const cycles = [...oldCycles, ...convertMolde[0]]
        return this.setState({reports, cycles, productionByDate, defectsByDate, downtimeByDate, resinesByDate, reportMessage: 'sucess'});
      } 
      else{
        return this.setState({reports: reports, reportMessage: 'sucess'});
      }
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className='NavBar'>
            <Toolbar logoutHandler={this.props.logoutHandler} name={this.props.name}/>
          </div>
          <div className="Content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/molds" exact component={ props => ( <Moldes {...props} cycles={this.state.cycles} moldes={this.state.moldes}/> )} /> 
              <Route path="/molds/add" exact component={ props => ( <AddMold {...props} 
                message={this.state.moldeMessage} close={this.close} addMolde={this.addMolde}/> )} 
              />
              <Route path="/molds/update/:id" exact component={ props => ( <UpdateMold {...props} 
                moldes={this.state.moldes} message={this.state.moldeMessage} close={this.close} updateMolde={this.updateMolde}/> )} 
              />

              <Route path="/material" exact component={ props => ( <Material {...props} material={this.state.materials}/> )} />
              <Route path="/material/add" exact component={ props => ( <AddMaterial {...props} 
                message={this.state.materialMessage} close={this.close} addMaterial={this.addMaterial}/> )} 
              />
              <Route path="/material/update/:id" exact component={ props => ( <UpdateMaterial {...props} 
                material={this.state.materials} message={this.state.materialMessage} close={this.close} updateMaterial={this.updateMaterial}/> )} 
              />

              <Route path="/machines" exact component={ props => ( <Machines {...props} machines={this.state.machines}/> )}  />
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
              
              <Route path="/defects" exact component={ props => ( <Defects {...props} defects={this.state.defects}/> )} />    
              <Route path="/defects/add" exact component={ props => ( <AddDefect {...props} 
                message={this.state.defectMessage} close={this.close} addDefect={this.addDefect}/> )} 
              />
              <Route path="/defects/update/:id" exact component={ props => ( <UpdateDefect {...props} 
                defects={this.state.defects} message={this.state.defectMessage} close={this.close} updateDefect={this.updateDefect}/> )} 
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
                defects={this.state.defects}
                programs={this.state.programs} 
                machines={this.state.machines}
                material={this.state.materials} 
                issues={this.state.issues}
                userId={this.props.userId}
                message={this.state.reportMessage} close={this.close} addReport={this.addReport}/> )} 
              />
              <Route path="/reports/update/:id" exact component={ props => ( <UpdateReport {...props}
                defects={this.state.defects}
                reports={this.state.reports} 
                programs={this.state.programs} 
                machines={this.state.machines}
                material={this.state.materials}  
                issues={this.state.issues}
                message={this.state.reportMessage} close={this.close} updateReport={this.updateReport}/> )} 
              />
              <Route path="/downtime" exact component={ props => ( <Downtime {...props}
              issues={this.state.issues}
              machines={this.state.machines}
              reports={this.state.downtimeByDate}
              /> )} />

              <Route path="/production" exact component={ props => ( <Production {...props}
              issues={this.state.issues}
              machines={this.state.machines}
              models={this.state.models}
              materials={this.state.materials}
              defects={this.state.defects}
              moldes={this.state.moldes}
              reports={this.state.reports}
              ng={this.state.defectsByDate}  
              downtime={this.state.downtimeByDate}
              production={this.state.productionByDate}
              purge={this.state.resinesByDate}
              /> )} />
              <Route path="/users" exact component={ props => ( <Users {...props}
              users={this.state.users}
              /> )} />

              <Route path="/users/add" exact component={ props => ( <AddUser {...props} 
                message={this.state.userMessage} close={this.close} addUser={this.addUser}/> )} 
              />
              <Route path="/users/update/:id" exact component={ props => ( <UpdateUser {...props} 
                users={this.state.users} message={this.state.userMessage} close={this.close} updateUser={this.updateUser}/> )} 
              />

              <Route path="/record" exact component={ props => ( <Record {...props} 
                /> )} 
              />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
