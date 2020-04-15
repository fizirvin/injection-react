import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


class UpdateReport extends Component {
  state= {
    _id: this.props.match.params.id,
    date: '',
    shift: '',
    machine: '',
    time: 10,
    programs: [],
    selected: [],
    show: 'molds',
    downtime: []

  }

  async componentDidMount(){
      
    const getReport = await this.props.reports.find( report => report._id === this.props.match.params.id);

    if(!getReport) {
      return null
    } else {
      const { reportDate, shift, machine, production, downtimeDetail } = await getReport
      
      const date = this.formatDate(reportDate)
      const programs = this.filterPrograms(machine._id)
      
      const downtime = downtimeDetail.map( item => {
        
        const selection = {
          _id: item.issueId._id,
          issueName: item.issueId.issueName,
          mins: item.mins
        }
        return selection
      })

      const selected = production.map( item => {
        const getProgram = programs.find( program => program._id === item.program._id)
        console.log('hola', getProgram)
        const selection = {
          _id: getProgram._id,
          moldeNumber: item.molde,
          partNumber: item.partNumber,
          capacity: item.capacity,
          production: {
            program: getProgram._id, 
            partNumber: item.partNumber._id,
	          molde: item.molde._id,
            real: item.real,
            ok: item.ok,
	          ng: item.ng,
	          time: item.time,
	          oee: parseFloat(item.oee.$numberDecimal),
	          capacity: item.capacity
          }
        }
        return selection
      })
            
        this.setState({
          date: date,
          shift: shift,
          machine: machine._id,
          time: 10,
          programs: programs,
          selected: selected,
          show: 'molds',
          downtime: downtime
        })
    }
    
  }

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate()
    const m = date.getMonth()+1

    function M(){
      if(m < 10){
      return '0'+ m
    } else { return m}
  }
  function D(){
    if(d < 10){
      return '0'+ d
    } else { return d}
  }



