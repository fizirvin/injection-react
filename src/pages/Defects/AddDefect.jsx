import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addDefect, closeDefect } from './actions'

const AddDefect = ({ message, closeDefect, addDefect }) => {
  const [ defectName, setDefectName ] = useState('')
  const [ defectCode, setDefectode ] = useState('')
  const [ isInjection, setIsInjection ] = useState('')
    
  const onClose = () =>{
    return closeDefect()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'defectName':
        return setDefectName(value)
      case 'defectCode':
        return setDefectode(value)
      default:  
        return
    }
  }

   
  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      defectName,
      defectCode,
      isInjection
    }
    return addDefect(input);
  }

  const onIsInjection = e =>{
    const value = e.target.value
    let bool;
    if(value === 'true'){
      bool = true
    } else {bool = false}
    return setIsInjection(bool)
  }

  const renderForm = () =>{
    if(message === 'new'){
      return ReactDOM.createPortal(
      <div className="Modal">
          <div className="modal-content">
            <h2>Add New Defect:</h2>
            <form onSubmit={onSubmit}>
              <table>
            <tbody>
              <tr>
                <td><label>Defect Code: </label></td>
                <td><input type="text"
                name='defectCode' 
                value={defectCode}
                onChange={onInputChange} required></input></td>
              </tr> 
              <tr>
                <td><label>Defect Name: </label></td>
                <td><input type="text"
                name='defectName' 
                value={defectName}
                onChange={onInputChange} required></input></td>
              </tr>
              <tr>
                <td><label>Injection Area Defect?: </label></td>
                <td>
                  <input type="radio" id="true" name="isInjection" value={true} onChange={onIsInjection} required></input>
                  <label htmlFor="true">Yes</label>
                  <input type="radio" id="false" name="isInjection" value={false} onChange={onIsInjection} required></input>
                  <label htmlFor="false">No</label>
                </td>
              </tr>
              
              <tr>
              <td></td>
              <td><Link to="/defects"><button>Cancel</button></Link>
              <input type="submit" onSubmit={onSubmit} value="Submit"></input></td>
              </tr>
  
  
  
            </tbody>
            </table>         
            </form>
             
  
          </div>
        
        </div>,
        document.querySelector('#modal')
      );
    } else if( message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/defects"><button onClick={onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if( message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            New Injection Defect added correctly <Link to="/defects"><button onClick={onClose}>Close</button></Link>
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
    message: state.defectMessage
})

export default connect(mapStateToProps, {addDefect, closeDefect })(AddDefect)