import { combineReducers } from 'redux'
import { reducers as machines } from '../pages/Machines/index.js'
import { reducers as models } from '../pages/Parts/index.js'

export default combineReducers({
    machines: machines.machinesReducer,
    machine: machines.machineReducer,
    machineMessage: machines.machineMessage,
    models: models.modelsReducer,
    model: models.modelReducer,
    modelMessage: models.modelMessage
})