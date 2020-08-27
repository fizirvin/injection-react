import { url, opts } from '../../actions/config'
import issuesQuery from './queries'
import { addIssue as newIssue, modifyIssue } from './mutations'

export const FETCH_ISSUES = 'FETCH_ISSUES'
export const ADD_ISSUE = 'ADD_ISSUE'
export const UPDATE_ISSUE = 'UPDATE_ISSUE'
export const SELECT_ISSUE = 'SELECT_ISSUE'
export const MESSAGE_ISSUE = 'MESSAGE_ISSUE'

const fetchIssues = () => async ( dispatch ) => {
    opts.body = JSON.stringify(issuesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_ISSUES,
        payload: data.data.issues
    })
}

const addIssue = (input) => async ( dispatch ) => {
    newIssue.variables = { input }
    opts.body = JSON.stringify(newIssue)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_ISSUE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_ISSUE,
            payload: data.data.newIssue
        })
        return dispatch({
            type: MESSAGE_ISSUE,
            payload: 'sucess'
        })
    }
}

const updateIssue = (_id, input) => async ( dispatch ) => {
    modifyIssue.variables = { _id, input }
    opts.body = JSON.stringify(modifyIssue)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_ISSUE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_ISSUE,
            payload: data.data.updateIssue
        })
        return dispatch({
            type: MESSAGE_ISSUE,
            payload: 'sucess'
        })
    }
}

const selectIssue = issue =>{
    return{
        type: SELECT_ISSUE,
        payload: issue
    }
}

const closeIssue = () =>{
    return{
        type: MESSAGE_ISSUE,
        payload: 'new'
    }
}

export {
    fetchIssues,
    addIssue,
    updateIssue,
    selectIssue,
    closeIssue
}