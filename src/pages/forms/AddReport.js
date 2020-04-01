import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddReport extends Component {
  state= {
    shift: '',
    machine: '',
    programs: [],
    production: [],
    selected: []
  }

  onClose = () =>{
    this.props.close('programMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value)
  };

  onMachineChange = e =>{

    const programs = this.filterPrograms(e.target.value)
    this.setState({ [e.target.name]: e.target.value, programs: programs });
    
  }

  onSelect = e =>{
    let programs = [...this.state.selected];
    const id = e.target.name 
    //   machines.push(data.data.newMachine);
    const selected = this.state.selected.find( program => program._id === id);
    if(!selected){
      const getProgram = this.state.programs.find( program => program._id === id);
      const { _id, partNumber, moldeNumber, cycles, capacity } = {...getProgram}
      const item ={
        _id: _id,
        partNumber: partNumber,
        moldeNumber: moldeNumber,
        cycles: cycles,
        capacity: capacity
      }

      programs.push(item);
      this.setState({selected: programs});
      console.log('no esta', programs)
    } else{
      const items = this.state.selected.filter(program => program._id !== id);
    this.setState({ selected: items });
      console.log('si esta')
    }
  }

  onSubmit = e =>{
    e.preventDefault();
    // this.props.addProgram(this.state);
    
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

  filterPrograms = (value) =>{
     const programs =  this.props.programs.filter(program => {
       return program.machineNumber._id === value;
    });
    return programs
  }

  renderPrograms = () =>{
        return this.state.programs.map(( program ) => 
        <li key={program._id}>
          <input type='checkbox' onChange={this.onSelect} value={program._id} name={program._id}></input>
          <label htmlFor={program._id}>{program.moldeNumber.moldeNumber}</label>
        </li>);
     
  }

  renderProduction = () => {
    if(this.state.selected.length === 0){ return null}
      else {return this.state.selected.map(( production ) => 
      <tr key={production._id}>
        <td><label>Pieces OK: </label></td>
        <input type='text' onChange={this.onInputChange} name={production._id}></input>
    </tr>);
 
    }
  }

  renderButton= ()=>{
    if(this.state.programs.length === 0){
      return null
    } else {
      return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
    }
  }


  renderChoose = () =>{

    if(!this.state.machine){
      return
    } else {

    if(this.state.programs.length === 0){
      return <tr><td>program not found</td>
      <td><Link to="/programs/add"><button>Add Program</button></Link></td>
              </tr>
    }  else {
      return (
          <tr>
            <td>
              <label>Choose Mold: </label>       
            </td>
            <td>
              <ul className='program_list'>
                {this.renderPrograms()}
              </ul>                
            </td>
          </tr>
      )
    }
  }
  }

  render() {

  
  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content report_modal">
          <h2>Injection Production Report:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody>
          <tr>
              <td><label>Date: </label></td>
              <td>
              <input type="date" onChange={this.onInputChange}/>
              </td>
            </tr>
            <tr>
              <td><label>Shift: </label></td>
              <td>
                <select onChange={this.onInputChange} name="shift" defaultValue="" required>
                  <option disabled value="">select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                </select>
              </td>
            </tr> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td>
                <select onChange={this.onMachineChange} name="machine" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMachines()}
                </select>
              </td>
            </tr>
                {this.renderChoose()}
            <tr>
              <td><label>Production: </label></td>
            </tr>
            
              {this.renderProduction()}
            
            <tr>
            <td></td>
            <td><Link to="/reports"><button>Cancel</button></Link>
            {this.renderButton()}</td>
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