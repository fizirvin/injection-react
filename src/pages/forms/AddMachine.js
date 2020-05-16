import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddMachine extends Component {
  state= {
      machineNumber:'',
      machineSerial: '',
      closingForce: '',
      spindleDiameter: ''
  }

    onClose = () =>{
      this.props.close('machineMessage')
    }

    onInputChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    onNumChange = (e) => {
      const value = parseInt(e.target.value)
      if( isNaN(value) ){ return this.setState({ [e.target.name]: '' }) }
      else if( value === 0 ){ return this.setState({ [e.target.name]: '' }) }
      else { 
        console.log('meti')
        return this.setState({ [e.target.name]: e.target.value });
      }
    };
  
    inputValue = (name) => {
      const value = parseInt(this.state[name])
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return ''}
      else { 
        return value
      }
    };

    onSubmit = e =>{
      e.preventDefault();
      this.props.addMachine(this.state);
    }

    renderSubmit = () =>{
      if(this.state.closingForce === '' | this.state.spindleDiameter === ''){return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>}
      else{
        return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
      }
    }


  render() {


    if(this.props.message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
        <div className="modal-content">
          <h2>Add New Machine:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td><input type="text" 
              name='machineNumber' 
              value={this.state.machineNumber}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td><label>Machine Serial: </label></td>
            <td><input type="text"
              name='machineSerial' 
              value={this.state.machineSerial}
              onChange={this.onInputChange} required>
                </input></td>
            </tr>
            <tr>
              <td><label>Closing Force: </label></td>
              <td><input type="number"
                name='closingForce' 
                value={this.inputValue('closingForce')}
                onChange={this.onNumChange} min="1" required></input>
              </td>
            </tr>
            <tr>
              <td><label>Spindle Diameter: </label></td>
              <td><input type="number"
                name='spindleDiameter' 
                value={this.inputValue('spindleDiameter')}
                onChange={this.onNumChange} min="1" required></input>
              </td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/machines"><button>Cancel</button></Link>
            {this.renderSubmit()}</td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
        </div>,
        document.querySelector('#modal')
      );
    } 
    else if(this.props.message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/machines"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if(this.props.message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            New Injection Machine added correctly <Link to="/machines"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
  }
};

export default AddMachine;