import Home from './Home.js'
import Toolbar from './Toolbar.js'

import Moldes, { AddMolde, UpdateMolde }from './Moldes/index.js'
import Machines, { AddMachine, UpdateMachine } from './Machines'
import Material, { AddMaterial, UpdateMaterial } from './Materials/index.js'
import Models, { AddModel, UpdateModel } from './Parts'
import Issues, { AddIssue, UpdateIssue } from './Issues/index.js'
import Defects, { AddDefect, UpdateDefect } from './Defects/index.js'
import Programs, { AddProgram, UpdateProgram } from './Programs/index.js'
import Users, { AddUser, UpdateUser } from './Users/index.js'
import Workers, { AddWorker, UpdateWorker } from './Workers/index.js'

import Record from './Record.js'
import Production from './Production/index.js'
import Reports from './Reports/Reports.jsx'

export { 
    Home, 
    Moldes,
    AddMolde,
    UpdateMolde,  
    Material,
    AddMaterial,
    UpdateMaterial,
    Models,
    AddModel,
    UpdateModel,
    Issues,
    AddIssue,
    UpdateIssue, 
    Defects,
    AddDefect,
    UpdateDefect,
    Programs,
    AddProgram, 
    UpdateProgram,
     
    Reports, 
    Toolbar, 
    
    
    Users,
    AddUser,
    UpdateUser,

    Record,

    Workers,
    AddWorker,
    UpdateWorker,

    Production,

    Machines,
    AddMachine,
    UpdateMachine
} 
