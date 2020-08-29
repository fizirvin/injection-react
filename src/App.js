import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Moldes, AddMolde, UpdateMolde, Machines, AddMachine, UpdateMachine, Material, AddMaterial, UpdateMaterial, Models, AddModel, UpdateModel, 
  Issues, AddIssue, UpdateIssue, AddDefect, UpdateDefect,  
  Defects, Programs, AddProgram, UpdateProgram, Reports, Toolbar, Production, Downtime, Users, AddUser, 
  UpdateUser, Record, Workers, AddWorker, UpdateWorker, Product } from './pages'
import { AddReport, UpdateReport } from './forms';
import { initialQuery, reportsQuery } from './actions/queries'
import { addReport, modifyReport  } from './actions/mutations'
import { getDateofTable, getDateofTable49, formatDate } from './actions/helpers'
import { url, opts, hr_server, hr_opts } from './actions/config'
import './App.css';
import './pages/styles/layout.css'
import './pages/Production.css'
import './pages/Downtime.css'

class App extends Component {
  state = {
    reportMessage: 'new',
    userMessage: 'new',
    reports: [],
    totalReports: 0,
    reportsPage: 1,
    add: 0,
    downtimeByDate: [],
    defectsByDate: [],
    productionByDate: [],
    resinesByDate: [],
    users: [],
    initial49:'',
    end:'',
    loadingPage: false
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
    
    if(data.errors ){
      return console.log(data.errors)
    }
    else {
      console.log('holalalala', data)
      return this.setState({  

        reports: data.data.reports.reports,
        totalReports: data.data.reports.totalReports,
        productionByDate: data.data.productionByDate,
        downtimeByDate: data.data.downtimeByDate,
        defectsByDate: data.data.defectsByDate,
        resinesByDate: data.data.resinesByDate,
        users: data.data.users,
        initial49: initial49,
        end: end
      })

    }
  }

  close = message => this.setState({[message]: 'new'});

  loadReports = async (direction) =>{
    let page = this.state.reportsPage;
    if (direction === 'next') {
      page++;
      this.setState({ reportsPage: page, loadingPage: true });
    }
    const add = this.state.add
    reportsQuery.variables = { page, add }
    opts.body = JSON.stringify(reportsQuery)

    const res = await fetch( url, opts );
    const data = await res.json();
    if(data.errors){
      console.log(data.errors)
      return
    } else {
      const newReports = data.data.reports.reports
      const reports = [...this.state.reports, ...newReports ]
      const totalReports = data.data.reports.totalReports
      return this.setState({reports, totalReports, loadingPage: false})
    }
  }

