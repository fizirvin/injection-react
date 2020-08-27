import {
    FETCH_DEFECTS,
    ADD_DEFECT,
    UPDATE_DEFECT,
    SELECT_DEFECT,
    MESSAGE_DEFECT,
} from './actions'

const defectsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_DEFECTS:
            return action.payload
        case ADD_DEFECT:
            return [ ...state, action.payload ]
        case UPDATE_DEFECT:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const defectMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_DEFECT){
        return action.payload
    }
    return message
}

const defectReducer = (selected = null, action) =>{
    if(action.type === SELECT_DEFECT){
        return action.payload
    }
    return selected
}

export {
    defectsReducer, 
    defectReducer,
    defectMessage
}