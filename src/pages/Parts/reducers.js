import {
    FETCH_MODELS,
    ADD_MODEL,
    UPDATE_MODEL,
    SELECT_MODEL,
    MODEL_MESSAGE,
} from './actions'

const modelsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_MODELS:
            return action.payload
        case ADD_MODEL:
            return [ ...state, action.payload ]
        case UPDATE_MODEL:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
} 

const modelMessage = ( message = 'new', action) =>{
    if(action.type === MODEL_MESSAGE){
        return action.payload
    }
    return message
}

const modelReducer = (selected = null, action) =>{
    if(action.type === SELECT_MODEL){
        return action.payload
    }
    return selected
}

export {
    modelsReducer, 
    modelReducer,
    modelMessage
}