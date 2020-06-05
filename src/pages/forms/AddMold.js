import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddMold extends Component {
  state= {
    moldeNumber:'',
    moldeSerial: '',
    cavities: '',
    lifecycles: ''
  }

  onClose = () =>{
    this.props.close('moldeMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCavitieChange = (e) => {
    const value = parseInt(e.target.value)
    if( isNaN(value) ){ return this.setState({ [e.target.name]: '' }) }
    else if( value === 0 ){ return this.setState({ [e.target.name]: '' }) }
    else { 
      
      return this.setState({ [e.target.name]: e.target.value });
    }
  };

  cavitieValue = (name) => {
    const value = parseInt(this.state[name])
    if( isNaN(value) ){ return '' }
    else if( value === 0 ){ return ''}
    else { 
      return value
    }
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.addMolde(this.state);
  }

  renderSubmit = () =>{
    if(this.state.cavities === '' || this.state.lifecycles === ''){return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>}
    else{
      return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
    }
  }


  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Injection Mold:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Mold Number: </label></td>
              <td><input type="text"
                name='moldeNumber' 
                value={this.state.moldeNumber}
                onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td><label>Mold Serial: </label></td>
            <td><input type="text"
              name='moldeSerial' 
              value={this.state.moldeSerial }
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Cavities: </label></td>
              <td><input type="number"
                name='cavities' 
                value={this.cavitieValue('cavities')}
                onChange={this.onCavitieChange} min="1" required></input>
              </td>
            </tr>
            <tr>
              <td><label>Lifecycles: </label></td>
              <td><input type="number"
                name='lifecycles' 
                value={this.cavitieValue('lifecycles')}
                onChange={this.onCavitieChange} min="1" required></input>
              </td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/molds"><button>Cancel</button></Link>
            {this.renderSubmit()}
            </td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  }else if(this.props.message === 'error'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Something goes Wrong, Try again later <Link to="/molds"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Mold added correctly <Link to="/molds"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddMold;