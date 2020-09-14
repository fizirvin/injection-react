import { url, opts } from '../../config'
import { cleaningsQuery, cyclesCleaningQuery } from './queries'
import { addCleaning as newCleaning, modifyCleaning } from './mutations'


export const ADD_CLEANING = 'ADD_CLEANING'
export const FETCH_MOLDE_CLEANINGS = 'FETCH_MOLDE_CLEANINGS'
export const FETCH_CYCLES_CLEANINGS = 'FETCH_CYCLES_CLEANINGS'
export const MESSAGE_CLEANING = 'MESSAGE_CLEANING'
export const UPDATE_CLEANING = 'UPDATE_CLEANING'
export const SELECT_CLEANING = 'SELECT_CLEANING'
export const UNSELECT_CLEANING = 'UNSELECT_CLEANING'
export const LOADING_CLEANINGS = 'LOADING_CLEANINGS'
export const LOADING_CYCLES_CLEANINGS = 'LOADING_CYCLES_CLEANINGS'

const selectCleaning = (cleaning) => async (dispatch) =>{
    return dispatch({
        type: SELECT_CLEANING,
        payload: cleaning
    })
}

const unselectCleaning = () =>{
    return{
        type: UNSELECT_CLEANING
    }
}

const updateCleaning = (_id, input) => async ( dispatch ) => {
    modifyCleaning.variables = { _id, input }
    opts.body = JSON.stringify(modifyCleaning)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_CLEANING,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_CLEANING,
            payload: data.data.updateCleaning
        })
        return dispatch({
            type: MESSAGE_CLEANING,
            payload: 'sucess'
        })
    }
}

const addCleaning = (input) => async ( dispatch ) => {
    newCleaning.variables = { input }
    opts.body = JSON.stringify(newCleaning)
    const res = await fetch(url, opts);
    const data = await res.json();
    console.log(data)
    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_CLEANING,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_CLEANING,
            payload: data.data.newCleaning
        })
        return dispatch({
            type: MESSAGE_CLEANING,
            payload: 'sucess'
        })
    }
}

const fetchMoldeCleanings = ( ) => async ( dispatch ) => {
    dispatch({
        type: LOADING_CLEANINGS,
    })
    opts.body = JSON.stringify(cleaningsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();


    if(data.errors){
        console.log(data)
        dispatch({
            type: LOADING_CLEANINGS,
        })
        return dispatch({type: MESSAGE_CLEANING,
            payload: 'error'
        })
    } else{
        dispatch({
            type: LOADING_CLEANINGS,
        })
        dispatch({
            type: FETCH_MOLDE_CLEANINGS,
            payload: data.data.cleanings
        })
    }
}

const fetchCyclesCleanings = (molde, date) => async ( dispatch ) => {
    dispatch({
        type: LOADING_CYCLES_CLEANINGS,
    })

    
    cyclesCleaningQuery.variables = {molde, initial: date}
    opts.body = JSON.stringify(cyclesCleaningQuery)
    const res = await fetch(url, opts);
    const data = await res.json();


    if(data.errors){
        console.log(data)
        dispatch({
            type: LOADING_CYCLES_CLEANINGS,
        })
        return dispatch({type: MESSAGE_CLEANING,
            payload: 'error'
        })
    } else{
        
        dispatch({
            type: LOADING_CYCLES_CLEANINGS,
        })
        dispatch({
            type: FETCH_CYCLES_CLEANINGS,
            payload: data.data.cycles
        })
    }
}

export {
    addCleaning,
    fetchMoldeCleanings,
    selectCleaning,
    updateCleaning,
    unselectCleaning,
    fetchCyclesCleanings
}