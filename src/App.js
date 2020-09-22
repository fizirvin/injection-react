import React, {useEffect }from 'react';
import { connect } from 'react-redux'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Moldes, AddMolde, UpdateMolde, Machines, AddMachine, UpdateMachine, Material, AddMaterial, UpdateMaterial, Models, AddModel, UpdateModel, 
  Issues, AddIssue, UpdateIssue, AddDefect, UpdateDefect,  
  Defects, Programs, AddProgram, UpdateProgram, Reports, AddReport, UpdateReport, Toolbar, Production, Users, AddUser, 
  UpdateUser, Record, Workers, AddWorker, UpdateWorker, Cleanings, Calendar } from './pages'
import { fetchWorkers } from './pages/Workers/actions.js'
import { fetchDefects } from './pages/Defects/actions.js'
import { fetchInitialReports, updateReport, closeReport } from './pages/Reports/actions.js'
import { fetchPrograms } from './pages/Programs/actions.js'
import { fetchMachines } from './pages/Machines/actions.js'
import { fetchMaterials } from './pages/Materials/actions.js'
import { fetchModels } from './pages/Parts/actions.js'
import { fetchIssues } from './pages/Issues/actions.js'
import { fetchMoldes, fetchCycles } from './pages/Moldes/actions.js'

import './App.css';
import './styles/layout.css'
import './pages/Production/Production.css'
import './pages/Downtime.css'

const App = ({name, logoutHandler, userId, message, report,
  moldesList,
  cyclesList,
  reportsList,
  programsList,
  profilesList,
  defectsList,
  issuesList,
  materialsList,
  machinesList,
  modelsList,
  fetchWorkers,
  fetchDefects,
  fetchInitialReports,  
  fetchPrograms, 
  fetchMachines, 
  fetchMaterials, 
  fetchIssues,
  fetchModels,
  fetchMoldes, 
  fetchCycles,
  updateReport, 
  closeReport}) =>{

    useEffect(() =>{
      if(moldesList.length === 0){
        
        fetchMoldes()
      } 
    },[moldesList])
  
    useEffect(() =>{
      if(cyclesList.length === 0){
        
        fetchCycles()
      } 
    },[cyclesList])

    useEffect(() =>{
      if(reportsList.length === 0){
        
        fetchInitialReports()
      } 
    },[reportsList])

    useEffect(() =>{
      if(modelsList.length === 0){
       
        fetchModels()
      } 
    },[modelsList])

    useEffect(() =>{
      if(issuesList.length === 0){
        fetchIssues()
      } 
    },[issuesList])
  
    useEffect(() =>{
      if(materialsList.length === 0){
        fetchMaterials()
      } 
    },[materialsList])
  
    useEffect(() =>{
      if(machinesList.length === 0){
        fetchMachines()
      } 
    },[machinesList])
  
    useEffect(() =>{
      if(programsList.length === 0){
        fetchPrograms()
      } 
    },[programsList])
  
    useEffect(() =>{
      if(profilesList.length === 0){
        fetchWorkers()
      } 
    },[profilesList])
  
    useEffect(() =>{
      if(defectsList.length === 0){
        fetchDefects()
      } 
    },[defectsList])
  return (
    <BrowserRouter>
      <div className="App">
        <div className='NavBar'>
          <Toolbar logoutHandler={logoutHandler} name={name}/>
        </div>
        <div className="Content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/molds" exact component={ props => ( <Moldes {...props}/> )} /> 
            <Route path="/molds/add" exact component={ props => ( <AddMolde {...props} /> )} />
            <Route path="/molds/update/:id" exact component={ props => ( <UpdateMolde {...props} /> )} />

            <Route path="/calendar" exact component={ props => ( <Calendar {...props}/> )} /> 

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
            <Route path="/reports" exact component={ props => ( <Reports {...props}/> )} />
            <Route path="/reports/add" exact component={ props => ( <AddReport {...props} userId={userId}/> )} />
            
            
            <Route path="/reports/update/:id" exact component={ props => ( <UpdateReport {...props}
            report={report}
              profiles={profilesList}
              defects={defectsList}
              reports={reportsList} 
              programs={programsList} 
              machines={machinesList}
              material={materialsList}  
              issues={issuesList}
              message={message} close={closeReport} updateReport={updateReport}
              /> )} 
            />
            
            <Route path="/users" exact component={ props => ( <Users {...props}/> )} />
            <Route path="/users/add" exact component={ props => ( <AddUser {...props} /> )} />
            <Route path="/users/update/:id" exact component={ props => ( <UpdateUser {...props} /> )} />

            <Route path="/record" exact component={ props => ( <Record {...props} /> )} />
            <Route path="/employees" exact component={ props => ( <Workers {...props} /> )} />
            <Route path="/employees/new" exact component={ props => ( <AddWorker {...props} /> )} />
            <Route path="/employees/update/:id" exact component={ props => ( <UpdateWorker {...props} /> )} />
            <Route path="/production" exact component={ props => ( <Production {...props} /> )} />

            <Route path="/shots" exact component={ props => ( <Cleanings {...props} /> )} />
          </Switch> 
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = state =>({
  profilesList: state.profiles,
  defectsList: state.defects,
  reportsList: state.reports,
  programsList: state.programs,
  machinesList: state.machines,
  materialsList: state.materials,
  modelsList: state.models,
  moldesList: state.moldes,
  cyclesList: state.cycles,
  issuesList: state.issues,
  message: state.reportMessage,
  reportsList: state.reports,
  report: state.report
})

export default connect(mapStateToProps, {
  fetchWorkers,
  fetchDefects,
  fetchInitialReports,  
  fetchPrograms, 
  fetchMachines, 
  fetchMaterials, 
  fetchIssues,
  fetchModels,
  fetchMoldes, 
  fetchCycles,
  updateReport, 
  closeReport
})(App)
