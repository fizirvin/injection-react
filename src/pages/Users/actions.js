import { url, opts } from '../../actions/config'
import usersQuery from './queries'
import { addUser as newUser, modifyUser } from './mutations'

export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SELECT_USER = 'SELECT_USER'
export const MESSAGE_USER = 'MESSAGE_USER'

const fetchUsers = () => async ( dispatch ) => {
    opts.body = JSON.stringify(usersQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    dispatch({
        type: FETCH_USERS,
        payload: data.data.users
    })
}

const addUser = (input) => async ( dispatch ) => {
    newUser.variables = { input }
    opts.body = JSON.stringify(newUser)
    const res = await fetch(url, opts);
    const data = await res.json();

    if(data.errors){
        console.log(data)
        return dispatch({type: MESSAGE_USER,
            payload: 'error'
        })
    } else{
        dispatch({
            type: ADD_USER,
            payload: data.data.newUser
        })
        return dispatch({
            type: MESSAGE_USER,
            payload: 'sucess'
        })
    }
}

const updateUser = (_id, input) => async ( dispatch ) => {
    modifyUser.variables = { _id, input }
    opts.body = JSON.stringify(modifyUser)
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.errors){
        return dispatch({type: MESSAGE_USER,
            payload: 'error'
        })
    } else{
        dispatch({
            type: UPDATE_USER,
            payload: data.data.updateUser
        })
        return dispatch({
            type: MESSAGE_USER,
            payload: 'sucess'
        })
    }
}

const selectUser = issue =>{
    return{
        type: SELECT_USER,
        payload: issue
    }
}

const closeUser = () =>{
    return{
        type: MESSAGE_USER,
        payload: 'new'
    }
}

export {
    fetchUsers,
    addUser,
    updateUser,
    selectUser,
    closeUser
}