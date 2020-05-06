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
    selected: [],
    show: 'molds',
    downtime: [],
    defects: [],
    resines: [] 

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
    
    const ok = value - selected[selected.findIndex(el => el.program === e.target.name)].production.ng;
    const time = selected[selected.findIndex(el => el.program === e.target.name)].production.time;
    const capacity = selected[selected.findIndex(el => el.program === e.target.name)].capacity;
    const production = ok;
    const expected = capacity * time;
    const preoee = (production/expected)*100
    const oee = this.precise_round(preoee, 1)
    // const oee = parseInt((production/expected)*100)|0;
    selected[selected.findIndex(el => el.program === e.target.name)].production.real = value;
    selected[selected.findIndex(el => el.program === e.target.name)].production.ok = ok;
    selected[selected.findIndex(el => el.program === e.target.name)].production.oee = oee;
    
    
    return this.setState({selected: selected});
  }

  onDefect = (e) =>{
    const value = parseInt(e.target.value)|0;
    const programId = e.target.name;
    const id = e.target.id;

    

    let defects = [...this.state.defects];
    defects[defects.findIndex(defect => defect.program === programId && defect.defect === id)].defectPcs = value

    return this.setState({defects});
  }

  onResine = (e) =>{
    const value = parseInt(e.target.value)|0;
    
    let resines = [...this.state.resines];
    const id = e.target.name;

    resines[resines.findIndex(resine => resine.resine === id)].purge = value

    return this.setState({resines});
  }

  onNGProduction = (e) =>{
    const value = parseInt(e.target.value)|0;
    let selected = [...this.state.selected];

    const ok = selected[selected.findIndex(el => el.program === e.target.name)].production.real - value;
    const time = selected[selected.findIndex(el => el.program === e.target.name)].production.time;
    const capacity = selected[selected.findIndex(el => el.program === e.target.name)].capacity;
    
    const expected = capacity * time;
    const preoee = (ok/expected)*100
    const oee = this.precise_round(preoee, 1)
    // const oee = parseInt((ok/expected)*100)|0;
    selected[selected.findIndex(el => el.program === e.target.name)].production.oee = oee;
    selected[selected.findIndex(el => el.program === e.target.name)].production.ng = value;
    selected[selected.findIndex(el => el.program === e.target.name)].production.ok = ok;
    return this.setState({selected});
  }

  onTimeProduction = (e) =>{
    
    const prevalue = parseFloat(e.target.value);
    const value = this.precise_round(prevalue, 2);
    let selected = [...this.state.selected];
    
    
    
    selected[selected.findIndex(el => el.program === e.target.name)].production.time = value;
    const time = value;
    const capacity = selected[selected.findIndex(el => el.program === e.target.name)].capacity
    const production = selected[selected.findIndex(el => el.program === e.target.name)].production.ok
    const expected = capacity * time
    const preoee = (production/expected)*100
    const oee = this.precise_round(preoee, 1)
    selected[selected.findIndex(el => el.program === e.target.name)].production.oee = oee;
    
    return this.setState({selected});

  }

  precise_round(num, dec){
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  getOK = (id) =>{
    let selected = [...this.state.selected];
    const real = selected[selected.findIndex(el => el.program === id)].production.real
    const ng = selected[selected.findIndex(el => el.program === id)].production.ng
    const ok = real - ng
    return isNaN(ok) ? 0 : ok;
  }

  getOEE = (id) =>{
    let selected = [...this.state.selected];
    const time = selected[selected.findIndex(el => el.program === id)].production.time
    const capacity = selected[selected.findIndex(el => el.program === id)].capacity
    const production = selected[selected.findIndex(el => el.program === id)].production.ok
    const expected = capacity * time
    const preoee = (production/expected)*100
    const oee = this.precise_round(preoee, 1)
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

  totalDefectPcs = () =>{
    let defects = [...this.state.defects];
    const pcs = defects.reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    return isNaN(pcs) ? 0 : pcs;
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
    const preoee = sum/length
    const oee = this.precise_round(preoee, 1)
    return isNaN(oee) ? 0 : oee;
  }

  totalCapacity = () =>{
    let selected = [...this.state.selected];
   
    const capacity = selected.reduce( (a, b) =>{
      return a + (b.production.capacity * b.production.time) || 0
    },0)

    const value = parseInt(capacity)
    

    return isNaN(value) ? 0 : value;
  }



  onClose = () =>{
    this.props.close('reportMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    
  };

  onInputTimeChange = e => {
    
    const prevalue = parseInt(e.target.value)
    const value = isNaN(prevalue)? 0 : prevalue
    
    this.setState({ [e.target.name]: value });
    
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
    const select = this.state.selected.find( selected => selected.program === id);
    return select ? true : false
  }

  findDefect = (program, id) =>{
    const select = this.state.defects.find( defect => defect.program === program && defect.defect === id);
    return select ? true : false
  }

  findResine = (id) =>{
    const select = this.state.resines.find( resine => resine.resine === id );
    return select ? true : false
  }

  disabledResine = (id) =>{
    const select = this.state.resines.find( resine => resine.resine === id);
    return select ? false : true
  }


  disabledDefect = (program, id) =>{
    const select = this.state.defects.find( defect => defect.program === program && defect.defect === id);
    return select ? false : true
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

  onSelectDefect = e =>{
    let defects = [...this.state.defects];
    const id = e.target.value
    const programId = e.target.name 
    
    const selected = this.state.defects.find( defect => defect.program === programId && defect.defect === id);
    if(!selected){
      const getProgram = this.state.programs.find( program => program._id === programId);
      const { _id, partNumber, moldeNumber } = {...getProgram}
      const item ={
          defect: id,
          program: _id,
          partNumber: partNumber._id,
          molde: moldeNumber._id,
          defectPcs: 0
      }

      defects.push(item);
      this.setState({defects: defects});
      
    } else{

      const defect = defects[defects.findIndex(defect => defect.program === programId && defect.defect === id)]
      const items = this.state.defects.filter(item => item !== defect);
      
    this.setState({ defects: items });
      
    }
  }

  onSelectResine = e =>{
    let resines = [...this.state.resines];
    const id = e.target.name
    
    const selected = this.state.resines.find( resine => resine.resine === id);
    if(!selected){
      const getResine = this.props.material.find( material => material._id === id);
      const { _id } = {...getResine}
      const item ={
        resine: _id,
        purge: 0
      }
      
      resines.push(item);
      this.setState({resines: resines});
      
    } else{

      const items = this.state.resines.filter( resine => resine.resine !== id);
      
    this.setState({ resines: items });
      
    }
  }

  onSelect = e =>{
    let programs = [...this.state.selected];
    const id = e.target.name 
    //   machines.push(data.data.newMachine);
    const selected = this.state.selected.find( program => program.program === id);
    if(!selected){
      const getProgram = this.state.programs.find( program => program._id === id);
      const { _id, partNumber, moldeNumber, capacity } = {...getProgram}
      const item ={
        program: _id, //id del programa
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
      const items = this.state.selected.filter(program => program.program !== id);
    this.setState({ selected: items });
      
    }
  }


  onSubmit = async (e) =>{
    e.preventDefault();

    const production = this.state.selected.map( item => item.production )
    const defects = this.state.defects;
    const resines = this.state.resines;
    const downtime = this.state.downtime.map( item => {
      return { issueId: item._id, mins: item.mins }
    })
    
    const totalReal= this.totalReal();
    const totalOK = this.totalOK();
    const totalNG = this.totalNG();
    const totalTime = this.totalTIME();
    const totalMins = this.totalMins();
    const totalOEE = this.totalOEE();
    const totalCapacity = this.totalCapacity();
    const date = this.state.date+'T00:00:00.000-06:00';
    const report = {
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
      downtimeDetail: downtime,
      defects: defects,
      resines: resines
    }
    
    return this.props.addReport(report)
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
          <label htmlFor={program._id}>{program.moldeNumber.moldeNumber} model: {program.partNumber.partNumber}</label>
          </div>)
        )}
        
      } else if(this.state.show === 'issues'){
        return (this.props.issues.map(( issue ) => 
        <div key={issue._id} className='checkboxes issuesboxes'>
        <input type='checkbox' className='checkbox-input' checked={this.findDowntime(issue._id)} onChange={this.onSelectIssue} value={issue._id} name={issue._id}></input>
        <label htmlFor={issue._id}>{issue.issueName}</label>
        </div>))
    } else if(this.state.show === 'purge'){
      return this.renderResinesTable()
  } 
    
    else{
      return this.renderDefectsTable()
    }
  }

  renderResinesTable = () =>{
    const selected = this.state.selected
    if(selected.length === 0){ return <div>choose Molde</div>}
    else{
      return(<table className='defect-table'>
          <thead>
            <tr>
              <th className='defect-header-table'>Resine</th>
              <th className='pcs-header-table'>Purge (g)</th>
            </tr>
          </thead>
          <tbody>
            {this.renderResineRows()}
          </tbody>
        </table>)
    }
  }


  renderResineRows = () =>{
    const material = this.props.material.filter( item => item.type === 'resine')
    return (material.map(( material ) => 
        <tr key={material._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
        <input type='checkbox' className='checkbox-defect-input' checked={this.findResine(material._id)} name={material._id} onChange={this.onSelectResine}></input>
        <label className='label-defect-body' htmlFor={material._id}>{material.description}</label>

          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' name={material._id} id={material._id} onChange={this.onResine} disabled={this.disabledResine(material._id)} defaultValue={0} className='input-defect-number'></input>
          </td>
        </tr>))
  }


  renderDefectsRows = (program) =>{
     return (this.props.defects.map(( defect ) => 
        <tr key={defect._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
        <input type='checkbox' className='checkbox-defect-input' checked={this.findDefect(program, defect._id)} value={defect._id} name={program} onChange={this.onSelectDefect}></input>
        <label className='label-defect-body' htmlFor={defect._id}>{defect.defectName}</label>

          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' name={program} id={defect._id} onChange={this.onDefect} disabled={this.disabledDefect(program, defect._id)} defaultValue={0} className='input-defect-number'></input>
          </td>
        </tr>))
  }

  renderDefectsTable = () =>{
    const selected = this.state.selected
    if(selected.length === 0){ return <div>choose Molde</div>}
    else{
      return (selected.map( item =>{ 
        return(<table key={item.program} className='defect-table'>
          <thead>
            <tr>
              <th colSpan='2' className='defect-table-molde'>{item.moldeNumber.moldeNumber}-{item.partNumber.partNumber}</th>
            </tr>
            <tr>
              <th className='defect-header-table'>Defect</th>
              <th className='pcs-header-table'>pcs</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDefectsRows(item.program)}
          </tbody>
        </table>)
      }))
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
            <input type='number' min="0" max="840" defaultValue={0} name={downtime._id} className='production_input' onChange={this.onMins} ></input>
          </td>
        </tr>  
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
        <tr key={program.program}>
          <td className='production_row'>
            <label>{program.moldeNumber.moldeNumber}</label>
          </td>
          <td className='production_row'>
          <label>{program.partNumber.partNumber}</label>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" defaultValue={0} name={program.program} className='production_input' onChange={this.onRealProduction} ></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" defaultValue={0} name={program.program} className='production_input' onChange={this.onNGProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program.program} value={this.getOK(program.program)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="14" defaultValue={0} name={program.program} className='production_input' onChange={this.onTimeProduction}></input>
          </td>
          <td className='production_row'>
          <input type='number' className='production_input' name={program.program} value={this.getOEE(program.program)} disabled></input>
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

  showDefects = ( ) => {
    return this.setState({show: 'defects'})
  }

  showPurge = ( ) => {
    return this.setState({show: 'purge'})
  }

  showstate = () =>{
    const defects = this.totalDefectPcs()
    return console.log(this.state, defects)
  }

  renderTitle = () =>{
    if(!this.state.machine){
      return
    } else { return(
    <div className='title_header'>
            <button type='button' onClick={this.showMolds}>Injection Molds</button>
            <button type='button' onClick={this.showIssues}>Downtime</button>
            <button type='button' onClick={this.showDefects}>Defects</button>
            <button type='button' onClick={this.showPurge}>Purge</button>
            {/* <button type='button' onClick={this.showstate}>state</button> */}
           </div>
    )
  }
}

  renderButton= ()=>{
    const time = this.getDowntimeToReport();
    if(time !== 0){ return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input> }
    else{
      const selected = this.state.selected.length
      if( selected === 0){
        return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
      } else{
        const defects = this.totalDefectPcs()
        const totalNG = this.totalNG()
        if(defects !== totalNG){
          return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>
        }
        else{
          const totalTime = this.totalTIME()
          const totalReal = this.totalReal()
          if(totalReal <= 0 || totalTime <= 0){
            return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>
          }
          else {
            return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
          }
        }
      }
    }
  }


  getDowntimeToReport = () =>{

    const shiftTime = this.state.time
    const totalTime = this.totalTIME();
    const mins = this.totalMins();
    const TotalInt = parseInt(totalTime * 60)
    const time = (shiftTime * 60) - (TotalInt) - mins
    return time
  }

  renderDownTable = () =>{
    if(!this.state.machine){
      return
    } else { 
      return (
        <table className='production_table-container'>
          <thead>
      <tr>
        <th className='production_table issueName_report'>Down Time</th>
        <th className='production_table mins'>Time (min)</th>
      </tr>
      </thead>
      <tbody>
        {this.renderTableDownTime()}
      </tbody>
      <tfoot>
      <tr>
      <th className='production_table control-mins'>Downtime to report ({this.getDowntimeToReport()})</th>
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
        <th className='production_table model'>Part Number</th>
        <th className='production_table pcs'>Real (pcs)</th>
        <th className='production_table ng'>NG (pcs)</th>
        <th className='production_table ok'>OK (pcs)</th>
        <th className='production_table time_table'>Work Time (hrs+min/60)</th>
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

  render() {

  
  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal-report">
        <div className="modal-report-content report_modal">
          <h2>Injection Production Report:</h2>
          <form onSubmit={this.onSubmit} className='report-form'>
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
                <label>Shift Time (hrs): </label>
                <input type="number" 
                className='time_input' 
                name='time'
                value={this.state.time}  min="0" max="14" onChange={this.onInputTimeChange} required/>
            </th>
          </tr>
          </tbody>
          </table>         
           
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
          New Injection Report added correctly <Link to="/reports"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddReport;