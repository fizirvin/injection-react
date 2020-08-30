import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Moldes, AddMolde, UpdateMolde, Machines, AddMachine, UpdateMachine, Material, AddMaterial, UpdateMaterial, Models, AddModel, UpdateModel, 
  Issues, AddIssue, UpdateIssue, AddDefect, UpdateDefect,  
  Defects, Programs, AddProgram, UpdateProgram, Reports, Toolbar, Production, Downtime, Users, AddUser, 
  UpdateUser, Record, Workers, AddWorker, UpdateWorker, Product } from './pages'
import { AddReport, UpdateReport } from './forms';

import './App.css';
import './pages/styles/layout.css'
import './pages/Production.css'
import './pages/Downtime.css'

const App = ({name, logoutHandler}) =>{
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

export default App;