  const formatD = D();
  const formatM = M();
    formatDate = y + '-'+ formatM + '-'+ formatD
    return formatDate
  }


  onMins = (e) =>{
    const value = parseInt(e.target.value)|0;
    let downtime = [...this.state.downtime];
    downtime[downtime.findIndex(el => el._id === e.target.name)].mins = value;
    return this.setState({downtime});
  }

  

 
  onRealProduction = async (e) =>{

    const value = parseInt(e.target.value)|0;
    let selected = [...this.state.selected];
    
    const ok = value - selected[selected.findIndex(el => el._id === e.target.name)].production.ng;
    const time = selected[selected.findIndex(el => el._id === e.target.name)].production.time;
    const capacity = selected[selected.findIndex(el => el._id === e.target.name)].capacity;
    const production = ok;
    const expected = capacity * time;
    const oee = parseInt((production/expected)*100)|0;
    selected[selected.findIndex(el => el._id === e.target.name)].production.real = value;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ok = ok;
    selected[selected.findIndex(el => el._id === e.target.name)].production.oee = oee;
    
    
    return this.setState({selected: selected});
  }

  onNGProduction = (e) =>{
    const value = parseInt(e.target.value)|0;
    let selected = [...this.state.selected];

    const ok = selected[selected.findIndex(el => el._id === e.target.name)].production.real - value;
    const time = selected[selected.findIndex(el => el._id === e.target.name)].production.time;
    const capacity = selected[selected.findIndex(el => el._id === e.target.name)].capacity;
    
    const expected = capacity * time;
    const oee = parseInt((ok/expected)*100)|0;
    selected[selected.findIndex(el => el._id === e.target.name)].production.oee = oee;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ng = value;
    selected[selected.findIndex(el => el._id === e.target.name)].production.ok = ok;
    return this.setState({selected});
  }

  onTimeProduction = (e) =>{
    const value = parseInt(e.target.value)|0;
    let selected = [...this.state.selected];

    
    selected[selected.findIndex(el => el._id === e.target.name)].production.time = value;
    const time = parseInt(e.target.value);
    const capacity = selected[selected.findIndex(el => el._id === e.target.name)].capacity
    const production = selected[selected.findIndex(el => el._id === e.target.name)].production.ok
    const expected = capacity * time
    const oee = parseInt((production/expected)*100)|0;
    selected[selected.findIndex(el => el._id === e.target.name)].production.oee = oee;
    return this.setState({selected});

  }

  getOK = (id) =>{
    let selected = [...this.state.selected];
    const real = selected[selected.findIndex(el => el._id === id)].production.real
    const ng = selected[selected.findIndex(el => el._id === id)].production.ng
    const ok = real - ng
    return isNaN(ok) ? 0 : ok;
  }

  getDefaultReal = (id) =>{
    let selected = [...this.state.selected];
    const real = selected[selected.findIndex(el => el._id === id)].production.real
    return isNaN(real) ? 0 : real;
  }

  getDefaultNG = (id) =>{
    let selected = [...this.state.selected];
    const ng = selected[selected.findIndex(el => el._id === id)].production.ng
    return isNaN(ng) ? 0 : ng;
  }

  getDefaultTime = (id) =>{
    let selected = [...this.state.selected];
    const time = selected[selected.findIndex(el => el._id === id)].production.time
    return isNaN(time) ? 0 : time;
  }

  getDefaultMins = (id) =>{
    let downtime = [...this.state.downtime];
    const mins = downtime[downtime.findIndex(el => el._id === id)].mins
    return isNaN(mins) ? 0 : mins;
  }

  getOEE = (id) =>{
    let selected = [...this.state.selected];
    const time = selected[selected.findIndex(el => el._id === id)].production.time
    const capacity = selected[selected.findIndex(el => el._id === id)].capacity
    const production = selected[selected.findIndex(el => el._id === id)].production.ok
    const expected = capacity * time
    const oee = parseInt((production/expected)*100);
    return isNaN(oee) ? 0 : oee;
  }

  totalReal = () =>{
    let selected = [...this.state.selected];
    const real = selected.reduce( (a, b) =>{
      return a + b.production.real || 0
    },0)
    
    return real
  }

  totalMins = () =>{
    let downtime = [...this.state.downtime];
    const mins = downtime.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    
    return mins
  }

  totalNG = () =>{
    let selected = [...this.state.selected];
    const ng = selected.reduce( (a, b) =>{
      return a + b.production.ng || 0
    },0)

    return isNaN(ng) ? 0 : ng;
  }

  totalOK = () =>{
    let selected = [...this.state.selected];
    const ok = selected.reduce( (a, b) =>{
      return a + b.production.ok || 0
    },0)

    return isNaN(ok) ? 0 : ok;
  }

  totalTIME = () =>{
    let selected = [...this.state.selected];
    const time = selected.reduce( (a, b) =>{
      return a + b.production.time || 0
    },0)

    return isNaN(time) ? 0 : time;
  }

  totalOEE = () =>{
    let selected = [...this.state.selected];
    const length = selected.length;
    const sum = selected.reduce( (a, b) =>{
      return a + b.production.oee || 0
    },0)
    const oee = sum/length

    return isNaN(oee) ? 0 : oee;
  }

  totalCapacity = () =>{
    let selected = [...this.state.selected];
   
    const capacity = selected.reduce( (a, b) =>{
      return a + (b.production.capacity * b.production.time) || 0
    },0)
    

    return isNaN(capacity) ? 0 : capacity;
  }



  onClose = () =>{
    this.props.close('reportMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    
  };

  onMachineChange = e =>{

    const selected = [];
    const programs = this.filterPrograms(e.target.value)
    this.setState({ [e.target.name]: e.target.value, programs, selected });
    
  }

  findDowntime = (id) =>{
    const select = this.state.downtime.find( downtime => downtime._id === id);
    return select ? true : false
  }

  findMolde = (id) =>{
    const select = this.state.selected.find( selected => selected._id === id);
    return select ? true : false
  }

  onSelectIssue = e =>{
    let downtime = [...this.state.downtime];
    const id = e.target.name 
    //   machines.push(data.data.newMachine);
    const select = this.state.downtime.find( downtime => downtime._id === id);
    if(!select){
      const getIssue = this.props.issues.find( issue => issue._id === id);
      const { _id, issueName } = {...getIssue}
      const item ={
        _id: _id,
        issueName: issueName,
        mins: 0
      }

      downtime.push(item);
      this.setState({downtime: downtime});
      
    } else{
      const items = this.state.downtime.filter(downtime => downtime._id !== id);
    this.setState({ downtime: items });
      
    }
  }

  onSelect = e =>{
    let programs = [...this.state.selected];
    const id = e.target.name 
    //   machines.push(data.data.newMachine);
    const selected = this.state.selected.find( program => program._id === id);
    if(!selected){
      const getProgram = this.state.programs.find( program => program._id === id);
      const { _id, partNumber, moldeNumber, capacity } = {...getProgram}
      const item ={
        _id: _id,
        moldeNumber: moldeNumber,
        partNumber: partNumber,
        capacity: capacity,
        production: {
          program: _id,
          partNumber: partNumber._id,
          molde: moldeNumber._id,
          real: 0,
          ng: 0,
          ok: 0,
          time: 0,
          oee: 0,
          capacity: capacity
        }
      }

      programs.push(item);
      this.setState({selected: programs});
      
    } else{
      const items = this.state.selected.filter(program => program._id !== id);
    this.setState({ selected: items });
      
    }
  }


  onSubmit = async (e) =>{
    e.preventDefault();

    const production = this.state.selected.map( item => item.production )
    const downtime = this.state.downtime.map( item => {
      return { issueId: item._id, mins: item.mins }
    })
    const _id = this.state._id;
    const totalReal= this.totalReal();
    const totalOK = this.totalOK();
    const totalNG = this.totalNG();
    const totalTime = this.totalTIME();
    const totalMins = this.totalMins();
    const totalOEE = this.totalOEE();
    const totalCapacity = this.totalCapacity();
    const date = this.state.date+'T00:00:00.000-06:00';
    const report = {
      _id: _id,
      date,
      shift: this.state.shift,
      machine: this.state.machine,
      totalReal,
      totalOK,
      totalNG,
      totalTime,
      totalMins,
      totalOEE,
      totalCapacity: totalCapacity,
      production,
      downtimeDetail: downtime
    }
    
    return this.props.updateReport(report)
  }


  renderMachines(){
    return this.props.machines.map(( machine ) => 
    <option key={machine._id} value={machine._id}>{machine.machineNumber}</option>);
  }

 

  filterPrograms = (value) =>{
     const programs =  this.props.programs.filter(program => {
       return program.machineNumber._id === value;
    });
    return programs
  }

  renderContainer = () =>{
    if(!this.state.machine){ return null } 
     else {
        return (<div className='checkbox-container'>
        {this.renderPrograms()}
  
      </div>)
    }
  }

  renderPrograms = () =>{
      if(this.state.show === 'molds'){
        if(this.state.programs.length === 0){
          return <div>program not found <Link to="/programs/add"><button>Add Program</button></Link></div>
        }else{return (this.state.programs.map(( program ) => 
          <div key={program._id} className='checkboxes'>
          <input type='checkbox' className='checkbox-input' checked={this.findMolde(program._id)} onChange={this.onSelect} value={program._id} name={program._id}></input>
          <label htmlFor={program._id}>{program.moldeNumber.moldeNumber}</label>
          </div>)
        )}
        
      } else{
        return (this.props.issues.map(( issue ) => 
        <div key={issue._id} className='checkboxes issuesboxes'>
        <input type='checkbox' className='checkbox-input' checked={this.findDowntime(issue._id)} onChange={this.onSelectIssue} value={issue._id} name={issue._id}></input>
        <label htmlFor={issue._id}>{issue.issueName}</label>
        </div>))
    }
  }

  renderTableDownTime = () =>{
    const downtime = this.state.downtime;
    if(!downtime){ 
      return null 
    }
    else{ 
      return downtime.map(( downtime ) =>
        <tr key={downtime._id}>
          <td className='production_row'>
            <label>{downtime.issueName}</label>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="840" defaultValue={this.getDefaultMins(downtime._id)} name={downtime._id} className='production_input' onChange={this.onMins} ></input>
          </td>
        </tr>  
      );
    }
  }
  renderProduction =  () =>{
    const selected = this.state.selected;
    
    if(!selected){ 
      return null 
    }
    else{ 
      return selected.map( program  => 
        
          <tr key={program._id}>
          <td className='production_row'>
            <label>{program.moldeNumber.moldeNumber}</label>
          </td>
          <td className='production_row'>
          <label>{program.partNumber.partNumber}</label>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" defaultValue={this.getDefaultReal(program._id)} name={program._id} className='production_input' onChange={this.onRealProduction} ></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" defaultValue={this.getDefaultNG(program._id)} name={program._id} className='production_input' onChange={this.onNGProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program._id} value={this.getOK(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="14" defaultValue={this.getDefaultTime(program._id)} name={program._id} className='production_input' onChange={this.onTimeProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program._id} value={this.getOEE(program._id)} disabled></input>
          </td>
      </tr> 
      );
    }
  }

  showMolds = ( ) => {
    return this.setState({show: 'molds'})
  }

  showIssues = ( ) => {
    return this.setState({show: 'issues'})
  }

  renderTitle = () =>{
    if(!this.state.machine){
      return
    } else { return(
    <div className='title_header'>
            <button type='button' onClick={this.showMolds}>Injection Molds</button>
            <button type='button' onClick={this.showIssues}>Downtime</button>
           </div>
    )
  }
}

  renderButton= ()=>{
    if(this.state.programs.length === 0){
      return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>
    } 
    else {
      if(this.state.downtime.length === 0){
        const totalReal = this.totalReal()
        if(totalReal === 0){
          return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>
        }
        else {return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>}
      }
      else {
        const totalMins = this.totalMins();
        if(totalMins === 0){
          return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>
        } 
        else {
          return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
        }
      }
    }
  }

  renderDownTable = () =>{
    if(!this.state.machine){
      return
    } else { 
      return (
        <table className='production_table-container'>
          <thead>
      <tr>
        <th className='production_table issueName'>Down Time</th>
        <th className='production_table mins'>Time (min)</th>
      </tr>
      </thead>
      <tbody>
        {this.renderTableDownTime()}
      </tbody>
      <tfoot>
      <tr>
        <th className='production_table'>Total</th>
      <th className='production_table mins'><input type='number' className='production_input' name='mins' value={this.totalMins()} disabled></input></th>

      </tr>
      </tfoot>
      </table>    
      )}
  }


  renderChoose = () =>{

    if(!this.state.machine){
      return
    } else {
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
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.totalOEE()} disabled></input></th>
      </tr>
      </tfoot>
      </table>    
      )
    }
  }

  renderTable = () => {
    if(!this.state.machine){ return null}else{
      return (<table>
        <tbody>
        <tr>
          <th className="report_header"><label>Date: </label> 
              <input type="date" name='date' className='date_input' defaultValue={this.state.date} onChange={this.onInputChange} required/>
          </th>
          <th className="report_header">
              <label>Shift: </label> 
              <select onChange={this.onInputChange} name="shift" defaultValue={this.state.shift} required>
                
                <option value='1'>1</option>
                <option value='2'>2</option>
              </select>
          </th>
          <th className="report_header"><label>Machine: </label>
              <select onChange={this.onMachineChange} name="machine" defaultValue={this.state.machine} required>
                
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
        </table>  )
    }
  }

  render() {

  
  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal-report">
        <div className="modal-report-content report_modal">
          <h2>Injection Production Report:</h2>
          <form onSubmit={this.onSubmit} className='report-form'>
                   
           {this.renderTable()}
           {this.renderTitle()}
          <div className='section_two'>
            {this.renderContainer()}
            <div className='downtime-table'>
              {this.renderDownTable()}
            </div>
          </div>
          {this.renderChoose()}
  
            
            
            
           
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
          Something goes Wrong, Try again later <Link to="/reports"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Injection Report updated correctly <Link to="/reports"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default UpdateReport;