import {
    FETCH_MOLDE_CLEANINGS,
    ADD_CLEANING,
    MESSAGE_CLEANING,
    SELECT_CLEANING,
    UNSELECT_CLEANING,
    UPDATE_CLEANING,
    LOADING_CLEANINGS
} from './actions'

const cleaningsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_MOLDE_CLEANINGS:
            return action.payload
        case ADD_CLEANING:
            return [ ...state, action.payload ]
        case UPDATE_CLEANING:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}



const loadingCleanings = (loading = false, action) =>{
    if(action.type === LOADING_CLEANINGS){
        return !loading
    }
    return loading
}

const cleaningMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_CLEANING){
        return action.payload
    }
    return message
}

const cleaningSelected = (selected = null, action) =>{
    switch (action.type){
        case SELECT_CLEANING:
            return action.payload
        case UNSELECT_CLEANING:
            return null
        default:
            return selected
    }
}

export {
    cleaningsReducer,
    cleaningMessage,
    cleaningSelected,
    loadingCleanings,
}