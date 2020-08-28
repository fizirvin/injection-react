import {
    FETCH_PROGRAMS,
    ADD_PROGRAM,
    UPDATE_PROGRAM,
    SELECT_PROGRAM,
    MESSAGE_PROGRAM,
} from './actions'

const programsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_PROGRAMS:
            return action.payload
        case ADD_PROGRAM:
            return [ ...state, action.payload ]
        case UPDATE_PROGRAM:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const programMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_PROGRAM){
        return action.payload
    }
    return message
}

const programReducer = (selected = null, action) =>{
    if(action.type === SELECT_PROGRAM){
        return action.payload
    }
    return selected
}

export {
    programsReducer, 
    programReducer,
    programMessage
}