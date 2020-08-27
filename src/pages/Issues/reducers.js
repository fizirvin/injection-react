import {
    FETCH_ISSUES,
    ADD_ISSUE,
    UPDATE_ISSUE,
    SELECT_ISSUE,
    MESSAGE_ISSUE,
} from './actions'

const issuesReducer = (state = [], action) =>{
    switch (action.type){
        case FETCH_ISSUES:
            return action.payload
        case ADD_ISSUE:
            return [ ...state, action.payload ]
        case UPDATE_ISSUE:
            const item = action.payload
            let items = [...state]
            items[items.findIndex(el => el._id === item._id)] = item;
            return items
        default:
            return state
    }
}

const issueMessage = ( message = 'new', action) =>{
    if(action.type === MESSAGE_ISSUE){
        return action.payload
    }
    return message
}

const issueReducer = (selected = null, action) =>{
    if(action.type === SELECT_ISSUE){
        return action.payload
    }
    return selected
}

export {
    issuesReducer, 
    issueReducer,
    issueMessage
}