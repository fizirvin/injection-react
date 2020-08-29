import {
    FETCH_WORKERS,
    ADD_WORKER,
    UPDATE_WORKER,
    SELECT_WORKER,
    MESSAGE_WORKER,
} from './actions'

const workersReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_WORKERS:
            return action.payload
        case ADD_WORKER:
            return [ ...state, action.payload ]
        case UPDATE_WORKER:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const workerMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_WORKER){
        return action.payload
    }
    return message
}

const workerReducer = (selected = null, action) =>{
    if(action.type === SELECT_WORKER){
        return action.payload
    }
    return selected
}

export {
    workersReducer, 
    workerReducer,
    workerMessage
}