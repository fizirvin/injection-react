import { combineReducers } from 'redux'
import { machinesReducer, machineReducer } from '../pages/Machines/reducers'

export default combineReducers({
    machines: machinesReducer,
    machine: machineReducer
})