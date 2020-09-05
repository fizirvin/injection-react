import { url, opts } from '../../config'
import { moldesQuery, cyclesQuery } from './queries'
import { addMolde as newMolde, modifyMolde } from './mutations'
import { dispatch } from 'd3'

export const FETCH_MOLDES = 'FETCH_MOLDES'
export const FETCH_CYCLES_MOLDES = 'FETCH_CYCLES_MOLDES'

export const  ADD_CYCLES_MOLDES = ' ADD_CYCLES_MOLDES'
export const  UPDATE_CYCLES_MOLDES = ' UPDATE_CYCLES_MOLDES'

export const ADD_MOLDE = 'ADD_MOLDE'
export const UPDATE_MOLDE = 'UPDATE_MOLDE'
export const SELECT_MOLDE = 'SELECT_MOLDE'
export const MESSAGE_MOLDE = 'MESSAGE_MOLDE'

export const ADD_CLEANING = 'ADD_CLEANING'
export const FETCH_MOLDE_CLEANINGS = 'FETCH_MOLDE_CLEANINGS'
export const MESSAGE_CLEANING = 'MESSAGE_CLEANING'
export const OPEN_CLEANING_FORM = 'OPEN_CLEANING_FORM'
export const OPEN_DETAIL_CLEANINGS = 'OPEN_DETAIL_CLEANINGS'
export const CLOSE_DETAIL_CLEANINGS = 'CLOSE_DETAIL_CLEANINGS'
export const SELECT_DETAIL_MOLDE = 'SELECT_DETAIL_MOLDE'
export const UNSELECT_DETAIL_MOLDE = 'UNSELECT_DETAIL_MOLDE'
export const TOTAL_CYCLES_MOLDE = 'TOTAL_CYCLES_MOLDE'

const openDetailCleanings = (molde, sum) => (dispatch) =>{
    dispatch({
        type: SELECT_DETAIL_MOLDE,
        payload: molde
    })
    dispatch( {
        type: OPEN_DETAIL_CLEANINGS,
    })
    dispatch( {
        type: TOTAL_CYCLES_MOLDE,
        payload: sum
    })

}

const closeDetailCleanings = () => (dispatch) =>{
    dispatch({
        type: UNSELECT_DETAIL_MOLDE
    })
    dispatch( {
        type: CLOSE_DETAIL_CLEANINGS,
    })

}

const openCleaningForm = () =>{
    return {
        type: OPEN_CLEANING_FORM,
    }
}

const fetchMoldeCleanings = () => async ( dispatch ) => {
    opts.body = JSON.stringify(moldesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();


    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_CLEANING,
            payload: 'error'
        })
    } else{
        dispatch({
            type: FETCH_MOLDE_CLEANINGS,
            payload: data.data.moldeCleanings
        })
    }
}

const fetchMoldes = () => async ( dispatch ) => {
    opts.body = JSON.stringify(moldesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();
    
    dispatch({
        type: FETCH_MOLDES,
        payload: data.data.moldes
    })
}

const fetchCycles = () => async ( dispatch ) => {
    opts.body = JSON.stringify(cyclesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_CYCLES_MOLDES,
        payload: data.data.cycles
    })
}

const addMolde = (input) => async ( dispatch ) => {
    newMolde.variables = { input }
    opts.body = JSON.stringify(newMolde)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_MOLDE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_MOLDE,
            payload: data.data.newMolde
        })
        return dispatch({
            type: MESSAGE_MOLDE,
            payload: 'sucess'
        })
    }
}

const updateMolde = (_id, input) => async ( dispatch ) => {
    modifyMolde.variables = { _id, input }
    opts.body = JSON.stringify(modifyMolde)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_MOLDE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_MOLDE,
            payload: data.data.updateMolde
        })
        return dispatch({
            type: MESSAGE_MOLDE,
            payload: 'sucess'
        })
    }
}

const selectMolde = molde =>{
    return{
        type: SELECT_MOLDE,
        payload: molde
    }
}

const closeMolde = () =>{
    return{
        type: MESSAGE_MOLDE,
        payload: 'new'
    }
}

export {
    fetchMoldes,
    fetchCycles,
    addMolde,
    updateMolde,
    selectMolde,
    closeMolde,
    openCleaningForm,
    openDetailCleanings,
    closeDetailCleanings
    
}