import { url, opts } from '../../config'
import { selectedCyclesQuery } from './queries'

export const FETCH_SELECTED_CYCLES = 'FETCH_SELECTED_CYCLES_CLEANINGS'
export const LOADING_SELECTED_CYCLES = 'LOADING_SELECTED'
export const MESSAGE_SELECTED_CYCLES = 'MESSAGE_SELECTED_CYCLES'

const fetchSelectedCycles = ( ) => async ( dispatch ) => {
    dispatch({
        type: LOADING_SELECTED_CYCLES,
    })
    opts.body = JSON.stringify(selectedCyclesQuery)
    const res = await fetch(url, opts);
    const data = await res.json();


    if(data.errors){
        console.log(data)
        dispatch({
            type: LOADING_SELECTED_CYCLES,
        })
        return dispatch({type: MESSAGE_SELECTED_CYCLES,
            payload: 'error'
        })
    } else{
        dispatch({
            type: LOADING_SELECTED_CYCLES,
        })
        dispatch({
            type: FETCH_SELECTED_CYCLES,
            payload: data.data.selectedCycles
        })
    }
}

export {
    fetchSelectedCycles
}