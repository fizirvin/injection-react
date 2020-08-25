const machinesReducer = (state = [], action) =>{
    if(action.type === 'FETCH_MACHINES'){
        return action.payload
    }
    else if(action.type === 'ADD_MACHINE'){
        return [...state, action.payload]
    }
    return state
}

const machineReducer = (selected = null, action) =>{
    if(action.type === 'SELECT_MACHINE'){
        return action.payload
    }
    return selected
}

export {
    machinesReducer, machineReducer
}