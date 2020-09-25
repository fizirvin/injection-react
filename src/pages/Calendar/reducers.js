import {
    FETCH_SELECTED_CYCLES,
    MESSAGE_SELECTED_CYCLES,
    LOADING_SELECTED_CYCLES
} from './actions'

const selectedCycles = (state = null, action) =>{
    switch (action.type){
        case FETCH_SELECTED_CYCLES:
            return action.payload
        default:
            return state
    }
}

const loadingSelectedCycles = (loading = false, action) =>{
    if(action.type === LOADING_SELECTED_CYCLES ){
        return !loading
    }
    return loading
}

const selectedCyclesMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_SELECTED_CYCLES){
        return action.payload
    }
    return message
}

export {
    selectedCycles,
    selectedCyclesMessage,
    loadingSelectedCycles
}