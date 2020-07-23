import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { url_image, opts_image } from '../actions/config'


class UpdateWorker extends Component {
  state={
    file: '',
    imagePreviewUrl: '',
    active:'',
    number: '',
    firstname: '',
    lastname: '',
    gender: '',
    entry: '',
    department: '',
    area: '',
    position: '',
    team: '',
    filePath: '',
    message: '',
    entryNum: '',
    prevPhoto: '',
    button: false
  }

  componentDidMount(){
      
    const getWorker = this.props.profiles.find( worker => worker._id === this.props.match.params.id);
   
    this.setState({...getWorker})

}

    onSubmit = async e =>{
        e.preventDefault();
        this.setState({button: true})
        const { file } = this.state
        if(!file){
            const time = 'T00:00:00.000-06:00'
            const entry = String(this.state.entryNum) + time
            const input = {
                team: this.state.team,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                entry: entry,
                department: this.state.department,
                area: this.state.area,
                position: this.state.position,
                active: this.state.active
                
            }
            
            return this.props.updateWorker(this.state._id, input)

        } else {
            
            const formData =  new FormData(document.getElementById('form'))
            opts_image.body = formData;
            const res_image = await fetch(url_image, opts_image);
            const data3 = await res_image.json();
            const time = 'T00:00:00.000-06:00'
            const entry = String(this.state.entryNum) + time
            const input = { 
                team: this.state.team,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                entry: entry,
                department: this.state.department,
                area: this.state.area,
                position: this.state.position,
                picture_URL: data3.imageUrl,
                active: this.state.active
            }
            
            return this.props.updateWorker(this.state._id, input)
        }
        
    }

    onInput = e =>{
        this.setState({[e.target.name]: e.target.value})    
    }

    showState = () =>{
        console.log(this.state)
    }

    onChangeTime = e =>{
        
        this.setState({[e.target.name]: e.target.value}); 
    };

    onActiveChange = e => this.setState({active: !this.state.active})

    setPhotoUrl = () =>{
        return this.setState({prevPhoto: '', picture_URL: this.state.prevPhoto, message: ''})
    }
    
    imagePreview = () =>{
        
        if (!this.state.message && this.state.imagePreviewUrl || this.state.picture_URL) {
            
            return <div className="image-container" ><img src={this.state.imagePreviewUrl || this.state.picture_URL} alt="icon" width="150" height='150' /> </div>
        } 
        else if(this.state.message){
            return  <div>{this.state.message}<button type="button" onClick={this.setPhotoUrl}>Ok</button></div>
        }
        else{
            return null;
        }    
    }

    fileChangedHandler = e => {
        if(e.target.files.length === 1){
            const file = e.target.files[0]
            const filePath = e.target.value
            if(file.size >= 25000){
                const input = document.getElementById('image')
                input.value = ''
                console.log('too much', input.value)
                const prevPhoto = this.state.picture_URL
                return this.setState({filePath: '', prevPhoto, picture_URL: '', message: 'File is too big, please set a file smaller than 25 KB'})
            }
            else {
                const reader = new FileReader();
                
                reader.onloadend = () => {
                    this.setState({
                        imagePreviewUrl: reader.result,
                        file: file,
                        filePath
                    });
                }
        
                reader.readAsDataURL(file)
                console.log(file.size)
            }
        } else {
            return
        }
        
    }

    onClose = () =>{
        this.props.close('workerMessage');
      }
    
    renderOption(){
        if(this.props.message === 'sucess'){
            return <div className="modal-content">
                <h4>Employee Updated Correctly</h4>
                <Link to="/employees"><button type="button" onClick={this.onClose}>Close</button></Link>
            </div>
        }
        else if(this.props.message === 'error'){
            return <div className="modal-content">
                <h4>An error occurred, try again later</h4>
                <Link to="/employees"><button type="button" onClick={this.onClose}>Close</button></Link>
            </div>
        }
        else{
            return <div className="modal-content">
            <h2>Update Employee</h2>
            <form id='form' onSubmit={this.onSubmit} encType="multipart/form-data">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor='team'>Work Team: </label></td>
                            <td><select id='team' onChange={this.onInput} name='team' value={this.state.team} required>
                                    <option disabled value="">select</option>
                                    <option value="varias">Rutas Varias</option>
                                    <option value="amealco">Amealco</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor='firstname'>Firstname: </label></td>
                            <td><input onChange={this.onInput} value={this.state.firstname} name='firstname' type='text' id='firstname' maxLength='30' size='30' required></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='lastname'>Lastname: </label></td>
                            <td><input onChange={this.onInput} value={this.state.lastname} name='lastname' type='text' id='lastname' maxLength='30' size='30' required></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='gender'>Gender: </label></td>
                            <td><select id='gender' onChange={this.onInput} name='gender' value={this.state.gender} required>
                                    <option disabled value="">select</option>
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor='entry'>Entry Date: </label></td>
                            <td><input onChange={this.onChangeTime} name='entryNum' value={this.state.entryNum} type='date' id='entry' size='30' required></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='department'>Department: </label></td>
                            <td><select id='department' onChange={this.onInput} name='department' value={this.state.department} required>
                                    <option disabled value="">select</option>
                                    <option value="Production">Production</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor='area'>Area: </label></td>
                            <td><select id='area' onChange={this.onInput} name='area' value={this.state.area} required>
                                    <option disabled value="">select</option>
                                    <option value="Injection">Injection</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor='position'>Position: </label></td>
                            <td><select id='position' onChange={this.onInput} name='position' value={this.state.position} required>
                                    <option disabled value="">select</option>
                                    <option value="Operator">Operator</option>
                                    <option value="Inspector">Inspector</option>
                                    <option value="Leader">Leader</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Active: </label></td>
                            <td><input type="checkbox" 
                            name='active' 
                            checked={this.state.active}
                            onChange={this.onActiveChange}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='image'>Picture: </label></td>
                            <td><input type="file" name="image" id='image' onChange={this.fileChangedHandler} value={this.state.path} accept=".png, .jpg, .jpeg"></input></td>
                        </tr>
                    </tbody>
                </table>
                {this.imagePreview()}
                <Link to="/employees"><button type="button">Close</button></Link>
                {/* <button type="button" onClick={this.showState}>state</button> */}
                <input type="submit" value="Submit" disabled={this.state.button}></input>
            </form>
        </div>
        }

    }

    render(){
        return ReactDOM.createPortal(
            <div className="Modal">
            {this.renderOption()}
            </div>,document.querySelector('#modal')
        );
    }
}

export default UpdateWorker;