import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateProgram extends Component {
  state= {
    _id:''
  }

  componentDidMount(){
      
    const getProgram = this.props.programs.find( program => program._id === this.props.match.params.id);
    const { _id, machineNumber, partNumber, moldeNumber, cycles, capacity } = {...getProgram}
    if(!machineNumber){
      return 
    } else {
      this.setState({_id: _id, 
        machine: machineNumber._id, 
        model: partNumber._id, 
        molde: moldeNumber._id,
        cycles: cycles,
        capacity: capacity})
    }
  
}

  onClose = () =>{
    this.props.close('programMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateProgram(this.state);
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

  condition = () =>{
    if(!this.state._id){
      return
    } else{
      
    return (
      
    <form onSubmit={this.onSubmit}>
    <table>
  <tbody> 
    <tr>
      <td><label>Machine Number: </label></td>
      <td>
        <select onChange={this.onInputChange} defaultValue={this.state.machine} name="machine" required>
         
          {this.renderMachines()}
        </select>
      </td>
    </tr>
    <tr>
      <td><label>Mold Number: </label></td>
      <td>
        <select onChange={this.onInputChange} name="molde" defaultValue={this.state.molde} required>
          
          {this.renderMoldes()}
        </select>
      </td>
    </tr>
    <tr>
      <td><label>Part Number: </label></td>
      <td>
        <select onChange={this.onInputChange} name="model" defaultValue={this.state.model} required>
          {this.renderModels()}
        </select>
      </td>
    </tr>
    <tr>
      <td><label>Cycles: </label></td>
      <td><input type="number"
        name='cycles' 
        defaultValue={this.state.cycles}
        onChange={this.onInputChange} required></input></td>
    </tr>
    <tr>
      <td><label>Capacity: </label></td>
      <td><input type="number"
        name='capacity' 
        defaultValue={this.state.capacity}
        onChange={this.onInputChange} required></input></td>
    </tr>
    
    <tr>
    <td></td>
    <td><Link to="/programs"><button>Cancel</button></Link>
    <input type="submit" onSubmit={this.onSubmit} value="Submit"></input></td>
    </tr>



  </tbody>
  </table>         
  </form> )}
  }

  render() {
   
    
  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Update Injection Mold:</h2>
          
           { this.condition()}

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  }else if(this.props.message === 'error'){
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
          Injection Program updated correctly <Link to="/programs"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default UpdateProgram;