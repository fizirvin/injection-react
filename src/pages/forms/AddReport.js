import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddReport extends Component {
  state= {
    machine: '',
    molde:'',
    model:'',
    cycles: 0,
    capacity: 0
  }

  onClose = () =>{
    this.props.close('programMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.addProgram(this.state);
    
  }


  renderMachines(){
    return this.props.machines.map(( machine ) => 
    <option key={machine._id} value={machine._id}>{machine.machineNumber}</option>);
  }

  renderMoldes(){
    return this.props.moldes.map(( molde ) => 
    <option key={molde._id} value={molde._id}>{molde.moldeNumber}</option>);
  }
  renderModels(){
    return this.props.models.map(( model ) => 
    <option key={model._id} value={model._id}>{model.partNumber}</option>);
  }

  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Injection Production Report:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td>
                <select onChange={this.onInputChange} name="machine" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMachines()}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Mold Number: </label></td>
              <td>
                <select onChange={this.onInputChange} name="molde" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMoldes()}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Part Number: </label></td>
              <td>
                <select onChange={this.onInputChange} name="model" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderModels()}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Cycles: </label></td>
              <td><input type="number"
                name='cycles' 
                value={this.state.cycles}
                onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Capacity: </label></td>
              <td><input type="number"
                name='capacity' 
                value={this.state.capacity}
                onChange={this.onInputChange} required></input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/programs"><button>Cancel</button></Link>
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
          Something goes Wrong, Try again later <Link to="/programs"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Program added correctly <Link to="/programs"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddReport;