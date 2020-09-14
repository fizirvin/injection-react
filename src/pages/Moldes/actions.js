import { url, opts } from '../../config'
import { moldesQuery, tcyclesQuery } from './queries'
import { addMolde as newMolde, modifyMolde } from './mutations'


export const FETCH_MOLDES = 'FETCH_MOLDES'
export const FETCH_CYCLES_MOLDES = 'FETCH_CYCLES_MOLDES'
export const RELOAD_CYCLES = 'RELOAD_CYCLES'
export const  ADD_CYCLES_MOLDES = ' ADD_CYCLES_MOLDES'
export const  UPDATE_CYCLES_MOLDES = ' UPDATE_CYCLES_MOLDES'

export const ADD_MOLDE = 'ADD_MOLDE'
export const UPDATE_MOLDE = 'UPDATE_MOLDE'
export const SELECT_MOLDE = 'SELECT_MOLDE'
export const MESSAGE_MOLDE = 'MESSAGE_MOLDE'
export const TOTAL_CYCLES_MOLDE = 'TOTAL_CYCLES_MOLDE'

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
    opts.body = JSON.stringify(tcyclesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_CYCLES_MOLDES,
        payload: data.data.tcycles
    })
    dispatch({
        type: RELOAD_CYCLES,
        payload: false
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
    closeMolde
}