import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddReport extends Component {
  state= {
    date: '',
    shift: '',
    machine: '',
    time: 10,
    TReal: 0,
    TNG: 0,
    TOK: 0,
    TPlan: 0,
    TWTime: 0,
    TDTime: 0,
    TAvailability: 0,
    TPerformance: 0,
    TQuality: 0,
    TOEE: 0,
    programs: [],
    selected: [],
    show: 'molds',
    downtime: [],
    defects: [],
    resines: [] 

  }


  onMins = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    else { value = value }

    const downtime = this.state.downtime;
    const items = downtime.filter( item => item.issueId !== id);
    const getDowntime = downtime.find( item => item.issueId === id);

    const item = {...getDowntime, mins: value}

    const newItems = [...items, item]
    return this.setState({downtime: newItems});
  }

  onRealProduction = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    else { value = value }
      
    let selected = [...this.state.selected];
    const items = this.state.selected.filter( item => item.program !== id);
    const getProduction = selected.find( item => item.program === id);

    const { production, capacity } = await getProduction
    const { ng } = production
    const ok = value - ng
    const prewtime = value/capacity
    const wtime = this.precise_round(prewtime, 2)
  
    const TWTime = items.reduce( (a, b) =>{
      return a + parseFloat(b.production.wtime)
    },0)

    const predtime = (this.state.time - TWTime - wtime)/this.state.selected.length
    const dtime = this.precise_round(predtime, 2)

    const item = { 
      ...getProduction,
      production: { ...getProduction.production, real: value, ok: ok, wtime: wtime, dtime: dtime}
    }
    const newSelected = [...items, item]
    const newArray = newSelected.map( item => {
      const { production, capacity } = item
      const { wtime, real, ok } = production
      const time = wtime + dtime
      const preav = (wtime / time)*100
      const preplan = time * capacity
      const plan = this.precise_round(preplan, 0)
      const preperf = (real/plan)*100
      const performance = this.precise_round( preperf, 2) 
      const availability = this.precise_round( preav, 2)
      const preq = ( ok / real ) * 100
      const quality = this.precise_round(preq, 2)
      const preoee = (availability*performance*quality)/10000
      const oee = this.precise_round(preoee, 2)
      return { ...item, production: {...item.production, dtime: dtime, plan, availability, performance, quality, oee}}
    })

    const TOK = this.totalOK(newArray)
    const TReal = this.totalReal(newArray)
    const TPlan = this.totalPlan(newArray)
    const totalWTime = this.precise_round(this.totalWTime(newArray), 2)
    const TDTime = this.precise_round(this.totalDTime(newArray), 2)
    const TAvailability = this.precise_round((totalWTime/(totalWTime + TDTime)*100),2)
    const TPerformance = this.precise_round(((TReal/TPlan)*100),2)
    const TQuality = this.precise_round(((TOK/TReal)*100),2)
    const TOEE = this.precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)
    console.log(newArray, TWTime)
    return this.setState({selected: newArray, TOK, TReal, TPlan, TWTime: totalWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE});
  }

  onDefect = (e) =>{
    let value = parseInt(e.target.value)
    const programId = e.target.name;
    const id = e.target.id;

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    else { value = value }

    const defects = this.state.defects;
    const items = defects.filter( defect => defect.program !== programId && defect.defect !== id);
    const getDefect = defects.find(defect => defect.program === programId && defect.defect === id);

    const item = {...getDefect, defectPcs: value}

    const newItems = [...items, item]
    return this.setState({defects: newItems});
  }

  onResine = (e) =>{
    let value = parseInt(e.target.value);
    const id = e.target.name;

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    else { value = value }
    
    const resines = this.state.resines;
    const items = resines.filter( item => item.resine !== id);
    const getResine = resines.find( item => item.resine === id);
    const item = {...getResine, purge: value}
    const newItems = [...items, item]
    return this.setState({resines: newItems});
  }

  onNGProduction = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    else { value = value }
      
    let selected = [...this.state.selected];
    const items = this.state.selected.filter( item => item.program !== id);
    const getProduction = selected.find( item => item.program === id);

    const { production } = await getProduction
    const { real, availability, performance } = production
    const ok = real - value

    const quality = this.precise_round(((ok/real)*100),2)
    const oee = this.precise_round(((availability*performance*quality)/10000), 2)
    const item = { 
      ...getProduction,
      production: { ...getProduction.production, ok, ng: value, quality, oee}
    }
    const newSelected = [...items, item]

    const TNG = this.TNG(newSelected)
    const TOK = this.totalOK(newSelected)
    
    const TQuality = this.precise_round(((TOK/this.state.TReal)*100),2)
    const TOEE = this.precise_round(((this.state.TAvailability*this.state.TPerformance*TQuality)/10000), 2)
    
    return this.setState({selected: newSelected, TOK, TNG, TQuality, TOEE});
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
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.ok
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  totalOK = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.ok
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  TNG = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.ng
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  totalWTime = (array) =>{
    const value = array.reduce( (a, b) =>{
      return parseFloat(a + b.production.wtime)
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  totalDTime = (array) =>{
    const value = array.reduce( (a, b) =>{
      return parseFloat(a + b.production.dtime)
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  // totalTIME = () =>{
  //   let selected = [...this.state.selected];
  //   const time = selected.reduce( (a, b) =>{
  //     return a + b.production.time || 0
  //   },0)

  //   return isNaN(time) ? 0 : time;
  // }

  totalReal = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.real
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  totalPlan = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.plan
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  getPlan = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.plan
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  getAva = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.availability
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  getPerformance = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.performance
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  getQuality = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.quality
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  getDefaultReal = (id) =>{
    // let selected = [...this.state.selected];
    // const real = selected[selected.findIndex(el => el._id === id)].production.real
    // return isNaN(real) ? 0 : real;
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
      return 0
    } else {
      const { production } = getProgram
      const value = production.real
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  }

  getDefaultNG = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
      return 0
    } else {
      const { production } = getProgram
      const value = production.ng
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  }

  getWTime = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
      return 0
    } else {
    const { production } = getProgram
    const value = production.wtime
    if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  }

  getOEE = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.oee
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  getDTime = (id) =>{
    const getProgram = this.state.selected.find( item => item.program === id);
    if(!getProgram){
      return 0
    } else {
    const { production } = getProgram
    const value = production.dtime
    if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  }

  getDefaultMins = (id) =>{
    const getDowntime = this.state.downtime.find( item => item.issueId === id);
    if(!getDowntime){
      return 0
    } else {
      const { mins } = getDowntime
      const value = mins
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }
  }

  getDefaultDefect = (programId, id) =>{
   
    let value
    const getDefect = this.state.defects.find(defect => defect.program === programId && defect.defect === id);
    if(!getDefect){ value = 0}
    else{
      const { defectPcs } = getDefect
     
      value = defectPcs
    }
    return value    
  }

  getDefaultPurge = (id) =>{
   
    let value
    const getResine = this.state.resines.find(resine => resine.resine === id);
    if(!getResine){ value = 0}
    else{
      const { purge } = getResine
     
      value = purge
    }
    return value    
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
    const select = this.state.downtime.find( downtime => downtime.issueId === id);
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

  disabledDownTime = (id) =>{
    const select = this.state.downtime.find( downtime => downtime.issueId === id);
    return select ? false : true
  }

  disabledProduction = (id) =>{
    const select = this.state.selected.find( program => program.program === id);
    return select ? false : true
  }


  disabledDefect = (program, id) =>{
    const select = this.state.defects.find( defect => defect.program === program && defect.defect === id);
    return select ? false : true
  }

  onSelectIssue = e =>{
    const id = e.target.name 
    const select = this.state.downtime.find( downtime => downtime.issueId === id);
    if(!select){
      const getIssue = this.props.issues.find( issue => issue._id === id);
      const { _id  } = getIssue
      const item ={
        issueId: _id,
        mins: 0
      }
      const downtime = [...this.state.downtime, item]
      this.setState({downtime});
    } else{
      const items = this.state.downtime.filter(downtime => downtime.issueId !== id);
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
      const { _id, partNumber, moldeNumber, cycleTime, capacity } = getProgram
      const item ={
        program: _id, //id del programa
        moldeNumber: moldeNumber,
        partNumber: partNumber,
        cycleTime: cycleTime,
        capacity: capacity,
        production: {
          program: _id,
          partNumber: partNumber._id,
          molde: moldeNumber._id,
          real: 0,
          ng: 0,
          ok: 0,
          plan: 0,
          wtime: 0,
          dtime: 0,
          availability: 0,
          performance: 0,
          quality: 0,
          oee: 0
        }
      }

      programs.push(item);
      this.setState({selected: programs});
      
    } else{
      const items = this.state.selected.filter(program => program.program !== id);
      const defects = this.state.defects.filter(defect => defect.program !== id);

      const newSelected = [...items]
      const newArray = newSelected.map( item => {
        const { production, capacity } = item
        const { real, wtime, quality } = production
        
        const TWTime = items.reduce( (a, b) =>{
          return a + parseFloat(b.production.wtime)
        },0)
        const predtime = (this.state.time - TWTime )/items.length
        const dtime = this.precise_round(predtime, 2)

        const time = wtime + dtime
        const preav = (wtime / time)*100
        const preplan = time * capacity
        const plan = this.precise_round(preplan, 0)
        const preperf = (real/plan)*100
        const performance = this.precise_round( preperf, 2) 
        const availability = this.precise_round( preav, 2)
        const preoee = (availability*performance*quality)/10000
        const oee = this.precise_round(preoee, 2)
        return { ...item, production: {...item.production, dtime, plan, availability, performance, quality, oee}}
      })

      const TOK = this.totalOK(newArray)
      const TReal = this.totalReal(newArray)
      const TNG = this.TNG(newArray)
      const TPlan = this.totalPlan(newArray)
      const totalWTime = this.precise_round(this.totalWTime(newArray), 2)
      const TDTime = this.precise_round(this.totalDTime(newArray), 2)
      const TAvailability = this.precise_round((totalWTime/(totalWTime + TDTime)*100),2)
      const TPerformance = this.precise_round(((TReal/TPlan)*100),2)
      const TQuality = this.precise_round(((TOK/TReal)*100),2)
      const TOEE = this.precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)


      this.setState({ selected: newArray, defects: defects, TNG, TOK, TReal, TPlan, TWTime: totalWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE });
    }
  }


  onSubmit = async (e) =>{
    e.preventDefault();    
    const { date, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, production, defects, resines, downtime  } = this.state;
    
    const report = {
      date: date+'T00:00:00.000-06:00',
      shift,
      machine,
      TReal,
      TNG,
      TOK,
      TPlan,
      TWTime,
      TDTime,
      TAvailability,
      TPerformance,
      TQuality,
      TOEE,
      production,
      downtimeDetail: downtime,
      defects,
      resines
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
    if(this.state.show === 'defects'){
        return this.renderDefectsTable()
    } else if(this.state.show === 'purge'){
      return this.renderResinesTable()
    } 
    else{
      return this.renderDownTable()
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
            <input type='number' name={material._id} id={material._id} onChange={this.onResine} disabled={this.disabledResine(material._id)} value={this.getDefaultPurge(material._id)} className='input-defect-number'></input>
          </td>
        </tr>))
  }


  renderDefectsRows = (program) =>{
    const defects = this.props.defects.filter( item => item.isInjection === true)
     return (defects.map(( defect ) => 
        <tr key={defect._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
        <input type='checkbox' className='checkbox-defect-input' checked={this.findDefect(program, defect._id)} value={defect._id} name={program} onChange={this.onSelectDefect}></input>
  <label className='label-defect-body' htmlFor={defect._id}>{defect.defectCode} {defect.defectName}</label>

          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' name={program} id={defect._id} onChange={this.onDefect} disabled={this.disabledDefect(program, defect._id)} value={this.getDefaultDefect(program, defect._id)} className='input-defect-number'></input>
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
              <th colSpan='2' className='defect-table-molde'>{item.moldeNumber.moldeNumber}-{item.partNumber.partName}</th>
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
    const downtime = this.props.issues;
    if(!downtime){ 
      return null 
    }
    else{ 
      return downtime.map(( downtime ) =>
        <tr key={downtime._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
          <input type='checkbox' className='checkbox-defect-input' checked={this.findDowntime(downtime._id)} onChange={this.onSelectIssue} value={downtime._id} name={downtime._id}></input>
          <label className='label-defect-body'>{downtime.issueCode} {downtime.issueName}</label>
          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' disabled={this.disabledDownTime(downtime._id)} min="0" max="840" value={this.getDefaultMins(downtime._id)} name={downtime._id} className='input-defect-number' onChange={this.onMins} ></input>
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
      return this.state.programs.map(( program ) =>
        <tr key={program._id}>
          <td className='production_row'>
            <input type='checkbox' className='checkbox-input' checked={this.findMolde(program._id)} onChange={this.onSelect} value={program._id} name={program._id}></input>
            <label>{program.moldeNumber.moldeNumber}</label>
          </td>
          <td className='production_row'>
            <label>{program.partNumber.partName}</label>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" disabled={this.disabledProduction(program._id)} value={this.getDefaultReal(program._id)} name={program._id} className='production_input' onChange={this.onRealProduction} ></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" disabled={this.disabledProduction(program._id)} value={this.getDefaultNG(program._id)} name={program._id} className='production_input' onChange={this.onNGProduction}></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getOK(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getPlan(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getWTime(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getDTime(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getAva(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getPerformance(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={this.getQuality(program._id)} disabled></input>
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
            {/* <button type='button' onClick={this.showMolds}>Injection Molds</button> */}
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
          const totalTime = this.state.TWTime
          const totalReal = this.state.TReal
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
    const { time, TWTime } = this.state;
    const totalTime = parseFloat(time * 60);
    const totalW = parseFloat(TWTime * 60);
    const mins = this.totalMins();
    const minsToReport = totalTime - totalW - mins
    return parseInt(minsToReport)
  }

  renderDownTable = () =>{
    if(!this.state.machine){
      return
    } else { 
      return (
        <table className='production_table-container-downtime'>
          <thead>
      <tr>
        <th className='defect-header-table'>Downtime to report ({this.getDowntimeToReport()})</th>
        <th className='pcs-header-table'>Time (min)</th>
      </tr>
      </thead>
      <tbody>
        {this.renderTableDownTime()}
      </tbody>
      <tfoot>
      <tr>
      <th className='production_table control-mins'>Total Downtime</th>
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
        <th className='production_table plan'>Plan (pcs)</th>
        <th className='production_table time_table'>WTime (hrs)</th>
        <th className='production_table downtime_table'>DTime (hrs)</th>
        <th className='production_table availability'>Avail%</th>
        <th className='production_table performance'>Perf%</th>
        <th className='production_table quality'>Qlty%</th>
        <th className='production_table oee'>OEE%</th>
      </tr>
      </thead>
      <tbody>
        {this.renderProduction()}
      </tbody>
      <tfoot>
      <tr>
        <th colSpan='2' className='production_table total_yellow'>Total</th>
      <th className='production_table pcs'><input type='number' className='production_input' name='real' value={this.state.TReal} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TNG} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TOK} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TPlan} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TWTime} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TDTime} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TAvailability} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TPerformance} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TQuality} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={this.state.TOEE} disabled></input></th>
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
          <h2 className='report-title'>Injection Production Report:</h2>
          <form onSubmit={this.onSubmit} className='report-form'>
            <table className='header_table_report'>
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
                <label>Plan Time (hrs): </label>
                <input type="number" 
                className='time_input' 
                name='time'
                value={this.state.time}  min="0" max="14" onChange={this.onInputTimeChange} required/>
            </th>
          </tr>
          </tbody>
          </table>         
          {this.renderChoose()}
           {this.renderTitle()}
          <div className='section_two'>
            {this.renderContainer()}
            {/* <div className='downtime-table'>
              {this.renderDownTable()}
            </div> */}
          </div>
          
  
            
            
            
            
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