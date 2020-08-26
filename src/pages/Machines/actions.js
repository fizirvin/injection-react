import { url, opts } from '../../actions/config'
import machinesQuery from './queries'
import { addMachine as newMachine, modifyMachine } from './mutations'

const fetchMachines = () => async ( dispatch ) => {
    opts.body = JSON.stringify(machinesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: 'FETCH_MACHINES',
        payload: data.data.machines
    })
}

const addMachine = (input) => async ( dispatch ) => {
    newMachine.variables = { input }
    opts.body = JSON.stringify(newMachine)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        return dispatch({type: 'MACHINE_MESSAGE',
            payload: 'error'
        })
    } else{
        dispatch({
            type: 'ADD_MACHINE',
            payload: data.data.newMachine
        })
        return dispatch({
            type: 'MACHINE_MESSAGE',
            payload: 'sucess'
        })
    }
}

const updateMachine = (_id, input) => async ( dispatch ) => {
    modifyMachine.variables = { _id, input }
    opts.body = JSON.stringify(modifyMachine)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: 'MACHINE_MESSAGE',
            payload: 'error'
        })
    } else{
        dispatch({
            type: 'UPDATE_MACHINE',
            payload: data.data.updateMachine
        })
        return dispatch({
            type: 'MACHINE_MESSAGE',
            payload: 'sucess'
        })
    }
}

const selectMachine = machine =>{
    return{
        type: 'SELECT_MACHINE',
        payload: machine
    }
}

const closeMachine = () =>{
    return{
        type: 'MACHINE_MESSAGE',
        payload: 'new'
    }
}

export {
    fetchMachines,
    addMachine,
    updateMachine,
    selectMachine,
    closeMachine
}