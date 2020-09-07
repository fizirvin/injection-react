import {
    FETCH_MOLDES,
    FETCH_CYCLES_MOLDES,
    FETCH_MOLDE_CLEANINGS,
    ADD_CYCLES_MOLDES,
    UPDATE_CYCLES_MOLDES,
    ADD_MOLDE,
    ADD_CLEANING,
    MESSAGE_CLEANING,
    UPDATE_MOLDE,
    SELECT_MOLDE,
    MESSAGE_MOLDE,
    OPEN_CLEANING_FORM,
    OPEN_DETAIL_CLEANINGS,
    SELECT_DETAIL_MOLDE,
    CLOSE_DETAIL_CLEANINGS,
    UNSELECT_DETAIL_MOLDE,
    TOTAL_CYCLES_MOLDE,
    RESET_CLEANINGS,
    RESET_CLEANING_FORM,
    OPEN_CLEANING_UPDATE_FORM,
    RESET_CLEANING_UPDATE_FORM,
    SELECT_CLEANING,
    UNSELECT_CLEANING,
    UPDATE_CLEANING
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
        case RESET_CLEANINGS:
            return [ ]
        default:
            return state
    }
}

const openDetailCleanings = (DetailIsOpen = false, action)=>{
    switch (action.type){
        case OPEN_DETAIL_CLEANINGS:
            return true
        case CLOSE_DETAIL_CLEANINGS:
            return false
        default:
            return DetailIsOpen
    }
}

const openUpdateCleaningForm = (formIsOpen = false, action) =>{
    switch (action.type){
        case OPEN_CLEANING_UPDATE_FORM:
            return true 
        case RESET_CLEANING_UPDATE_FORM:
            return false
        default:
            return formIsOpen
    }
}

const openCleaningForm = (formIsOpen = false, action) =>{
    switch (action.type){
        case OPEN_CLEANING_FORM:
            return !formIsOpen 
        case RESET_CLEANING_FORM:
            return false
        default:
            return formIsOpen
    }
}

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
        case ADD_CYCLES_MOLDES:
            return [ ...state, ...action.payload ]
        case UPDATE_CYCLES_MOLDES:
            const oldCycles = state.filter( reportDate => reportDate.report !== action._id)
            return [ ...oldCycles, ...action.payload ]
        default:
            return state
    }
}

const cleaningMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_CLEANING){
        return action.payload
    }
    return message
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

const moldeDetail = (selected = null, action) =>{
    switch (action.type){
        case SELECT_DETAIL_MOLDE:
            return action.payload
        case UNSELECT_DETAIL_MOLDE:
            return null
        default:
            return selected
    }
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

const totalCyclesReducer = (tcycles = 0, action) =>{
    if(action.type === TOTAL_CYCLES_MOLDE){
        return action.payload
    }
    return tcycles
}

export {
    moldesReducer,
    cyclesReducer, 
    moldeReducer,
    moldeMessage,
    openCleaningForm,
    openDetailCleanings,
    moldeDetail,
    totalCyclesReducer,
    cleaningsReducer,
    cleaningMessage,
    openUpdateCleaningForm,
    cleaningSelected
}