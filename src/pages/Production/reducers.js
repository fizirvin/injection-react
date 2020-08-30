import {
    FETCH_PRODUCTION_BY_DATE,
    ADD_PRODUCTION_BY_DATE,
    UPDATE_PRODUCTION_BY_DATE,

    FETCH_DOWNTIME_BY_DATE, 
    ADD_DOWNTIME_BY_DATE,
    UPDATE_DOWNTIME_BY_DATE,

    FETCH_RESINES_BY_DATE, 
    ADD_RESINES_BY_DATE,
    UPDATE_RESINES_BY_DATE,

    FETCH_DEFECTS_BY_DATE, 
    ADD_DEFECTS_BY_DATE,
    UPDATE_DEFECTS_BY_DATE 
} from './actions'


const productionReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_PRODUCTION_BY_DATE:
            return action.payload
        case ADD_PRODUCTION_BY_DATE:
            return [ ...state, ...action.payload ]
        case UPDATE_PRODUCTION_BY_DATE:
            const oldProductionByDate = state.filter( reportDate => reportDate.report !== action._id)
            return [ ...oldProductionByDate, ...action.payload ]
        default:
            return state
    }
}

const downtimeReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_DOWNTIME_BY_DATE:
            return action.payload
        case ADD_DOWNTIME_BY_DATE:
            return [ ...state, ...action.payload ]
        case UPDATE_DOWNTIME_BY_DATE:
            const oldDowntimeByDate = state.filter( reportDate => reportDate.report !== action._id)
            return [ ...oldDowntimeByDate, ...action.payload ]
        default:
            return state
    }
}

const defectPoductionReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_DEFECTS_BY_DATE:
            return action.payload
        case ADD_DEFECTS_BY_DATE:
            return [ ...state, ...action.payload ]
        case UPDATE_DEFECTS_BY_DATE:
            const oldDefectsByDate = state.filter( reportDate => reportDate.report !== action._id)
            return [ ...oldDefectsByDate, ...action.payload ]
        default:
            return state
    }
}

const resinesReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_RESINES_BY_DATE:
            return action.payload
        case ADD_RESINES_BY_DATE:
            return [ ...state, ...action.payload ]
        case UPDATE_RESINES_BY_DATE:
            const oldResinesByDate = state.filter( reportDate => reportDate.report !== action._id)
            return [ ...oldResinesByDate, ...action.payload ]
        default:
            return state
    }
}


export {
    productionReducer,
    downtimeReducer,
    defectPoductionReducer,
    resinesReducer
}