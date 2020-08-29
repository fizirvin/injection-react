import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addWorker, closeWorker } from './actions'

const AddWorker = ({ message, closeWorker, addWorker }) => {
  const [ file, setFile ] = useState('')
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState('')
  
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ entryNum, setEntryNum ] = useState('')
  const [ department, setDepartment ] = useState('Production')
  const [ area, setArea ] = useState('Injection')
  const [ position, setPosition ] = useState('')
  const [ team, setTeam ] = useState('')
  const [ filePath, setFilePath ] = useState('')
  const [ advice, setAdvice ] = useState('')
  const [ button, setButton ] = useState(false)  
    
  const onClose = () =>{
    return closeWorker()
  }

  const onInputChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'team':
        return setTeam(value)
      case 'firstname':
        return setFirstname(value)
      case 'lastname':
        return setLastname(value)
      case 'gender':
        return setGender(value)
      case 'department':
        return setDepartment(value)
      case 'area':
        return setArea(value)
      case 'position':
        return setPosition(value)
      case 'entryNum':
        return setEntryNum(value)  
      default:  
        return
    }
  }

   
  const onSubmit = async e =>{
    e.preventDefault();
    setButton(true)
    if(!file){
      const time = 'T00:00:00.000-06:00'
      const entry = String(entryNum) + time
      
      const input = { 
        team,
        firstname,
        lastname,
        gender,
        entry,
        department,
        area,
        position,  
      }
      return addWorker(input)
    } else {
      const formData =  new FormData(document.getElementById('form'))
      const time = 'T00:00:00.000-06:00'
      const entry = String(entryNum) + time
      const input = { 
        team,
        firstname,
        lastname,
        gender,
        entry,
        department,
        area,
        position
      }  
      return addWorker(input, formData)
    }
  }

  const imagePreview = () =>{
    if (imagePreviewUrl) {
      return <div className="image-container" ><img src={imagePreviewUrl} alt="icon" width="150" height='150' /> </div>
    } else{
      return  <div>{advice}</div>
    }    
  }

  const fileChangedHandler = e => {
    if(e.target.files.length === 1){
      const file = e.target.files[0]
      const filePath = e.target.value
      if(file.size >= 25000){
        const input = document.getElementById('image')
        input.value = ''
        console.log('too much', input.value)
        setFilePath('')
        return setAdvice('File is too big, please set a file smaller than 25 KB')
      }
      else {
        const reader = new FileReader();    
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result)
          setFile(file)
          setFilePath(filePath)
        }
        console.log(file.size)
        return reader.readAsDataURL(file)
      }
    } else {
      return
    }
  }

  const renderOption = ()=>{
    if( message === 'sucess'){
        return <div className="modal-content">
            <h4>New Employee Set Correctly</h4>
            <Link to="/employees"><button type="button" onClick={onClose}>Close</button></Link>
        </div>
    }
    else if( message === 'error'){
        return <div className="modal-content">
            <h4>An error occurred, try again later</h4>
            <Link to="/employees"><button type="button" onClick={onClose}>Close</button></Link>
        </div>
    }
    else{
        return <div className="modal-content">
        <h2>New Employee</h2>
        <form id='form' onSubmit={onSubmit} encType="multipart/form-data">
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor='team'>Work Team: </label></td>
                        <td><select id='team' onChange={onInputChange} name='team' value={team} required>
                                <option disabled value="">select</option>
                                <option value="varias">Rutas Varias</option>
                                <option value="amealco">Amealco</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor='firstname'>Firstname: </label></td>
                        <td><input onChange={onInputChange} name='firstname' type='text' id='firstname' maxLength='30' size='30' required></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='lastname'>Lastname: </label></td>
                        <td><input onChange={onInputChange} name='lastname' type='text' id='lastname' maxLength='30' size='30' required></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='gender'>Gender: </label></td>
                        <td><select id='gender' onChange={onInputChange} name='gender' value={gender} required>
                                <option disabled value="">select</option>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor='entry'>Entry Date: </label></td>
                        <td><input onChange={onInputChange} name='entryNum' value={entryNum} type='date' id='entry' size='30' required></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='department'>Department: </label></td>
                        <td><select id='department' onChange={onInputChange} name='department' value={department} required>
                                <option disabled value="">select</option>
                                <option value="Production">Production</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor='area'>Area: </label></td>
                        <td><select id='area' onChange={onInputChange} name='area' value={area} required>
                                <option disabled value="">select</option>
                                <option value="Injection">Injection</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor='position'>Position: </label></td>
                        <td><select id='position' onChange={onInputChange} name='position' value={position} required>
                                <option disabled value="">select</option>
                                <option value="Operator">Operator</option>
                                <option value="Inspector">Inspector</option>
                                <option value="Leader">Leader</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor='image'>Picture: </label></td>
                        <td><input type="file" name="image" id='image' onChange={fileChangedHandler} accept=".png, .jpg, .jpeg"></input></td>
                    </tr>
                </tbody>
            </table>
            {imagePreview()}
            <Link to="/employees"><button type="button">Close</button></Link>
            {/* <button type="button" onClick={this.showState}>state</button> */}
            <input type="submit" value="Submit" disabled={button}></input>
        </form>
    </div>
    }

}

  return ReactDOM.createPortal(
    <div className="Modal">
    {renderOption()}
    </div>,document.querySelector('#modal')
  ) 
};

const mapStateToProps = state =>({
    message: state.workerMessage
})

export default connect(mapStateToProps, {addWorker, closeWorker })(AddWorker)