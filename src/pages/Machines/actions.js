import { url, opts } from '../../actions/config'
import machinesQuery from './queries'

const fetchMachines = () => async ( dispatch ) => {
    opts.body = JSON.stringify(machinesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: 'FETCH_MACHINES',
        payload: data.data.machines
    })
}

const addMachine = () => async ( dispatch ) => {
    opts.body = JSON.stringify(machinesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: 'ADD_MACHINE',
        payload: data.data.newMachine
    })
}

const updateMachine = () => async ( dispatch ) => {
    opts.body = JSON.stringify(machinesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: 'UPDATE_MACHINE',
        payload: data.data.updateMachine
    })
}

const selectMachine = machine =>{
    return{
        type: 'SELECT_MACHINE',
        payload: machine
    }
}

export {
    fetchMachines,
    addMachine,
    updateMachine,
    selectMachine
}