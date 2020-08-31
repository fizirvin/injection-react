import {
    FETCH_REPORTS,
    FETCH_INITIAL_REPORTS,
    ADD_REPORT,
    UPDATE_REPORT,
    SELECT_REPORT,
    MESSAGE_REPORT,
    PAGE_REPORT,
    ADDED_REPORTS,
    TOTAL_REPORTS,
    ADD_TOTAL_REPORTS,
    LOADING_PAGE
} from './actions'


const reportsReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_REPORTS:
            return [ ...state, ...action.payload ]
        case FETCH_INITIAL_REPORTS:
            return action.payload
        case ADD_REPORT:
            return [ ...state, action.payload ]
        case UPDATE_REPORT:
            const item = action.payload
            const oldReports = state.filter( reports => reports._id !== action._id)
            const reports = [ item, ...oldReports]
            return reports
        default:
            return state
    }
}

const reportMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_REPORT ){
        return action.payload
    }
    return message
}

const reportReducer = (selected = null, action) =>{
    if(action.type === SELECT_REPORT ){
        return action.payload
    }
    return selected
}

const pageReducer = (page = 1, action) =>{
    if(action.type === PAGE_REPORT ){
        return action.payload
    }
    return page
}

const addReducer = (add = 0, action) =>{
    if(action.type === ADDED_REPORTS ){
        return add++
    }
    return add
}

const loadingPage = (loading = false, action) =>{
    if(action.type === LOADING_PAGE ){
        return !loading
    }
    return loading
}

const totalReportsReducer = ( totalReports = 0, action) =>{
    switch (action.type){
        case TOTAL_REPORTS:
            return action.payload
        case ADD_TOTAL_REPORTS:
            return totalReports++
        default:
            return totalReports
    }
}

export {
    reportsReducer, 
    reportReducer,
    reportMessage,
    pageReducer,
    addReducer,
    totalReportsReducer,
    loadingPage
}