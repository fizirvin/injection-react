import { combineReducers } from 'redux'
import { reducers as machines } from '../pages/Machines/index.js'
import { reducers as models } from '../pages/Parts/index.js'
import { reducers as moldes } from '../pages/Moldes/index.js'
import { reducers as issues } from '../pages/Issues/index.js'
import { reducers as defects } from '../pages/Defects/index.js'
import { reducers as materials } from '../pages/Materials/index.js'
import { reducers as programs } from '../pages/Programs/index.js'

export default combineReducers({
    machines: machines.machinesReducer,
    machine: machines.machineReducer,
    machineMessage: machines.machineMessage,
    models: models.modelsReducer,
    model: models.modelReducer,
    modelMessage: models.modelMessage,
    moldes: moldes.moldesReducer,
    cycles: moldes.cyclesReducer,
    molde: moldes.moldeReducer,
    moldeMessage: moldes.moldeMessage,
    issues: issues.issuesReducer,
    issue: issues.issueReducer,
    issueMessage: issues.issueMessage,
    defects: defects.defectsReducer,
    defect: defects.defectReducer,
    defectMessage: defects.defectMessage,
    materials: materials.materialsReducer,
    material: materials.materialReducer,
    materialMessage: materials.materialMessage,
    programs: programs.programsReducer,
    program: programs.programReducer,
    programMessage: programs.programMessage
})