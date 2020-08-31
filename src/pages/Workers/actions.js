import { hr_server, hr_opts, url_image, opts_image } from '../../config'
import workersQuery from './queries'
import { addWorker as newWorker, modifyWorker } from './mutations'

export const FETCH_WORKERS = 'FETCH_WORKERS'
export const ADD_WORKER = 'ADD_WORKER'
export const UPDATE_WORKER = 'UPDATE_WORKER'
export const SELECT_WORKER = 'SELECT_WORKER'
export const MESSAGE_WORKER = 'MESSAGE_WORKER'

const fetchWorkers = () => async ( dispatch ) => {
    hr_opts.body = JSON.stringify(workersQuery)
    const res = await fetch(hr_server, hr_opts);
    const data = await res.json();

    dispatch({
        type: FETCH_WORKERS,
        payload: data.data.profiles
    })
}

const addWorker = (input, formData ) => async ( dispatch ) => {
    if(!formData){
        newWorker.variables = { input }
        hr_opts.body = JSON.stringify(newWorker)
        const res = await fetch(hr_server, hr_opts);
        const data = await res.json();
    
        if(data.errors){
            console.log(data)
            return dispatch({type: MESSAGE_WORKER,
                payload: 'error'
            })
        } else{
            dispatch({
                type: ADD_WORKER,
                payload: data.data.newProfile
            })
            return dispatch({
                type: MESSAGE_WORKER,
                payload: 'sucess'
            })
        }
    } else{
        opts_image.body = formData;
        const res_image = await fetch(url_image, opts_image);
        const data3 = await res_image.json();
        input.picture_URL = await data3.imageUrl
        
        newWorker.variables = { input }
        hr_opts.body = JSON.stringify(newWorker)
        const res = await fetch(hr_server, hr_opts);
        const data = await res.json();
    
        if(data.errors){
            console.log(data)
            return dispatch({type: MESSAGE_WORKER,
                payload: 'error'
            })
        } else{
            dispatch({
                type: ADD_WORKER,
                payload: data.data.newProfile
            })
            return dispatch({
                type: MESSAGE_WORKER,
                payload: 'sucess'
            })
        }
    }
}

const updateWorker = (_id, input, formData) => async ( dispatch ) => {
    if(!formData){
        modifyWorker.variables = { _id, input }
        hr_opts.body = JSON.stringify(modifyWorker)
        const res = await fetch(hr_server, hr_opts);
        const data = await res.json();
    
        if(data.errors){
            console.log(data)
            return dispatch({type: MESSAGE_WORKER,
                payload: 'error'
            })
        } else{
            dispatch({
                type: ADD_WORKER,
                payload: data.data.newProfile
            })
            return dispatch({
                type: MESSAGE_WORKER,
                payload: 'sucess'
            })
        }
    } else{
        opts_image.body = formData;
        const res_image = await fetch(url_image, opts_image);
        const data3 = await res_image.json();
        input.picture_URL = await data3.imageUrl

        modifyWorker.variables = { _id, input }
        hr_opts.body = JSON.stringify(modifyWorker)
        const res = await fetch(hr_server, hr_opts);
        const data = await res.json();
    
        if(data.errors){
            console.log(data)
            return dispatch({type: MESSAGE_WORKER,
                payload: 'error'
            })
        } else{
            dispatch({
                type: UPDATE_WORKER,
                payload: data.data.updateWorker
            })
            return dispatch({
                type: MESSAGE_WORKER,
                payload: 'sucess'
            })
        }
    }
}

const selectWorker = worker =>{
    return{
        type: SELECT_WORKER,
        payload: worker
    }
}

const closeWorker = () =>{
    return{
        type: MESSAGE_WORKER,
        payload: 'new'
    }
}

export {
    fetchWorkers,
    addWorker,
    updateWorker,
    selectWorker,
    closeWorker
}