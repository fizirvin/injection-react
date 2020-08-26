import { combineReducers } from 'redux'
import { machinesReducer, machineReducer, machineMessage } from '../pages/Machines/reducers'

export default combineReducers({
    machines: machinesReducer,
    machine: machineReducer,
    machineMessage: machineMessage
})