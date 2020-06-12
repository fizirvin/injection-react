import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddProgram extends Component {
  state= {
    machineNumber: '',
    moldeNumber:'',
    partNumber:'',
    cycleTime: 0,
    cycles: 0,
    capacity: 0
  }

  onClose = () =>{
    this.props.close('programMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onMoldeChange = e => {
    this.setState({ [e.target.name]: e.target.value,cycleTime: 0, cycles: 0, capacity: 0 });
  };

  inputValue = (name) => {
    const value = parseFloat(this.state[name])
    if( isNaN(value) ){ return '' }
    else if( value === 0 ){ return 0}
    else { 
      return value
    }
  };

  onNumChange = (e) => {
    const value = parseFloat(e.target.value)
    if( isNaN(value) ){ return this.setState({ [e.target.name]: '' }) }
    else if( value === 0 ){ return this.setState({ [e.target.name]: '' }) }
    else {
      const capacity = this.capacityValue(value)
      const cycles = this.cyclesValue(capacity) 
      return this.setState({ [e.target.name]: e.target.value, capacity, cycles });
    }
  };

  capacityValue = (cycleTime) => {
    const capacity = this.props.moldes.find( item => item._id === this.state.moldeNumber)
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

  cyclesValue = (cap) => {
    const capacity = this.props.moldes.find( item => item._id === this.state.moldeNumber)
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

  getCavities = () =>{
    const capacity = this.props.moldes.find( item => item._id === this.state.moldeNumber)
    if(!capacity){ return 0}
    else {
      return capacity.cavities
    }
  }

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
    <option key={model._id} value={model._id}>{model.partName}</option>);
  }

  renderCavities(){
    const value = this.getCavities()
    if(!value) { return null }
    else{ return <label>Cavities: {value}</label>} 
  }

  renderSubmit = () =>{
    const value = this.cyclesValue(this.state.capacity)
    if(!value){ return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input> }
    else{ return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input> }
  }


  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Program:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td>
                <select onChange={this.onInputChange} name="machineNumber" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMachines()}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Mold Number: </label></td>
              <td>
                <select onChange={this.onMoldeChange} name="moldeNumber" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMoldes()}
                </select> {this.renderCavities()}
              </td>
            </tr>
            <tr>
              <td><label>Model Name: </label></td>
              <td>
                <select onChange={this.onInputChange} name="partNumber" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderModels()}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Cycle Time: </label></td>
              <td><input type="number"
                name='cycleTime' 
                value={this.inputValue('cycleTime')}
                onChange={this.onNumChange} required></input></td>
            </tr>
            <tr>
              <td><label>Capacity: </label></td>
              <td><input type="number"
                name='capacity' 
                value={this.state.capacity}
                disabled
                required></input></td>
            </tr>
            <tr>
              <td><label>Cycles: </label></td>
              <td><input type="number"
                name='cycles'
                disabled 
                value={this.state.cycles}
                required></input></td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/programs"><button>Cancel</button></Link>
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

export default AddProgram;