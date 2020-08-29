import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser, closeUser } from './actions'

const AddUser = ({ message, closeUser, addUser }) => {
  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ level, setLevel ] = useState('')
    
  const onClose = () =>{
    return closeUser()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        return setName(value)
      case 'level':
        return setLevel(value)
      case 'password':
        return setPassword(value)
      default:  
        return
    }
  }

   
  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      name,
      level,
      password
    }
    return addUser(input);
  }

  const renderSubmit = () =>{
    if(name === '' | password === '' | level === ''){return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input>}
    else{
      return <input type="submit" onSubmit={onSubmit} value="Submit"></input>
    }
  }

  const setAccess = (level) =>{
    if( level === "1" ){ return 'Full access'}
    else if( level === "2"){ return 'Write reports only'} 
    else if( level === "3"){ return 'View reports only'} 
    else{ return null}
  }

  const renderForm = () =>{
    if( message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
        <div className="modal-content">
          <h2>Add New User:</h2>
          <form onSubmit={onSubmit} autoComplete='off'>
            <table>
          <tbody> 
            <tr>
              <td><label>Name: </label></td>
              <td><input type="text" 
              name='name' 
              value={name}
              onChange={onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Level: </label></td>
              <td>
                <select onChange={onInputChange} name="level" value={level} required>
                  <option disabled value="">select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select> {setAccess(level)}
              </td>
            </tr>
            <tr>
            <td><label>Password: </label></td>
            <td><input type="password"
              name='password'
              autoComplete='new-password'
              minLength='5'
              value={password}
              onChange={onInputChange} required>
                </input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/users"><button>Cancel</button></Link>
            {renderSubmit()}</td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
        </div>,
        document.querySelector('#modal')
      );
    } 
    else if(message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/users"><button onClick={onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if(message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            New User added correctly <Link to="/users"><button onClick={onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
  }


  return(
    renderForm()
  )
};

const mapStateToProps = state =>({
    message: state.userMessage
})

export default connect(mapStateToProps, {addUser, closeUser })(AddUser)