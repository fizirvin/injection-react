import {
    FETCH_MOLDES,
    FETCH_CYCLES_MOLDES,
    ADD_MOLDE,
    UPDATE_MOLDE,
    SELECT_MOLDE,
    MESSAGE_MOLDE,
} from './actions'

const moldesReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_MOLDES:
            return action.payload
        case ADD_MOLDE:
            return [ ...state, action.payload ]
        case UPDATE_MOLDE:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const cyclesReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_CYCLES_MOLDES:
            return action.payload
        default:
            return state
    }
}

const moldeMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_MOLDE){
        return action.payload
    }
    return message
}

const moldeReducer = (selected = null, action) =>{
    if(action.type === SELECT_MOLDE){
        return action.payload
    }
    return selected
}

export {
    moldesReducer,
    cyclesReducer, 
    moldeReducer,
    moldeMessage
}