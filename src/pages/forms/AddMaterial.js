import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddMaterial extends Component {
  state= {
    number: '',
    manufacturer: '',
    description: '',
    acronym: '',
    identification: '',
    type: '',
    unit: ''
  }

  onClose = () =>{
    this.props.close('materialMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.addMaterial(this.state);
  }

  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Injection Material:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody>
            <tr>
              <td><label>Part Number: </label></td>
              <td><input type="text"
              name='number' 
              value={this.state.number}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Manufacturer: </label></td>
              <td><input type="text"
              name='manufacturer' 
              value={this.state.manufacturer}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Description: </label></td>
              <td><input type="text"
              name='description' 
              value={this.state.description}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Acronym: </label></td>
              <td><input type="text"
              name='acronym' 
              value={this.state.acronym}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>ID: </label></td>
              <td><input type="text"
              name='identification' 
              value={this.state.identification}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Type: </label></td>
              <td><input type="text"
              name='type' 
              value={this.state.type}
              onChange={this.onInputChange} required></input></td>
            </tr> 
            <tr>
              <td><label>Unit: </label></td>
              <td><input type="text"
              name='unit' 
              value={this.state.unit}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/material"><button>Cancel</button></Link>
            <input type="submit" onSubmit={this.onSubmit} value="Submit"></input></td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  } else if(this.props.message === 'error'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Something goes Wrong, Try again later <Link to="/material"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Material added correctly <Link to="/material"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddMaterial;