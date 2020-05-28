import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home.js'
import Moldes from './pages/Moldes.js'
import AddMold from './pages/forms/AddMold.js'
import UpdateMold from './pages/forms/UpdateMold.js'
import Machines from './pages/Machines.js'
import AddMachine from './pages/forms/AddMachine.js'
import UpdateMachine from './pages/forms/UpdateMachine.js'
import Material from './pages/Material.js'
import AddMaterial from './pages/forms/AddMaterial.js'
import UpdateMaterial from './pages/forms/UpdateMaterial.js'
import Models from './pages/Models.js'
import AddModel from './pages/forms/AddModel.js'
import UpdateModel from './pages/forms/UpdateModel.js'
import Issues from './pages/Issues.js'
import AddIssue from './pages/forms/AddIssue.js'
import UpdateIssue from './pages/forms/UpdateIssue.js'
import Defects from './pages/Defects.js'
import AddDefect from './pages/forms/AddDefect.js'
import UpdateDefect from './pages/forms/UpdateDefect.js'
import Programs from './pages/Programs.js'
import AddProgram from './pages/forms/AddProgram.js'
import UpdateProgram from './pages/forms/UpdateProgram.js'
import Reports from './pages/Reports.js'
import AddReport from './pages/forms/AddReport.js'
import UpdateReport from './pages/forms/UpdateReport.js'
import Toolbar from './pages/Toolbar.js'
import Production from './pages/Production.js'
import Downtime from './pages/Downtime.js'



import './App.css';
import './pages/Programs.css'
import './pages/Moldes.css'
import './pages/Material.css'
import './pages/Models.css'
import './pages/Machines.css'
import './pages/Defect.css'
import './pages/Issues.css'
import './pages/Reports.css'
import './pages/Production.css'
import './pages/Downtime.css'


class App extends React.Component {
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
    moldes: [],
    materials: [],
    models: [],
    issues: [],
    defects: [],
    programs: [],
    reports: [],
    downtimeByDate: [],
    productionByDate: [],
    resinesByDate: [],
    initial49:'',
    end:'',
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

  todayIs(date){
    const today = date
    const dayOfWeek = today.getDay()
    let day;
    switch (dayOfWeek) {
      case 0:
        day = 7;
        break;
      case 1:
        day = 1;
        break;
      case 2:
         day = 2;
        break;
      case 3:
        day = 3;
        break;
      case 4:
        day = 4;
        break;
      case 5:
        day = 5;
        break;
      case 6:
        day = 6;
    }
    return day
  }
  

  getDateofTable = (number, aDate)=>{
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - this.todayIs(today);
    const set = dayOfMonth + difference;
    const date= today.setDate(set);
    
    return this.formatDate(date)
  }

  getDateofTable49 = (number, aDate)=>{
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - this.todayIs(today);
    const set = dayOfMonth + difference;
    const set2= set - 50
    const date= today.setDate(set2);
    
    return this.formatDate(date)
  }


