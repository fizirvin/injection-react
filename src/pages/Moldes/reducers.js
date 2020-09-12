import {
    FETCH_MOLDES,
    FETCH_CYCLES_MOLDES,
    ADD_CYCLES_MOLDES,
    UPDATE_CYCLES_MOLDES,
    RELOAD_CYCLES,
    ADD_MOLDE,
    UPDATE_MOLDE,
    SELECT_MOLDE,
    MESSAGE_MOLDE,
    TOTAL_CYCLES_MOLDE
} from './actions'


const reloadCycles = ( reload = false, action) =>{
    if(action.type === RELOAD_CYCLES){
        return action.payload
    }
    return reload
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
            const item = action.payload[0]
            const newCycle = { molde: item.molde, tcycles: item.cycles } 
            return [ ...state, newCycle ]
        // case UPDATE_CYCLES_MOLDES:
        //     const oldCycles = state.filter( reportDate => reportDate.report !== action._id)
        //     return [ ...oldCycles, ...action.payload ]
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
    totalCyclesReducer,
    reloadCycles
}