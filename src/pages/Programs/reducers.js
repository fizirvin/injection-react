import {
    FETCH_MATERIALS,
    ADD_MATERIAL,
    UPDATE_MATERIAL,
    SELECT_MATERIAL,
    MESSAGE_MATERIAL,
} from './actions'

const materialsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_MATERIALS:
            return action.payload
        case ADD_MATERIAL:
            return [ ...state, action.payload ]
        case UPDATE_MATERIAL:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const materialMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_MATERIAL){
        return action.payload
    }
    return message
}

const materialReducer = (selected = null, action) =>{
    if(action.type === SELECT_MATERIAL){
        return action.payload
    }
    return selected
}

export {
    materialsReducer, 
    materialReducer,
    materialMessage
}