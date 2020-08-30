import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addIssue, closeIssue } from './actions'

const AddIssue = ({ message, closeIssue, addIssue }) => {
  const [ issueName, setIssueName ] = useState('')
  const [ issueCode, setIssueCode ] = useState('')
    
  const onClose = () =>{
    return closeIssue()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'issueName':
        return setIssueName(value)
      case 'issueCode':
        return setIssueCode(value)
      default:  
        return
    }
  }

   
  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      issueName,
      issueCode,
    }
    return addIssue(input);
  }

  const renderForm = () =>{
    if(message === 'new'){
      return ReactDOM.createPortal(
      <div className="Modal">
          <div className="modal-content">
            <h2>Add New Issue:</h2>
            <form onSubmit={onSubmit}>
              <table>
            <tbody>
              <tr>
                <td><label>Issue Code: </label></td>
                <td><input type="text"
                name='issueCode' 
                value={issueCode}
                onChange={onInputChange} required></input></td>
              </tr> 
              <tr>
                <td><label>Issue Name: </label></td>
                <td><input type="text"
                name='issueName' 
                value={issueName}
                onChange={onInputChange} required></input></td>
              </tr>
              <tr>
              <td></td>
              <td><Link to="/issues"><button>Cancel</button></Link>
              <input type="submit" onSubmit={onSubmit} value="Submit"></input></td>
              </tr>
  
  
  
            </tbody>
            </table>         
            </form>
             
  
          </div>
        
        </div>,
        document.querySelector('#modal')
      );
    } else if(message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/issues"><button onClick={onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if( message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            New Injection Issue added correctly <Link to="/issues"><button onClick={ onClose}>Close</button></Link>
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
    message: state.issueMessage
})

export default connect(mapStateToProps, {addIssue, closeIssue })(AddIssue)