import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { url_image, opts_image } from '../actions/config'

class UpdateWorker extends Component {
  state={
    file: '',
    imagePreviewUrl: '',
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
    entr: '2020-07-31'
  }

  componentDidMount(){
      
    const getWorker = this.props.profiles.find( worker => worker._id === this.props.match.params.id);
   
    this.setState({...getWorker})

}

    onSubmit = async e =>{
        e.preventDefault();
        
        const { file } = this.state
        if(!file){
            
            const input = { 
                team: this.state.team,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                entry: this.state.entry,
                department: this.state.department,
                area: this.state.area,
                position: this.state.position,
                
            }
            console.log(input)
            return this.props.newWorker(input)

        } else {
            
            const formData =  new FormData(document.getElementById('form'))
            opts_image.body = formData;
            const res_image = await fetch(url_image, opts_image);
            const data3 = await res_image.json();

            const input = { 
                team: this.state.team,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                entry: this.state.entry,
                department: this.state.department,
                area: this.state.area,
                position: this.state.position,
                picture_URL: data3.imageUrl
            }
            console.log(input)
            return this.props.newWorker(input)
        }
        
    }

    onInput = e =>{
        this.setState({[e.target.name]: e.target.value})    
    }

    showState = () =>{
        console.log(this.state)
    }

    onChangeTime = e =>{
        const time = 'T00:00:00.000-06:00'
        this.setState({[e.target.name]: String(e.target.value) + time}); 
    };
    
    imagePreview = () =>{
        if (this.state.imagePreviewUrl) {
            return <div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="150" height='150' /> </div>
        } else{
            return  <div>{this.state.message}</div>
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
                return this.setState({filePath: '', message: 'File is too big, please set a file smaller than 25 KB'})
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
                <h4>New Employee Set Correctly</h4>
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
            <h2>New Employee</h2>
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
                            <td><input onChange={this.onChangeTime} name='entry' type='date' id='entry' size='30' required></input></td>
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
                                    <option value="Inpsector">Inspector</option>
                                    <option value="Leader">Leader</option>
                                </select>
                            </td>
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
                {/* <input type="submit" value="Submit"></input> */}
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