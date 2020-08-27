import { url, opts } from '../../actions/config'
import defectsQuery from './queries'
import { addDefect as newDefect, modifyDefect } from './mutations'

export const FETCH_DEFECTS = 'FETCH_DEFECTS'
export const ADD_DEFECT = 'ADD_DEFECT'
export const UPDATE_DEFECT = 'UPDATE_DEFECT'
export const SELECT_DEFECT = 'SELECT_DEFECT'
export const MESSAGE_DEFECT = 'MESSAGE_DEFECT'

const fetchDefects = () => async ( dispatch ) => {
    opts.body = JSON.stringify(defectsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_DEFECTS,
        payload: data.data.defects
    })
}

const addDefect = (input) => async ( dispatch ) => {
    newDefect.variables = { input }
    opts.body = JSON.stringify(newDefect)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_DEFECT,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_DEFECT,
            payload: data.data.newDefect
        })
        return dispatch({
            type: MESSAGE_DEFECT,
            payload: 'sucess'
        })
    }
}

const updateDefect = (_id, input) => async ( dispatch ) => {
    modifyDefect.variables = { _id, input }
    opts.body = JSON.stringify(modifyDefect)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_DEFECT,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_DEFECT,
            payload: data.data.updateDefect
        })
        return dispatch({
            type: MESSAGE_DEFECT,
            payload: 'sucess'
        })
    }
}

const selectDefect = defect =>{
    return{
        type: SELECT_DEFECT,
        payload: defect
    }
}

const closeDefect = () =>{
    return{
        type: MESSAGE_DEFECT,
        payload: 'new'
    }
}

export {
    fetchDefects,
    addDefect,
    updateDefect,
    selectDefect,
    closeDefect
}