import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser, closeUser } from './actions'

const UpdateUser = ({ user, message, closeUser, updateUser }) => {
  const [ name, setName ] = useState(user.name)
  const [ active, setActive ] = useState(user.active)
  const [ level, setLevel ] = useState(user.level)
    
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
      default:  
        return
    }
  }

  const onActiveChange = () => setActive(!active)

  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      name,
      level,
      active
    }
    return updateUser(user._id, input);
  }

  const renderSubmit = () =>{
    if(name === '' | level === ''){return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input>}
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
    if(message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
        <div className="modal-content">
          <h2>Update User:</h2>
          <form onSubmit={onSubmit} autoComplete='off'>
            <table>
          <tbody> 
            <tr>
              <td><label>Name: </label></td>
              <td><input type="text" 
              name='name' 
              value={name}
              onChange={onInputChange} disabled></input></td>
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
              <td><label>Active: </label></td>
              <td><input type="checkbox" 
              name='active' 
              checked={active}
              onChange={onActiveChange}></input></td>
            </tr>
            <tr>
              <td><label>Created: </label></td>
              <td>{user.fullCat}</td>
            </tr>
            {/* <tr>
              <td><label>Updated: </label></td>
              <td>{this.state.fullUat}</td>
            </tr> */}
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
            User updated correctly <Link to="/users"><button onClick={onClose}>Close</button></Link>
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
    message: state.userMessage,
    user: state.user
})

export default connect(mapStateToProps, {updateUser, closeUser })(UpdateUser)