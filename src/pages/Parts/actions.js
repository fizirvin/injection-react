import { url, opts } from '../../config'
import modelsQuery from './queries'
import { addModel as newModel, modifyModel } from './mutations'

export const FETCH_MODELS = 'FETCH_MODELS'
export const ADD_MODEL = 'ADD_MODEL'
export const UPDATE_MODEL = 'UPDATE_MODEL'
export const SELECT_MODEL = 'SELECT_MODEL'
export const MODEL_MESSAGE = 'MODEL_MESSAGE'

const fetchModels = () => async ( dispatch ) => {
    opts.body = JSON.stringify(modelsQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_MODELS,
        payload: data.data.parts
    })
}

const addModel = (input) => async ( dispatch ) => {
    newModel.variables = { input }
    opts.body = JSON.stringify(newModel)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        return dispatch({type: MODEL_MESSAGE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_MODEL,
            payload: data.data.newPartNumber
        })
        return dispatch({
            type: MODEL_MESSAGE,
            payload: 'sucess'
        })
    }
}

const updateModel = (_id, input) => async ( dispatch ) => {
    modifyModel.variables = { _id, input }
    opts.body = JSON.stringify(modifyModel)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MODEL_MESSAGE,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_MODEL,
            payload: data.data.updatePartNumber
        })
        return dispatch({
            type: MODEL_MESSAGE,
            payload: 'sucess'
        })
    }
}

const selectModel = model =>{
    return{
        type: SELECT_MODEL,
        payload: model
    }
}

const closeModel = () =>{
    return{
        type: MODEL_MESSAGE,
        payload: 'new'
    }
}

export {
    fetchModels,
    addModel,
    updateModel,
    selectModel,
    closeModel
}