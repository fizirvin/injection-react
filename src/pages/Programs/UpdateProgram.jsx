import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProgram, closeProgram } from './actions'
import { fetchMachines } from '../Machines/actions.js'
import { fetchModels } from '../Parts/actions.js'
import { fetchMoldes } from '../Moldes/actions.js'

const UpdateProgram = ({ program, machines, models, moldes, message, closeProgram, updateProgram, fetchMachines, fetchMoldes, fetchModels }) => {
  const [ machineNumber, setMachineNumber ] = useState(program.machineNumber)
  const [ moldeNumber, setMoldeNumber ] = useState(program.moldeNumber)
  const [ partNumber, setPartNumber ] = useState(program.partNumber)
  const [ cycleTime, setCycleTime ] = useState(program.cycleTime.$numberDecimal)
  const [ cycles, setCycles ] = useState(program.cycles)
  const [ capacity, setCapacity ] = useState(program.capacity)
    
  useEffect(() =>{
    if(machines.length === 0 ){
      return fetchMachines();
    } else {
      return
    } 
  },[machines])

  useEffect(() =>{
    if(moldes.length === 0 ){
      return fetchMoldes();
    } else {
      return
    } 
  },[moldes])

  useEffect(() =>{
    if(models.length === 0 ){
      return fetchModels();
    } else {
      return
    } 
  },[models])

  const onClose = () =>{
    return closeProgram()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'machineNumber':
        return setMachineNumber(value)
      case 'moldeNumber':
        return setMoldeNumber(value)
      case 'partNumber':
        return setPartNumber(value)
      default:  
        return
    }
  }

  const onMoldeChange = e => {
    const value = e.target.value
    setMoldeNumber(value)
    setCycleTime(0)
    setCycles(0)
    setCapacity(0)
  };

  const inputValue = ( ) => {
    const value = parseFloat(cycleTime)
    if( isNaN(value) ){ return '' }
    else if( value === 0 ){ return 0}
    else { 
      return value
    }
  };

  const onNumChange = (e) => {
    const value = parseFloat(e.target.value)
    if( isNaN(value) ){ return setCycles('') }
    else if( value === 0 ){ return setCycles('') }
    else {
      const capacity = capacityValue(value)
      const cycles = cyclesValue(capacity)
      setCycleTime(value)
      setCapacity(capacity)
      setCycles(cycles) 
    }
  };

  const capacityValue = (cycleTime) => {
    const capacity = moldes.find( item => item._id === moldeNumber)
    if(!capacity){ return 0}
    else {
      const value = parseInt(3600/cycleTime*capacity.cavities)
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  };
  
  const cyclesValue = (cap) => {
    const capacity = moldes.find( item => item._id === moldeNumber)
    if(!capacity){ return 0}
    else {
      const value = cap/capacity.cavities
      if( isNaN(value) ){ return 0 }
      else if( cap % capacity.cavities !== 0 ){ return 0}
      else if( value === 0 ){ return 0}
      else {
        return value
      }
    }
  };

  const getCavities = () =>{
    const capacity = moldes.find( item => item._id === moldeNumber)
    if(!capacity){ return 0}
    else {
      return capacity.cavities
    }
  }

  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      machineNumber,
      moldeNumber,
      partNumber,
      cycleTime,
      cycles,
      capacity
    }
    return updateProgram(program._id, input);
  }

  const renderMachines = () =>{
    return machines.map(( machine ) => 
    <option key={machine._id} value={machine._id}>{machine.machineNumber}</option>);
  }

  const renderMoldes = () =>{
    return moldes.map(( molde ) => 
    <option key={molde._id} value={molde._id}>{molde.moldeNumber}</option>);
  }

  const renderModels = () =>{
    return models.map(( model ) => 
    <option key={model._id} value={model._id}>{model.partName}</option>);
  }

  const renderCavities = () =>{
    const value = getCavities()
    if(!value) { return null }
    else{ return <label>Cavities: {value}</label>} 
  }

  const renderSubmit = () =>{
    const value = cyclesValue(capacity)
    if(!value){ return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input> }
    else{ return <input type="submit" onSubmit={onSubmit} value="Submit"></input> }
  }

  const renderForm = () =>{
    if( message === 'new'){
      return ReactDOM.createPortal(
      <div className="Modal">
          <div className="modal-content">
            <h2>Update Program:</h2>
            <form onSubmit={onSubmit}>
              <table>
            <tbody> 
              <tr>
                <td><label>Machine Number: </label></td>
                <td>
                  <select onChange={onInputChange} name="machineNumber" value={machineNumber} required>
                    <option disabled value="">select</option>
                    {renderMachines()}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label>Mold Number: </label></td>
                <td>
                  <select onChange={onMoldeChange} name="moldeNumber" value={moldeNumber} required>
                    <option disabled value="">select</option>
                    {renderMoldes()}
                  </select> {renderCavities()}
                </td>
              </tr>
              <tr>
                <td><label>Model Name: </label></td>
                <td>
                  <select onChange={onInputChange} name="partNumber" value={partNumber} required>
                    <option disabled value="">select</option>
                    {renderModels()}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label>Cycle Time: </label></td>
                <td><input type="number"
                  name='cycleTime' 
                  value={inputValue()}
                  onChange={onNumChange} required></input></td>
              </tr>
              <tr>
                <td><label>Capacity: </label></td>
                <td><input type="number"
                  name='capacity' 
                  value={capacity}
                  disabled
                  required></input></td>
              </tr>
              <tr>
                <td><label>Cycles: </label></td>
                <td><input type="number"
                  name='cycles'
                  disabled 
                  value={cycles}
                  required></input></td>
              </tr>
              <tr>
              <td></td>
              <td><Link to="/programs"><button>Cancel</button></Link>
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
    } else if( message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/programs"><button onClick={onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if( message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Program updated correctly <Link to="/programs"><button onClick={onClose}>Close</button></Link>
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
    program: state.program,
    message: state.programMessage,
    machines: state.machines,
    models: state.models,
    moldes: state.moldes
})

export default connect(mapStateToProps, {updateProgram, closeProgram, fetchMachines, fetchMoldes, fetchModels })(UpdateProgram)