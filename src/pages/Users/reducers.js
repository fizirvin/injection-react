import {
    FETCH_USERS,
    ADD_USER,
    UPDATE_USER,
    SELECT_USER,
    MESSAGE_USER,
} from './actions'

const usersReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_USERS:
            return action.payload
        case ADD_USER:
            return [ ...state, action.payload ]
        case UPDATE_USER:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const userMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_USER){
        return action.payload
    }
    return message
}

const userReducer = (selected = null, action) =>{
    if(action.type === SELECT_USER){
        return action.payload
    }
    return selected
}

export {
    usersReducer, 
    userReducer,
    userMessage
}