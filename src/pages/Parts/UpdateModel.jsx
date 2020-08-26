import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateModel, closeModel } from './actions'

const UpdateModel = ({ model, message, closeModel, updateModel }) => {
   
  const [ partNumber, setPartNumber ] = useState(model.partNumber)
  const [ partName, setPartName ] = useState(model.partName)
  const [ family, setFamily ] = useState(model.family)
  
  const onClose = () =>{
    return closeModel()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'partNumber':
        return setPartNumber(value)
      case 'partName':
        return setPartName(value)
      case 'family':
        return setFamily(value)
      default:  
        return
    }
  }
    
    const onSubmit = e =>{
      e.preventDefault();
      const input = {
        partNumber,
        partName,
        family
      }
      return updateModel(model._id, input);
    }

    const renderForm = () =>{
      if(message === 'new'){
        return ReactDOM.createPortal(
        <div className="Modal">
            <div className="modal-content">
              <h2>Update Model:</h2>
              <form onSubmit={onSubmit}>
                <table>
              <tbody> 
                <tr>
                  <td><label>Part Number: </label></td>
                  <td><input type="text"
                    name='partNumber' 
                    value={partNumber}
                    onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Part Name: </label></td>
                  <td><input type="text"
                    name='partName' 
                    value={partName}
                    onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Family: </label></td>
                  <td><input type="text"
                    name='family' 
                    value={family}
                    onChange={onInputChange} required></input></td>
                </tr>
                
                <tr>
                <td></td>
                <td><Link to="/models"><button>Cancel</button></Link>
                <input type="submit" onSubmit={onSubmit} value="Submit"></input></td>
                </tr>
    
    
    
              </tbody>
              </table>         
              </form>
               
    
            </div>
          
          </div>,
          document.querySelector('#modal')
        );
        }else if(message === 'error'){
          return ReactDOM.createPortal(
            <div className="Modal">
              <div className="modal-content">
                Something goes Wrong, Try again later <Link to="/models"><button onClick={onClose}>Close</button></Link>
              </div>
            </div>,document.querySelector('#modal')
          );
        } else if(message === 'sucess'){
          return ReactDOM.createPortal(
            <div className="Modal">
              <div className="modal-content">
                Model updated correctly <Link to="/models"><button onClick={onClose}>Close</button></Link>
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
    message: state.modelMessage,
    model: state.model
})

export default connect(mapStateToProps, {updateModel, closeModel})(UpdateModel)