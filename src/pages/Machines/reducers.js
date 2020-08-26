import {
    FETCH_MACHINES,
    ADD_MACHINE,
    UPDATE_MACHINE,
    SELECT_MACHINE,
    MACHINE_MESSAGE,
} from './actions'

const machinesReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_MACHINES:
            return action.payload
        case ADD_MACHINE:
            return [ ...state, action.payload ]
        case UPDATE_MACHINE:
            const machine = action.payload
            let machines = [...state]
            machines[machines.findIndex(el => el._id === machine._id)] = machine;
            return machines
        default:
            return state
    }
} 

const machineMessage = ( message = 'new', action) =>{
    if(action.type === MACHINE_MESSAGE){
        return action.payload
    }
    return message
}

const machineReducer = (selected = null, action) =>{
    if(action.type === SELECT_MACHINE){
        return action.payload
    }
    return selected
}

export {
    machinesReducer, 
    machineReducer,
    machineMessage
}