  async componentDidMount(){

    const date = new Date();
    const today = this.formatDate(date)+'T00:00:00.000-06:00'
    // const initial = this.getDateofTable(1, today);
    const end = this.getDateofTable(7, today);
    const initial49 = this.getDateofTable49(1, today);
    

    const query = `query{
      machines{
        _id
        machineNumber
        machineSerial
        closingForce
        spindleDiameter
      } 
      moldes{
        _id
        moldeNumber
        moldeSerial
        cavities
      }
      materials{
        _id
        number
        manufacturer
        description
        acronym
        identification
        type
        unit
      } 
      parts {
        _id
        partNumber
        partName
        family
      }
      issues{
        _id
        issueName
        issueCode
      }
      defects{
        _id
        defectName
        defectCode
        isInjection
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
          cavities
        }
        partNumber{
          _id
          partNumber
          partName
          family
        }
        cycleTime
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
        TReal
        TNG
        TOK
        TPlan
        TWTime
        TDTime
        TAvailability
        TPerformance
        TQuality
        TOEE
        production{
          _id
          program{
            _id
          }
          real
          ng
          ok
          plan
          wtime
          dtime
          availability
          performance
          quality
          oee
          partNumber {
            _id
            partNumber
            partName
            family
          }
          molde{
            _id
            moldeNumber
            moldeSerial
            cavities
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
        resines {
          _id
          resine{
            _id
            description
          }
          purge
        }
        defects{
          _id
          defect{
            _id
            defectName
            defectCode
          }
          defectPcs
          molde{
            _id
            moldeNumber
          }
          partNumber{
            _id
            partNumber
            partName
            family
          }
          program{
            _id
          }
        }
      }
      productionByDate(initial: "${initial49}T00:00:01.000+00:00", end: "${end}T23:59:59.000+00:00"){
        report
        date
        machine
        shift
        part
        molde
        real
        ng
        ok
        plan
        wtime
        dtime
        availability
        performance
        quality
        oee
      }
      downtimeByDate(initial: "${initial49}T00:00:01.000+00:00", end: "${end}T23:59:59.000+00:00"){
        report
        date
        shift
        machine
        issue
        issueName
        mins
      }
      resinesByDate(initial: "${initial49}T00:00:01.000+00:00", end: "${end}T23:59:59.000+00:00"){
        report
        date
        shift
        machine
        resine
        resineName
        purge
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
    console.log('holalalala', data)
    this.setState({ 
      machines: data.data.machines,
      materials: data.data.materials, 
      moldes: data.data.moldes, 
      models: data.data.parts, 
      issues: data.data.issues,
      defects: data.data.defects,
      programs: data.data.programs,
      reports: data.data.reports,
      productionByDate: data.data.productionByDate,
      downtimeByDate: data.data.downtimeByDate,
      resinesByDate: data.data.resinesByDate,
      initial49: initial49,
      end: end
    })
  }

  close = (message) =>{
    this.setState({[message]: 'new'})
  }

  addMachine = async (newMachine)=>{

    const query = `mutation{newMachine(input:{
      machineNumber: "${newMachine.machineNumber}"
      machineSerial: "${newMachine.machineSerial}"
      closingForce: ${newMachine.closingForce}
      spindleDiameter: ${newMachine.spindleDiameter}
    }) {
      _id
      machineNumber
      machineSerial
      closingForce
      spindleDiameter
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
      closingForce: ${updateMachine.closingForce}
      spindleDiameter: ${updateMachine.spindleDiameter}
    }) {
      _id
      machineNumber
      machineSerial
      closingForce
      spindleDiameter
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
      cavities: ${newMolde.cavities}
    }) {
      _id
      moldeNumber
      moldeSerial
      cavities
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
      cavities: ${updateMolde.cavities}
    }) {
      _id
      moldeNumber
      moldeSerial
      cavities
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

  addMaterial = async (newMaterial)=>{

    const query = `mutation{newMaterial(input:{
      number: "${newMaterial.number}"
      manufacturer: "${newMaterial.manufacturer}"
      description: "${newMaterial.description}"
      acronym: "${newMaterial.acronym}"
      identification: "${newMaterial.identification}"
      type: "${newMaterial.type}"
      unit: "${newMaterial.unit}"
    }) {
      _id
      number
      manufacturer
      description
      acronym
      identification
      type
      unit
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
    
    this.setState({materialMessage: 'error'})
    } else{
      let materials = [...this.state.materials];
      materials.push(data.data.newMaterial);
      this.setState({materials: materials, materialMessage: 'sucess'});
    }

  }

  updateMaterial = async (updateMaterial)=>{

    const query = `mutation{updateMaterial(_id: "${updateMaterial._id}", input:{
      number: "${updateMaterial.number}"
      manufacturer: "${updateMaterial.manufacturer}"
      description: "${updateMaterial.description}"
      acronym: "${updateMaterial.acronym}"
      identification: "${updateMaterial.identification}"
      type: "${updateMaterial.type}"
      unit: "${updateMaterial.unit}"
    }) {
      _id
      number
      manufacturer
      description
      acronym
      identification
      type
      unit
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
    
    this.setState({materialMessage: 'error'})
    } else{
      let material = data.data.updateMaterial;
      let materials = [...this.state.materials];
      materials[materials.findIndex(el => el._id === material._id)] = material;
      this.setState({materials: materials, materialMessage: 'sucess'});
    }

  }

  addModel = async (newModel)=>{

    const query = `mutation{newPartNumber(input:{
      partNumber: "${newModel.partNumber}"
      partName: "${newModel.partName}"
      family: "${newModel.family}"
    }) {
      _id
      partNumber
      partName
      family
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
      partName: "${updateModel.partName}"
      family: "${updateModel.family}"
    }) {
      _id
      partNumber
      partName
      family
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
      issueCode: "${newIssue.issueCode}"
    }) {
      _id
      issueName
      issueCode
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
      issueCode: "${updateIssue.issueCode}"
    }) {
      _id
      issueName
      issueCode
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

  addDefect = async (newDefect)=>{
    
    const query = `mutation{newDefect(input:{
      defectName: "${newDefect.defectName}"
      defectCode: "${newDefect.defectCode}"
      isInjection: ${newDefect.isInjection}
    }) {
      _id
      defectName
      defectCode
      isInjection
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
    
    this.setState({defectMessage: 'error'})
    } else{
      let defects = [...this.state.defects];
      defects.push(data.data.newDefect);
      this.setState({defects: defects, defectMessage: 'sucess'});
    }

  }

  updateDefect = async (updateDefect)=>{

    const query = `mutation{updateDefect(_id: "${updateDefect._id}", input:{
      defectName: "${updateDefect.defectName}"
      defectCode: "${updateDefect.defectCode}"
      isInjection: ${updateDefect.isInjection}
    }) {
      _id
      defectName
      defectCode
      isInjection
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
    
    this.setState({defectMessage: 'error'})
    } else{
      let defect = data.data.updateDefect;
      let defects = [...this.state.defects];
      defects[defects.findIndex(el => el._id === defect._id)] = defect;
      this.setState({defects: defects, defectMessage: 'sucess'});
    }

  }

  addProgram = async (program)=>{

    const query = `mutation{newProgram(input:{
      machineNumber: "${program.machine}"
      moldeNumber: "${program.molde}"
      partNumber: "${program.model}"
      cycleTime: ${program.cycleTime}
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
      cavities
    }
    partNumber {
      _id
      partNumber
      partName

    }
    cycleTime
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
      cycleTime: ${program.cycleTime} 
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
      cavities
    }
    partNumber {
      _id
      partNumber
      partName

    }
    cycleTime
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

    const { reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, defects, resines, downtime  } = report;
    const downtimeDetail = downtime
    
    const query = `mutation NewInjectionReport($input: NewInjectionReport ){
      newInjectionReport(input: $input){
        _id
        reportDate
        shift
        machine{
          _id
          machineNumber
          machineSerial
        }
        TReal
        TOK
        TNG
        TPlan
        TWTime
        TDTime
        TAvailability
        TPerformance
        TQuality
        TOEE
        production{
          _id
          real
          ng
          ok
          plan
          wtime
          dtime
          availability
          performance
          quality
          oee
          program {
            _id
          }
          partNumber {
            _id
            partNumber
            partName
          }
          molde{
            _id
            moldeNumber
            moldeSerial
            cavities
          }
        }
        resines {
          _id
          resine{
            _id
            description
          }
          purge
        }
        downtimeDetail {
          _id
          issueId{
            _id
            issueName
          }
          mins
        }
        defects{
          _id
          defect{
            _id
            defectName
          }
          defectPcs
          molde{
            _id
            moldeNumber
          }
          partNumber{
            _id
            partNumber
            partName
          }
          program{
            _id
          }
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
            TReal,
            TNG, 
            TOK,
            TPlan,
            TWTime, 
            TDTime,
            TAvailability,
            TPerformance,
            TQuality,
            TOEE,
            production,
            downtimeDetail,
            defects,
            resines
          }
        } })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    
    return this.setState({reportMessage: 'error'})
    } else{
      const reports = [ data.data.newInjectionReport, ...this.state.reports]
    
      const testArr = [data.data.newInjectionReport]
      const test = testArr.some(item => item.reportDate >= this.state.initial49 && item.reportDate <= this.state.end)
      if(test){
        const convert = testArr.map( item => { 
        const date = this.formatDate(item.reportDate);
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
          const date = this.formatDate(item.reportDate);
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

        const convertResine = testArr.map( item => { 
          const date = this.formatDate(item.reportDate);
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
              purge: resine.purge
            }
          })
          return resines
        })
          
        const productionByDate= [...this.state.productionByDate, ...convert[0]]
        const downtimeByDate = [...this.state.downtimeByDate, ...convertDowntime[0]]
        const resinesByDate = [...this.state.resinesByDate, ...convertResine[0]]

        return this.setState({reports, productionByDate, productionByDate, downtimeByDate, resinesByDate, reportMessage: 'sucess'});
      } 
      else{
        return this.setState({reports: reports, reportMessage: 'sucess'});
      }  
    }
  }

  updateReport = async (report)=>{
    const { _id, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, defects, resines, downtime  } = report;
    const downtimeDetail = downtime
    const query = `mutation UpdateInjectionReport($_id: ID, $input: NewInjectionReport ){
      updateInjectionReport(_id: $_id, input: $input){
        _id
          reportDate
          shift
          machine{
            _id
            machineNumber
            machineSerial
          }
          TReal
          TOK
          TNG
          TPlan
          TWTime
          TDTime
          TAvailability
          TPerformance
          TQuality
          TOEE
          production{
            _id
            real
            ng
            ok
            plan
            wtime
            dtime
            availability
            performance
            quality
            oee
            program {
              _id
            }
            partNumber {
              _id
              partNumber
              partName
              family
            }
            molde{
              _id
              moldeNumber
              moldeSerial
              cavities
            }
          }
          resines {
            _id
            resine{
              _id
              description
            }
            purge
          }
          downtimeDetail {
            _id
            issueId{
              _id
              issueName
            }
            mins
          }
          defects{
            _id
            defect{
              _id
              defectName
            }
            defectPcs
            molde{
              _id
              moldeNumber
            }
            partNumber{
              _id
              partNumber
              partName
              family
            }
            program{
              _id
            }
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
          TReal,
          TNG, 
          TOK,
          TPlan,
          TWTime, 
          TDTime,
          TAvailability,
          TPerformance,
          TQuality,
          TOEE,
          production,
          downtimeDetail,
          defects,
          resines
        }
      }})
    };
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
          const date = this.formatDate(item.reportDate);
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
          const date = this.formatDate(item.reportDate);
          const id = item._id
          const shift = item.shift
          const machine = item.machine._id
          const downtime = item.downtimeDetail.map( downtime =>{
            return { report: id, date: date, shift, machine: machine, issue: downtime.issueId._id, issueName: downtime.issueId.issueName, mins: downtime.mins }
            })
            return downtime
          })

        const convertResine = testArr.map( item => { 
          const date = this.formatDate(item.reportDate);
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
              purge: resine.purge
            }
          })
          return resines
        })

        const oldProductionByDate = this.state.productionByDate.filter( reportDate => reportDate.report !== report._id)
        const oldDowntimeByDate = this.state.downtimeByDate.filter( reportDate => reportDate.report !== report._id)
        const oldResinesByDate = this.state.resinesByDate.filter( reportDate => reportDate.report !== report._id)

        const productionByDate= [...oldProductionByDate, ...convert[0]]
        const downtimeByDate = [...oldDowntimeByDate, ...convertDowntime[0]]
        const resinesByDate = [...oldResinesByDate, ...convertResine[0]]
          
        return this.setState({reports, productionByDate, productionByDate, downtimeByDate, resinesByDate, reportMessage: 'sucess'});
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
            <Toolbar></Toolbar>
          </div>
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

              <Route path="/material" exact component={ props => ( <Material {...props} material={this.state.materials}/> )} />
              <Route path="/material/add" exact component={ props => ( <AddMaterial {...props} 
                message={this.state.materialMessage} close={this.close} addMaterial={this.addMaterial}/> )} 
              />
              <Route path="/material/update/:id" exact component={ props => ( <UpdateMaterial {...props} 
                material={this.state.materials} message={this.state.materialMessage} close={this.close} updateMaterial={this.updateMaterial}/> )} 
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
              {/* <Route path="/efficiency" exact component={ props => ( <Production {...props} 
              models={this.state.models} 
              machines={this.state.machines}
              moldes={this.state.moldes}  
              reportsDate={this.state.reportsDate} 
              initial49={this.state.initial49}
              end={this.state.end}
              /> )} /> */}
              <Route path="/downtime" exact component={ props => ( <Downtime {...props}
              issues={this.state.issues}
              machines={this.state.machines}
              reports={this.state.downtimeByDate}
              /> )} />

              <Route path="/production" exact component={ props => ( <Production {...props}
              issues={this.state.issues}
              machines={this.state.machines}
              models={this.state.models}
              moldes={this.state.moldes}
              reports={this.state.reports}  
              downtime={this.state.downtimeByDate}
              production={this.state.productionByDate}
              purge={this.state.resinesByDate}
              /> )} />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
