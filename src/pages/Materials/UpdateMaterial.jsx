import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateMaterial, closeMaterial } from './actions'

const UpdateMaterial = ({ material, message, closeMaterial, updateMaterial }) => {
  const [ number, setNumber ] = useState(material.number)
  const [ manufacturer, setManufacturer ] = useState(material.manufacturer)
  const [ description, setDescription ] = useState(material.description)
  const [ acronym, setAcronym ] = useState(material.acronym)
  const [ identification, setIdentification ] = useState(material.identification)
  const [ type, setType ] = useState(material.type)
  const [ unit, setUnit ] = useState(material.unit)
  const [ color, setColor ] = useState(material.color)
  
  const onClose = () =>{
    return closeMaterial()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'number':
        return setNumber(value)
      case 'manufacturer':
        return setManufacturer(value)
        case 'description':
        return setDescription(value)
      case 'acronym':
        return setAcronym(value)
        case 'identification':
        return setIdentification(value)
      case 'type':
        return setType(value)
        case 'unit':
        return setUnit(value)
      case 'color':
        return setColor(value)
      default:  
        return
    }
  }
  
  const onSubmit = e =>{
    e.preventDefault();
    const input = {
      number,
      manufacturer,
      description,
      acronym,
      identification,
      type,
      unit,
      color
    }
    return updateMaterial(material._id, input);
  }

    const renderForm = () =>{
      if( message === 'new'){
        return ReactDOM.createPortal(
        <div className="Modal">
            <div className="modal-content">
              <h2>Update Injection Material:</h2>
              <form onSubmit={onSubmit}>
                <table>
              <tbody>
                <tr>
                  <td><label>Part Number: </label></td>
                  <td><input type="text"
                  name='number' 
                  value={number}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Manufacturer: </label></td>
                  <td><input type="text"
                  name='manufacturer' 
                  value={manufacturer}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Description: </label></td>
                  <td><input type="text"
                  name='description' 
                  value={description}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Color: </label></td>
                  <td><input type="text"
                  name='color' 
                  value={color}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Acronym: </label></td>
                  <td><input type="text"
                  name='acronym' 
                  value={acronym}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>ID: </label></td>
                  <td><input type="text"
                  name='identification' 
                  value={identification}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Type: </label></td>
                  <td><input type="text"
                  name='type' 
                  value={type}
                  onChange={onInputChange} required></input></td>
                </tr> 
                <tr>
                  <td><label>Unit: </label></td>
                  <td><input type="text"
                  name='unit' 
                  value={unit}
                  onChange={onInputChange} required></input></td>
                </tr>
                <tr>
                <td></td>
                <td><Link to="/material"><button>Cancel</button></Link>
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
              Something goes Wrong, Try again later <Link to="/material"><button onClick={onClose}>Close</button></Link>
            </div>
          </div>,document.querySelector('#modal')
        );
      } else if( message === 'sucess'){
        return ReactDOM.createPortal(
          <div className="Modal">
            <div className="modal-content">
              Material updated correctly <Link to="/material"><button onClick={onClose}>Close</button></Link>
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
    message: state.materialMessage,
    material: state.material
})

export default connect(mapStateToProps, {updateMaterial, closeMaterial})(UpdateMaterial)