  addReport = async ({ workers, comments, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TProd, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, userId, defects, resines, downtime })=>{
    const downtimeDetail = downtime
    const input = { reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TProd, TDTime, TAvailability, TPerformance, TQuality, TOEE,
      production, userId, downtimeDetail, defects, resines, workers, comments }
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
        const machineNumber = item.machine.machineNumber
        const production = item.production.map( prod =>{
          return { 
            report: id, 
            date: date,
            shift: shift, 
            machine: machine,
            machineNumber: machineNumber, 
            part: prod.partNumber._id,
            partName: prod.partNumber.partName, 
            molde: prod.molde._id,
            moldeNumber: prod.molde.moldeNumber,
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
              issueCode: downtime.issueId.issueCode,  
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
        const totalReports = this.state.totalReports + 1
        const add = this.state.add + 1
        return this.setState({reports, add, productionByDate, totalReports, cycles, defectsByDate, downtimeByDate, resinesByDate, reportMessage: 'sucess'});
      } 
      else{
        return this.setState({reports: reports, reportMessage: 'sucess'});
      }  
    }
  }

  updateReport = async ({ _id, workers, comments, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TProd, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, defects, resines, downtime })=>{
    const downtimeDetail = downtime
    const input = { workers, comments, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TProd, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE,
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
          const machineNumber = item.machine.machineNumber
          const production = item.production.map( prod =>{
            return { 
              report: id, 
              date: date,
              shift: shift, 
              machine: machine,
              machineNumber: machineNumber, 
              part: prod.partNumber._id, 
              partName: prod.partNumber.partName, 
              molde: prod.molde._id,
              moldeNumber: prod.molde.moldeNumber,
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
            return { 
              report: id, 
              date: date, 
              shift, 
              machine: machine, 
              issue: downtime.issueId._id, 
              issueName: downtime.issueId.issueName,
              issueCode: downtime.issueId.issueCode, 
              mins: downtime.mins }
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
              <Route path="/molds" exact component={ props => ( <Moldes {...props}/> )} /> 
              <Route path="/molds/add" exact component={ props => ( <AddMolde {...props} /> )} />
              <Route path="/molds/update/:id" exact component={ props => ( <UpdateMolde {...props} /> )} />

              <Route path="/material" exact component={ props => ( <Material {...props} /> )} />
              <Route path="/material/add" exact component={ props => ( <AddMaterial {...props} /> )} />
              <Route path="/material/update/:id" exact component={ props => ( <UpdateMaterial {...props} /> )} />

              <Route path="/machines" exact component={ props => ( <Machines {...props}/> )}/>
              <Route path="/machines/add" exact component={ props => ( <AddMachine {...props}/> )}/>
              <Route path="/machines/update/:id" exact component={ props => ( <UpdateMachine {...props}/> )}/>
              
              <Route path="/models" exact component={ props => ( <Models {...props} /> )} /> 
              <Route path="/models/add" exact component={ props => ( <AddModel {...props}/> )} />
              <Route path="/models/update/:id" exact component={ props => ( <UpdateModel {...props}/> )} />
              
              <Route path="/issues" exact component={ props => ( <Issues {...props}/> )} />
              <Route path="/issues/add" exact component={ props => ( <AddIssue {...props}/> )} />
              <Route path="/issues/update/:id" exact component={ props => ( <UpdateIssue {...props}/> )} />
              
              <Route path="/defects" exact component={ props => ( <Defects {...props} /> )} />    
              <Route path="/defects/add" exact component={ props => ( <AddDefect {...props} /> )} />
              <Route path="/defects/update/:id" exact component={ props => ( <UpdateDefect {...props} /> )} />      

              <Route path="/programs" exact component={ props => ( <Programs {...props} /> )} />
              <Route path="/programs/add" exact component={ props => ( <AddProgram {...props} /> )} />
              <Route path="/programs/update/:id" exact component={ props => ( <UpdateProgram {...props} /> )} />

              <Route path="/reports" exact component={ props => ( <Reports {...props}
                loadingPage={this.state.loadingPage}
                onNext={ () => this.loadReports('next')}
                reportsPage={this.state.reportsPage} 
                totalReports={this.state.totalReports} 
                reports={this.state.reports}/> )} 
              />
              <Route path="/reports/add" exact component={ props => ( <AddReport {...props}
                profiles={this.state.profiles}
                defects={this.state.defects}
                programs={this.state.programs} 
                machines={this.state.machines}
                material={this.state.materials} 
                issues={this.state.issues}
                userId={this.props.userId}
                message={this.state.reportMessage} close={this.close} addReport={this.addReport}/> )} 
              />
              <Route path="/reports/update/:id" exact component={ props => ( <UpdateReport {...props}
                profiles={this.state.profiles}
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

              <Route path="/product" exact component={ props => ( <Production {...props}
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
              <Route path="/users" exact component={ props => ( <Users {...props}/> )} />
              <Route path="/users/add" exact component={ props => ( <AddUser {...props} /> )} />
              <Route path="/users/update/:id" exact component={ props => ( <UpdateUser {...props} /> )} />

              <Route path="/record" exact component={ props => ( <Record {...props} /> )} />
              <Route path="/employees" exact component={ props => ( <Workers {...props} /> )} />
              <Route path="/employees/new" exact component={ props => ( <AddWorker {...props} /> )} />
              <Route path="/employees/update/:id" exact component={ props => ( <UpdateWorker {...props} /> )} />
              <Route path="/production" exact component={ props => ( <Product {...props}
                production={this.state.productionByDate}
                purge={this.state.resinesByDate}
                defects={this.state.defectsByDate}
                downtime={this.state.downtimeByDate}
                machines={this.state.machines}
              /> )} />
            </Switch> 
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
