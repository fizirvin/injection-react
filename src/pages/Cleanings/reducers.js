import {
    FETCH_MOLDE_CLEANINGS,
    FETCH_CYCLES_CLEANINGS,
    ADD_CLEANING,
    MESSAGE_CLEANING,
    SELECT_CLEANING,
    UNSELECT_CLEANING,
    UPDATE_CLEANING,
    FINISH_CLEANING,
    LOADING_CLEANINGS,
    LOADING_CYCLES_CLEANINGS
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
        case FINISH_CLEANING:
            const fitem = action.payload
            let fitems = [...state]
            fitems[fitems.findIndex(el => el._id === fitem._id)] = fitem;
            return fitems
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

const cyclesCleaningsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_CYCLES_CLEANINGS:
            return action.payload
        // case ADD_CLEANING:
        //     return [ ...state, action.payload ]
        // case UPDATE_CLEANING:
        //     const item = action.payload
        //     let items = [...state]
        //     items[items.findIndex(el => el._id === item._id)] = item;
        //     return items
        default:
            return state
    }
}

const loadingCyclesCleanings = (loading = false, action) =>{
    if(action.type === LOADING_CYCLES_CLEANINGS){
        return !loading
    }
    return loading
}

export {
    cleaningsReducer,
    cleaningMessage,
    cleaningSelected,
    loadingCleanings,
    cyclesCleaningsReducer,
    loadingCyclesCleanings
}