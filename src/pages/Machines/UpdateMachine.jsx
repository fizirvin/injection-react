import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateMachine, closeMachine } from './actions'

const UpdateMachine = ({ machine, message, closeMachine, updateMachine }) => {
   
    const [ machineNumber, setMachineNumber ] = useState(machine.machineNumber)
    const [ machineSerial, setMachineSerial ] = useState(machine.machineSerial)
    const [ closingForce, setClosingForce ] = useState(machine.closingForce)
    const [ spindleDiameter, setSpindleDiameter ] = useState(machine.spindleDiameter)

    const onClose = () =>{
        return closeMachine()
    }

    const onInputChange = e => {
      const { name, value } = e.target
      switch (name) {
        case 'machineNumber':
          return setMachineNumber(value)
        case 'machineSerial':
          return setMachineSerial(value)
        case 'spindleDiameter':
          const spindle = onNumChange(value)
          return setSpindleDiameter(spindle)
        case 'closingForce':
          const closing = onNumChange(value)
          return setClosingForce(closing)
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
  
    const onSubmit = e =>{
      e.preventDefault();
      const input = {
        machineNumber,
        machineSerial,
        closingForce,
        spindleDiameter,
      }
      return updateMachine(machine._id, input);
    }

    const renderSubmit = () =>{
      if(closingForce === '' | spindleDiameter === ''){return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input>}
      else{
        return <input type="submit" onSubmit={onSubmit} value="Submit"></input>
      }
    }

    const renderForm = () =>{
      if(message === 'new'){
        return ReactDOM.createPortal(
          <div className="Modal">
          <div className="modal-content">
            <h2>Update Machine:</h2>
            <form onSubmit={onSubmit}>
              <table>
            <tbody> 
              <tr>
                <td><label>Machine Number: </label></td>
                <td><input type="text" 
                name='machineNumber' 
                value={machineNumber}
                onChange={onInputChange} required></input></td>
              </tr>
              <tr>
              <td><label>Machine Serial: </label></td>
              <td><input type="text"
                name='machineSerial' 
                value={machineSerial}
                onChange={onInputChange} required>
                  </input></td>
              </tr>
              <tr>
                <td><label>Closing Force: </label></td>
                <td><input type="number"
                  name='closingForce' 
                  value={closingForce}
                  onChange={onInputChange} min="1" required></input>
                </td>
              </tr>
              <tr>
                <td><label>Spindle Diameter: </label></td>
                <td><input type="number"
                  name='spindleDiameter' 
                  value={spindleDiameter}
                  onChange={onInputChange} min="1" required></input>
                </td>
              </tr>
              <tr>
              <td></td>
              <td><Link to="/machines"><button>Cancel</button></Link>
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
              Something goes Wrong, Try again later <Link to="/machines"><button onClick={onClose}>Close</button></Link>
            </div>
          </div>,document.querySelector('#modal')
        );
      } else if(message === 'sucess'){
        return ReactDOM.createPortal(
          <div className="Modal">
            <div className="modal-content">
            Machine updated correctly <Link to="/machines"><button onClick={onClose}>Close</button></Link>
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
    message: state.machineMessage,
    machine: state.machine
})

export default connect(mapStateToProps, {updateMachine, closeMachine})(UpdateMachine)