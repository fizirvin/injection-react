import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateMolde, closeMolde } from './actions'

const UpdateMolde = ({ molde, message, closeMolde, updateMolde }) => {
   
  const [ moldeNumber, setMoldeNumber ] = useState(molde.moldeNumber)
  const [ moldeSerial, setMoldeSerial ] = useState(molde.moldeSerial)
  const [ cavities, setCavities ] = useState(molde.cavities)
  const [ lifecycles, setLifecycles ] = useState(molde.lifecycles)
  const [ shot, setShot ] = useState(molde.shot)
  const [ quantity, setQuantity ] = useState(molde.quantity)
  const [ active, setActive ] = useState(molde.active)
  
  const onClose = () =>{
    return closeMolde()
  }

  const onInputChange = e => {
    const { name, value } = e.target
      switch (name) {
        case 'moldeNumber':
          return setMoldeNumber(value)
        case 'moldeSerial':
          return setMoldeSerial(value)
        case 'cavities':
          const cavities = onNumChange(value)
          return setCavities(cavities)
        case 'lifecycles':
          const lifecycles = onNumChange(value)
          return setLifecycles(lifecycles)
        case 'shot':
          const shot = onNumChange(value)
          return setShot(shot)
        case 'quantity':
          const quantity = onNumChange(value)
          return setQuantity(quantity)
        default:  
          return
      }
  }

  const onNumChange = (num) => {
    const value = parseInt(num)
    if( isNaN(value) ){ return '' }
    else if( value === 0 ){ return '' }
    else { 
      return value
    }
  };

  const onActive = e =>{
    const value = e.target.value
    let bool;
    if(value === 'true'){
      bool = true
    } else {bool = false}
    return setActive(bool)
  }
    
    const onSubmit = e =>{
      e.preventDefault();
      const input = {
        moldeNumber,
        moldeSerial,
        cavities,
        lifecycles,
        shot,
        quantity,
        active
      }
      return updateMolde(molde._id, input);
    }

    const renderSubmit = () =>{
      if(cavities === '' || lifecycles === ''){return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input>}
      else{
        return <input type="submit" onSubmit={onSubmit} value="Submit"></input>
      }
    }

    const renderForm = () =>{
      if(message === 'new'){
        return ReactDOM.createPortal(
        <div className="Modal">
            <div className="modal-content">
              <h2>Update Injection Mold:</h2>
              <form onSubmit={onSubmit}>
                <table>
              <tbody> 
                <tr>
                  <td><label>Mold Number: </label></td>
                  <td><input type="text"
                    name='moldeNumber' 
                    value={moldeNumber}
                    onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                <td><label>Mold Serial: </label></td>
                <td><input type="text"
                  name='moldeSerial' 
                  value={moldeSerial }
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Cavities: </label></td>
                  <td><input type="number"
                    name='cavities' 
                    value={cavities}
                    onChange={onInputChange} min="1" required></input>
                  </td>
                </tr>
                <tr>
                  <td><label>Lifecycles: </label></td>
                  <td><input type="number"
                    name='lifecycles' 
                    value={lifecycles}
                    onChange={onInputChange} min="1" required></input>
                  </td>
                </tr>
                <tr>
                <td><label>Shot: </label></td>
                <td><input type="number"
                  name='shot' 
                  value={shot}
                  onChange={onInputChange} min="1" required></input>
                </td>
              </tr>
              <tr>
                <td><label>Quantity: </label></td>
                <td><input type="number"
                  name='quantity' 
                  value={quantity}
                  onChange={onInputChange} min="1" required></input>
                </td>
              </tr>
              <tr>
                  <td><label>Active: </label></td>
                  <td>
                    <input type="radio" id="true" name="active" value={true} onChange={onActive} checked={active === true } required></input>
                    <label htmlFor="true">Yes</label>
                    <input type="radio" id="false" name="active" value={false} onChange={onActive} checked={active === false } required></input>
                    <label htmlFor="false">No</label>
                  </td>
                </tr>
                <tr>
                <td></td>
                <td><Link to="/molds"><button>Cancel</button></Link>
                {renderSubmit()}
                </td>
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
              Something goes Wrong, Try again later <Link to="/molds"><button onClick={onClose}>Close</button></Link>
            </div>
          </div>,document.querySelector('#modal')
        );
      } else if(message === 'sucess'){
        return ReactDOM.createPortal(
          <div className="Modal">
            <div className="modal-content">
              Injection Mold updated correctly <Link to="/molds"><button onClick={onClose}>Close</button></Link>
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
    message: state.moldeMessage,
    molde: state.molde
})

export default connect(mapStateToProps, {updateMolde, closeMolde})(UpdateMolde)