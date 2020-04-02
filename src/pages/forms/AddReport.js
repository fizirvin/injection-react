import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddReport extends Component {
  state= {
    date: '',
    shift: '',
    machine: '',
    time: 10,
    programs: [],
    production: [],
    selected: []
  }


  showState = () =>{
    console.log(this.state)
  }

  onRealProduction = async (e) =>{

    const value = parseInt(e.target.value);
    let selected = [...this.state.selected];
    const ok = value - selected[selected.findIndex(el => el._id === e.target.name)].production.ng;
    selected[selected.findIndex(el => el._id === e.target.name)].production.real = value;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ok = ok;
    this.setState({selected});
  }

  onNGProduction = (e) =>{
    const value = parseInt(e.target.value);
    let selected = [...this.state.selected];

    const ok = selected[selected.findIndex(el => el._id === e.target.name)].production.real - value;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ng = value;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ok = ok;
    this.setState({selected});
  }

  onTimeProduction = (e) =>{
    const value = parseInt(e.target.value);
    let selected = [...this.state.selected];

    
    selected[selected.findIndex(el => el._id === e.target.name)].production.time = value;
   
    this.setState({selected});

  }

  getOK = (id) =>{
    let selected = [...this.state.selected];
    const real = selected[selected.findIndex(el => el._id === id)].production.real
    const ng = selected[selected.findIndex(el => el._id === id)].production.ng
    return real - ng
  }

  getOEE = (id) =>{
    let selected = [...this.state.selected];
    const time = selected[selected.findIndex(el => el._id === id)].production.time
    const capacity = selected[selected.findIndex(el => el._id === id)].capacity
    const production = selected[selected.findIndex(el => el._id === id)].production.ok
    const expected = capacity * time
    const oee = parseInt((production/expected)*100)|0;
    return oee
  }

  totalReal = () =>{
    let selected = [...this.state.selected];
    const real = selected.reduce( (a, b) =>{
      return a + b.production.real || 0
    },0)

    return real
  }

  totalNG = () =>{
    let selected = [...this.state.selected];
    const ng = selected.reduce( (a, b) =>{
      return a + b.production.ng || 0
    },0)

    return ng
  }

  totalOK = () =>{
    let selected = [...this.state.selected];
    const ok = selected.reduce( (a, b) =>{
      return a + b.production.ok || 0
    },0)

    return ok
  }

  totalTIME = () =>{
    let selected = [...this.state.selected];
    const time = selected.reduce( (a, b) =>{
      return a + b.production.time || 0
    },0)

    return time
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
        capacity: capacity,
        production: {
          real: 0,
          ng: 0,
          ok: 0,
          time: 0
        }
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
    if(this.state.programs.length === 0){
      return null
    } 
    else{
      return (this.state.programs.map(( program ) => 
        <div key={program._id} className='checkboxes'>
        <input type='checkbox' className='checkbox-input' onChange={this.onSelect} value={program._id} name={program._id}></input>
        <label htmlFor={program._id}>{program.moldeNumber.moldeNumber}</label>
        </div>)
      );
    }
  }

  renderProduction = () =>{
    const selected = this.state.selected;
    if(!selected){ 
      return null 
    }
    else{ 
      return selected.map(( program ) =>
        <tr key={program._id}>
          <td className='production_row'>
            <label>{program.moldeNumber.moldeNumber}</label>
          </td>
          <td className='production_row'>
          <label>{program.partNumber.partNumber}</label>
          </td>
          <td className='production_row'>
            <input type='number' defaultValue={0} name={program._id} className='production_input' onChange={this.onRealProduction} ></input>
          </td>
          <td className='production_row'>
            <input type='number' defaultValue={0} name={program._id} className='production_input' onChange={this.onNGProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program._id} value={this.getOK(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' defaultValue={0} name={program._id} className='production_input' onChange={this.onTimeProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program._id} value={this.getOEE(program._id)} disabled></input>
          </td>
        </tr>  
      );
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
        <table className='production_table-container'>
          <thead>
      <tr>
        <th className='production_table molde'>Mold</th>
        <th className='production_table model'>PartNumber</th>
        <th className='production_table pcs'>Real (pcs)</th>
        <th className='production_table ng'>NG (pcs)</th>
        <th className='production_table ok'>OK (pcs)</th>
        <th className='production_table ok'>Time (hrs)</th>
        <th className='production_table ok'>OEE%</th>
      </tr>
      </thead>
      <tbody>
        {this.renderProduction()}
      </tbody>
      <tfoot>
      <tr>
        <th></th>
        <th className='production_table model'>Total</th>
      <th className='production_table pcs'><input type='number' className='production_input' name='real' value={this.totalReal()} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.totalNG()} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.totalOK()} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.totalTIME()} disabled></input></th>
        <th className='production_table ok'>OEE%</th>
      </tr>
      </tfoot>
      </table>    
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
            <th className="report_header"><label>Date: </label> 
                <input type="date" name='date' className='date_input' onChange={this.onInputChange} required/>
            </th>
            <th className="report_header">
                <label>Shift: </label> 
                <select onChange={this.onInputChange} name="shift" defaultValue="" required>
                  <option disabled value="">select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                </select>
            </th>
            <th className="report_header"><label>Machine: </label>
                <select onChange={this.onMachineChange} name="machine" defaultValue="" required>
                  <option disabled value="">select</option>
                  {this.renderMachines()}
                </select>
            </th>
            <th className="report_header">
                <label>Time (hrs): </label>
                <input type="number" 
                className='time_input' 
                name='time'
                value={this.state.time} onChange={this.onInputChange} required/>
            </th>
          </tr>
          </tbody>
          </table>         
           
           <div className='title_header'>
            Injection Molds:

           </div>

          <div className='checkbox-container'>
          {this.renderPrograms()}

          </div>
          
          {this.renderChoose()}
  
            
            
            
            <button type='button' onClick={this.showState}>state</button>
            <Link to="/reports"><button>Cancel</button></Link>
            {this.renderButton()}
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