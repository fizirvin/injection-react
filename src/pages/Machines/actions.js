import { url, opts } from '../config/'
import { initialQuery } from '../querys'

const fetchMachines = () => async ( dispatch ) => {
    opts.body = JSON.stringify(initialQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: 'FETCH_PROFILES',
        payload: data.data.profiles
    })
}

const selectProfile = player =>{
    return{
        type: 'PROFILE_SELECTED',
        payload: player
    }
}

export {
    fetchMachines,
    selectProfile
}