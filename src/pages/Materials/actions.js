import { url, opts } from '../../config'
import materialsQuery from './queries'
import { addMaterial as newMaterial, modifyMaterial } from './mutations'

export const FETCH_MATERIALS = 'FETCH_MATERIALS'
export const ADD_MATERIAL = 'ADD_MATERIAL'
export const UPDATE_MATERIAL = 'UPDATE_MATERIAL'
export const SELECT_MATERIAL = 'SELECT_MATERIAL'
export const MESSAGE_MATERIAL = 'MESSAGE_MATERIAL'

const fetchMaterials = () => async ( dispatch ) => {
    opts.body = JSON.stringify(materialsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_MATERIALS,
        payload: data.data.materials
    })
}

const addMaterial = (input) => async ( dispatch ) => {
    newMaterial.variables = { input }
    opts.body = JSON.stringify(newMaterial)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_MATERIAL,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_MATERIAL,
            payload: data.data.newMaterial
        })
        return dispatch({
            type: MESSAGE_MATERIAL,
            payload: 'sucess'
        })
    }
}

const updateMaterial = (_id, input) => async ( dispatch ) => {
    modifyMaterial.variables = { _id, input }
    opts.body = JSON.stringify(modifyMaterial)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_MATERIAL,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_MATERIAL,
            payload: data.data.updateMaterial
        })
        return dispatch({
            type: MESSAGE_MATERIAL,
            payload: 'sucess'
        })
    }
}

const selectMaterial = material =>{
    return{
        type: SELECT_MATERIAL,
        payload: material
    }
}

const closeMaterial = () =>{
    return{
        type: MESSAGE_MATERIAL,
        payload: 'new'
    }
}

export {
    fetchMaterials,
    addMaterial,
    updateMaterial,
    selectMaterial,
    closeMaterial
}