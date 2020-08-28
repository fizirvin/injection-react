import { url, opts } from '../../actions/config'
import programsQuery from './queries'
import { addProgram as newProgram, modifyProgram } from './mutations'

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS'
export const ADD_PROGRAM = 'ADD_PROGRAM'
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'
export const SELECT_PROGRAM = 'SELECT_PROGRAM'
export const MESSAGE_PROGRAM = 'MESSAGE_PROGRAM'

const fetchPrograms = () => async ( dispatch ) => {
    opts.body = JSON.stringify(programsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_PROGRAMS,
        payload: data.data.programs
    })
}

const addProgram = (input) => async ( dispatch ) => {
    newProgram.variables = { input }
    opts.body = JSON.stringify(newProgram)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_PROGRAM,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_PROGRAM,
            payload: data.data.newProgram
        })
        return dispatch({
            type: MESSAGE_PROGRAM,
            payload: 'sucess'
        })
    }
}

const updateProgram = (_id, input) => async ( dispatch ) => {
    modifyProgram.variables = { _id, input }
    opts.body = JSON.stringify(modifyProgram)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_PROGRAM,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_PROGRAM,
            payload: data.data.updateProgram
        })
        return dispatch({
            type: MESSAGE_PROGRAM,
            payload: 'sucess'
        })
    }
}

const selectProgram = program =>{
    return{
        type: SELECT_PROGRAM,
        payload: program
    }
}

const closeProgram = () =>{
    return{
        type: MESSAGE_PROGRAM,
        payload: 'new'
    }
}

export {
    fetchPrograms,
    addProgram,
    updateProgram,
    selectProgram,
    closeProgram
}