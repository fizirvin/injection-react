import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addReport, closeReport } from './actions'
import { fetchIssues } from '../Issues/actions'
import { fetchMaterials } from '../Materials/actions'
import { fetchMachines } from '../Machines/actions'
import { fetchPrograms } from '../Programs/actions'
import { fetchWorkers } from '../Workers/actions'
import { fetchDefects } from '../Defects/actions'

const AddReport = ({fetchDefects, fetchWorkers, fetchPrograms, fetchMachines, fetchMaterials, fetchIssues, message, profilesList, programsList, defectsList, machinesList, issuesList, userId, materialsList, addReport, closeReport}) => {
  const [ date, setDate ] = useState('')
  const [ shift, setShift ] = useState('')
  const [ machine, setMachine ] = useState('')
  const [ time, setTime ] = useState(10)
  const [ TReal, setTReal ] = useState(0)
  const [ TNG, setTNG ] = useState(0)
  const [ TOK, setTOK ] = useState(0)
  const [ TPlan, setTPlan ] = useState(0)
  const [ TWTime, setTWTime ] = useState(0)
  const [ TProd, setTProd ] = useState(0)
  const [ TDTime, setTDTime ] = useState(0)
  const [ TAvailability, setTAvailability ] = useState(0)
  const [ TPerformance, setTPerformance ] = useState(0)
  const [ TQuality, setTQuality ] = useState(0)
  const [ TOEE, setTOEE ] = useState(0)
  const [ programs, setPrograms ] = useState([])
  const [ selected, setSelected ] = useState([])
  const [ show, setShow ] = useState('molds')
  const [ downtime, setDowntime ] = useState([])
  const [ defects, setDefects ] = useState([])
  const [ resines, setResines ] = useState([])
  const [ team, setTeam ] = useState('')
  const [ comments, setComments ] = useState('')
  const [ inspector, setInspector ] = useState('')
  const [ operator, setOperator ] = useState('')
  const [ profiles, setProfiles ] = useState([])

  useEffect(() =>{
    if(issuesList.length === 0){
      fetchIssues()
    } 
  },[issuesList])

  useEffect(() =>{
    if(materialsList.length === 0){
      fetchMaterials()
    } 
  },[materialsList])

  useEffect(() =>{
    if(machinesList.length === 0){
      fetchMachines()
    } 
  },[machinesList])

  useEffect(() =>{
    if(programsList.length === 0){
      fetchPrograms()
    } 
  },[programsList])

  useEffect(() =>{
    if(profilesList.length === 0){
      fetchWorkers()
    } 
  },[profilesList])

  useEffect(() =>{
    if(defectsList.length === 0){
      fetchDefects()
    } 
  },[defectsList])


  const onMins = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    

    // const downtime = this.state.downtime;
    const items = downtime.filter( item => item.issueId !== id);
    const getDowntime = downtime.find( item => item.issueId === id);

    const item = {...getDowntime, mins: value}

    const newItems = [...items, item]
    // return this.setState({downtime: newItems});
    return setDowntime(newItems)
  }

  const onWTProduction = async (e) =>{
    const id = e.target.name
    let value = parseFloat(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }

    let select = [...selected];
    const items = selected.filter( item => item.program !== id);
    const getProduction = select.find( item => item.program === id);

    const { production, capacity } = await getProduction
    const { real, quality } = production
    const wtime = value
    const TWTime = items.reduce( (a, b) =>{
      return a + parseFloat(b.production.wtime)
    },0)

    

    const predtime = (time - TWTime - wtime)/selected.length
    const dtime = precise_round(predtime, 2)

    const prod = Math.round(wtime * capacity)

    const alltime = wtime + dtime
    const preav = (wtime / alltime)*100
    const availability = precise_round( preav, 2)

    const preperf = (real/prod)*100
    const performance = precise_round( preperf, 2) 

    const preoee = (availability*performance*quality)/10000
    const oee = precise_round(preoee, 2)
    const item = { 
      ...getProduction,
      production: { ...getProduction.production, wtime, prod, dtime: dtime, availability, performance, oee }
    }
    const newSelected = [...items, item]
    const newArray = newSelected.map( item => {
      const { production, capacity } = item
      const { wtime, quality, performance  } = production
      const alltime = wtime + dtime
      const preav = (wtime / alltime)*100
      const preplan = time * capacity
      const plan = precise_round(preplan, 0)
      const availability = precise_round( preav, 2)
      const preoee = (availability*performance*quality)/10000
      const oee = precise_round(preoee, 2)
      return { ...item, production: {...item.production, dtime: dtime, plan, availability, oee}}
    })

    // const TOK = this.state.TOK
    // const TReal = this.state.TReal
    const TPlan = totalPlan(newArray)
    const TProd = totalProd(newArray)
    const totWTime = precise_round(totalWTime(newArray), 2)
    const TDTime = precise_round(totalDTime(newArray), 2)
    const TAvailability = precise_round((totWTime/(totWTime + TDTime)*100),2)
    const TPerformance = precise_round(((TReal/TProd)*100),2)
    const TQuality = precise_round(((TOK/TReal)*100),2)
    const TOEE = precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)
    
    setSelected(newArray)
    setTPlan(TPlan)
    setTProd(TProd)
    setTWTime(totWTime)
    setTDTime(TDTime)
    setTAvailability(TAvailability)
    setTPerformance(TPerformance)
    setTQuality(TQuality)
    setTOEE(TOEE)
    // return this.setState({selected: newArray, TOK, TReal, TPlan, TProd, TWTime: totalWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE});
   
  }

  const onRealProduction = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    
      
    let select = [...selected];
    const items = selected.filter( item => item.program !== id);
    const getProduction = select.find( item => item.program === id);

    const { production, capacity, moldeNumber } = await getProduction
    const { ng } = production
    const ok = value - ng
    const prewtime = value/capacity
    const wtime = precise_round(prewtime, 2)
  
    const TWTime = items.reduce( (a, b) =>{
      return a + parseFloat(b.production.wtime)
    },0)

    const predtime = (time - TWTime - wtime)/selected.length
    const dtime = precise_round(predtime, 2)
    
    const { cavities } = moldeNumber;
    const cycles = Math.round(value/cavities);

    const prod = Math.round(wtime * capacity)

    const item = { 
      ...getProduction,
      production: { ...getProduction.production, real: value, ok: ok, wtime: wtime, prod, dtime: dtime, cycles: cycles}
    }
    const newSelected = [...items, item]
    const newArray = newSelected.map( item => {
      const { production, capacity } = item
      const { wtime, real, ok, prod } = production
      const time = wtime + dtime
      
      const preav = (wtime / time)*100
      const preplan = time * capacity
      const plan = precise_round(preplan, 0)
      const preperf = (real/prod)*100
      const performance = precise_round( preperf, 2) 
      const availability = precise_round( preav, 2)
      const preq = ( ok / real ) * 100
      const quality = precise_round(preq, 2)
      const preoee = (availability*performance*quality)/10000
      const oee = precise_round(preoee, 2)
      return { ...item, production: {...item.production, dtime: dtime, plan, availability, performance, quality, oee}}
    })

    const TOK = totalOK(newArray)
    const TReal = totalReal(newArray)
    const TPlan = totalPlan(newArray)
    const TProd = totalProd(newArray)
    const totWTime = precise_round(totalWTime(newArray), 2)
    const TDTime = precise_round(totalDTime(newArray), 2)
    const TAvailability = precise_round((totWTime/(totWTime + TDTime)*100),2)
    const TPerformance = precise_round(((TReal/TProd)*100),2)
    const TQuality = precise_round(((TOK/TReal)*100),2)
    const TOEE = precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)

    setSelected(newArray)
    setTOK(TOK)
    setTReal(TReal)
    setTPlan(TPlan)
    setTProd(TProd)
    setTWTime(totWTime)
    setTDTime(TDTime)
    setTAvailability(TAvailability)
    setTPerformance(TPerformance)
    setTQuality(TQuality)
    setTOEE(TOEE)
    
    // return this.setState({selected: newArray, TOK, TReal, TPlan, TProd, TWTime: totalWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE});
  }

  const onDefect = (e) =>{
    let value = parseInt(e.target.value)
    const programId = e.target.name;
    const id = e.target.id;

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    

    // const defects = [...this.state.defects];
    const getDefect = defects.find( defect => defect.program === programId && defect.defect === id);
    const items = defects.filter(item => item !== getDefect);
      
    const item = {...getDefect, defectPcs: value}
    const newItems = [...items, item]
    
    return setDefects(newItems)
    // return this.setState({defects: newItems});
  }

  const onResine = (e) =>{
    let value = parseInt(e.target.value);
    const id = e.target.name;

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
    
    // const resines = this.state.resines;
    const items = resines.filter( item => item.resine !== id);
    const getResine = resines.find( item => item.resine === id);
    const item = {...getResine, purge: value}
    const newItems = [...items, item]
    return setResines(newItems)
    // return this.setState({resines: newItems});
  }

  const onNGProduction = async (e) =>{
    const id = e.target.name
    let value = parseInt(e.target.value);

    if( isNaN(value) ){ value = '' }
    else if( value === 0 ){ value = 0 }
      
    // let selected = [...this.state.selected];
    const items = selected.filter( item => item.program !== id);
    const getProduction = selected.find( item => item.program === id);

    const { production } = await getProduction
    const { real, availability, performance } = production
    const ok = real - value

    const quality = precise_round(((ok/real)*100),2)
    const oee = precise_round(((availability*performance*quality)/10000), 2)
    const item = { 
      ...getProduction,
      production: { ...getProduction.production, ok, ng: value, quality, oee}
    }
    const newSelected = [...items, item]

    const TNG = onTNG(newSelected)
    const TOK = totalOK(newSelected)
    
    const TQuality = precise_round(((TOK/TReal)*100),2)
    const TOEE = precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)
    
    setSelected(newSelected)
    setTOK(TOK)
    setTNG(TNG)
    setTQuality(TQuality)
    setTOEE(TOEE)
    // return this.setState({selected: newSelected, TOK, TNG, TQuality, TOEE});
  }

  const onTimeProduction = (e) =>{
    
    const prevalue = parseFloat(e.target.value);
    const value = precise_round(prevalue, 2);
    let select = [...selected];
    
    
    
    select[select.findIndex(el => el.program === e.target.name)].production.time = value;
    const time = value;
    const capacity = select[select.findIndex(el => el.program === e.target.name)].capacity
    const production = select[select.findIndex(el => el.program === e.target.name)].production.ok
    const expected = capacity * time
    const preoee = (production/expected)*100
    const oee = precise_round(preoee, 1)
    select[select.findIndex(el => el.program === e.target.name)].production.oee = oee;
    return setSelected(select)
    // return this.setState({selected});

  }

  const precise_round = (num, dec)=>{
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  const getOK = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const totalOK = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.ok
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const totalProd = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.prod
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const onTNG = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.ng
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const totalWTime = (arr) =>{
    const value = arr.reduce( (a, b) =>{
      return parseFloat(a + b.production.wtime)
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const totalDTime = (array) =>{
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

  const totalReal = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.real
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const totalPlan = (array) =>{
    const value = array.reduce( (a, b) =>{
      return a + b.production.plan
    },0)
    if( isNaN(value) ){ return 0 }
    else if( value === 0 ){ return 0 }
    else { 
      return value
    }
  }

  const getPlan = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getProd = (id) =>{
    const getProgram = selected.find( item => item.program === id);
    if(!getProgram){
        return 0
    } else {
      const { production } = getProgram
      const value = production.prod
      if( isNaN(value) ){ return 0 }
      else if( value === 0 ){ return 0 }
      else { 
        return value
      }
    }
  }

  const getAva = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getPerformance = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getQuality = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getDefaultReal = (id) =>{
    // let selected = [...this.state.selected];
    // const real = selected[selected.findIndex(el => el._id === id)].production.real
    // return isNaN(real) ? 0 : real;
    const getProgram = selected.find( item => item.program === id);
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

  const getDefaultNG = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getWTime = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getOEE = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getDTime = (id) =>{
    const getProgram = selected.find( item => item.program === id);
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

  const getDefaultMins = (id) =>{
    const getDowntime = downtime.find( item => item.issueId === id);
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

  const getDefaultDefect = (programId, id) =>{
    const getDefect = defects.find(defect => defect.program === programId && defect.defect === id);
    if(!getDefect){ return 0}
    else{
      const { defectPcs } = getDefect
      const value = defectPcs
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }  
  }

  const getDefaultPurge = (id) =>{
    const getResine = resines.find(resine => resine.resine === id);
    if(!getResine){ return 0}
    else{
      const { purge } = getResine
      const value = purge
      if( isNaN(value) ){ return '' }
      else if( value === 0 ){ return 0}
      else { 
        return value
      }
    }   
  }

  const totalMins = () =>{
    let downt = [...downtime];
    const mins = downt.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    
    return mins
  }

  const totalNG = () =>{
    // let selected = [...this.state.selected];
    const ng = selected.reduce( (a, b) =>{
      return a + b.production.ng || 0
    },0)

    return isNaN(ng) ? 0 : ng;
  }

  const totalDefectPcs = () =>{
    let defect = [...defects];
    const pcs = defect.reduce( (a, b) =>{
      return a + b.defectPcs || 0
    },0)

    return isNaN(pcs) ? 0 : pcs;
  }

  const totalOEE = () =>{
    // let selected = [...this.state.selected];
    const length = selected.length;
    const sum = selected.reduce( (a, b) =>{
      return a + b.production.oee || 0
    },0)
    const preoee = sum/length
    const oee = precise_round(preoee, 1)
    return isNaN(oee) ? 0 : oee;
  }

  const totalCapacity = () =>{
    // let selected = [...this.state.selected];
   
    const capacity = selected.reduce( (a, b) =>{
      return a + (b.production.capacity * b.production.time) || 0
    },0)

    const value = parseInt(capacity)
    

    return isNaN(value) ? 0 : value;
  }



  const onClose = () =>{
    closeReport()
  }

  const onInputChange = e => {
    const value = e.target.value
    const name = e.target.name
    if(name === 'shift'){
      return setShift(value)
    }
    else if(name === 'date'){
      return setDate(value)
    }
    // this.setState({ [e.target.name]: e.target.value });
    
  };

  const onInputTimeChange = e => {
    
    const prevalue = parseInt(e.target.value)
    const value = isNaN(prevalue)? 0 : prevalue
    const selected = [];
    const defects = [];
    const TReal= 0
    const TNG = 0
    const TOK = 0
    const TPlan = 0
    const TProd = 0
    const TWTime = 0
    const TDTime = value
    const TAvailability = 0
    const TPerformance = 0
    const TQuality = 0
    const TOEE = 0

    setTime(value)
    setSelected(selected)
    setDefects(defects)
    setTOK(TOK)
    setTNG(TNG)
    setTReal(TReal)
    setTPlan(TPlan)
    setTProd(TProd)
    setTWTime(TWTime)
    setTDTime(TDTime)
    setTAvailability(TAvailability)
    setTPerformance(TPerformance)
    setTQuality(TQuality)
    setTOEE(TOEE)
    // this.setState({ [e.target.name]: value, selected, defects, TReal, TNG, TOK, TProd, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE });
    
  };

  const onMachineChange = e =>{

    const selected = [];
    const defects = [];
    const TReal= 0
    const TNG = 0
    const TOK = 0
    const TPlan = 0
    const TProd = 0
    const TWTime = 0
    const TDTime = time
    const TAvailability = 0
    const TPerformance = 0
    const TQuality = 0
    const TOEE = 0
    const programs = filterPrograms(e.target.value)
    setMachine(e.target.value)
    setPrograms(programs)
    setSelected(selected)
    setDefects(defects)
    setTOK(TOK)
    setTReal(TReal)
    setTNG(TNG)
    setTPlan(TPlan)
    setTProd(TProd)
    setTWTime(TWTime)
    setTDTime(TDTime)
    setTAvailability(TAvailability)
    setTPerformance(TPerformance)
    setTQuality(TQuality)
    setTOEE(TOEE)
    // this.setState({ [e.target.name]: e.target.value, programs, selected, defects, TReal, TNG, TOK, TProd, TPlan, TWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE });
    
  }

  const findDowntime = (id) =>{
    const select = downtime.find( downtime => downtime.issueId === id);
    return select ? true : false
  }

  const findMolde = (id) =>{
    const select = selected.find( selected => selected.program === id);
    return select ? true : false
  }

  const findDefect = (program, id) =>{
    const select = defects.find( defect => defect.program === program && defect.defect === id);
    return select ? true : false
  }

  const findResine = (id) =>{
    const select = resines.find( resine => resine.resine === id );
    return select ? true : false
  }

  const disabledResine = (id) =>{
    const select = resines.find( resine => resine.resine === id);
    return select ? false : true
  }

  const disabledDownTime = (id) =>{
    const select = downtime.find( downtime => downtime.issueId === id);
    return select ? false : true
  }

  const disabledProduction = (id) =>{
    const select = selected.find( program => program.program === id);
    return select ? false : true
  }


  const disabledDefect = (program, id) =>{
    const select = defects.find( defect => defect.program === program && defect.defect === id);
    return select ? false : true
  }

  const onSelectIssue = e =>{
    const id = e.target.name 
    const select = downtime.find( downtime => downtime.issueId === id);
    if(!select){
      const getIssue = issuesList.find( issue => issue._id === id);
      const { _id  } = getIssue
      const item ={
        issueId: _id,
        mins: 0
      }
      const downt = [...downtime, item]
      // this.setState({downtime});
      setDowntime(downt)
    } else{
      const items = downtime.filter(downtime => downtime.issueId !== id);
      setDowntime(items)
      // this.setState({ downtime: items });
    }
  }

  const onSelectDefect = e =>{
    const id = e.target.value
    const programId = e.target.name 
    
    const select = defects.find( defect => defect.program === programId && defect.defect === id);
    if(!select){
      const getProgram = programs.find( program => program._id === programId);
      const { _id, partNumber, moldeNumber } = {...getProgram}
      const item ={
          defect: id,
          program: _id,
          partNumber: partNumber._id,
          molde: moldeNumber._id,
          defectPcs: 0
      }

      const items = [...defects];
      const newItems = [...items, item]
      return setDefects(newItems)
      // return this.setState({defects: newItems});
      
    } else{

      const defect = defects.find( defect => defect.program === programId && defect.defect === id);
      // defects[defects.findIndex(defect => defect.program === programId && defect.defect === id)]
      const items = defects.filter(item => item !== defect);
      setDefects(items)
    // this.setState({ defects: items });
      
    }
  }

  const onSelectResine = e =>{
    let resin = [...resines];
    const id = e.target.name
    
    const select = resines.find( resine => resine.resine === id);
    if(!select){
      const getResine = materialsList.find( material => material._id === id);
      const { _id } = {...getResine}
      const item ={
        resine: _id,
        purge: 0
      }
      
      resin.push(item);
      // this.setState({resines: resines});
      setResines(resin)
    } else{

      const items = resines.filter( resine => resine.resine !== id);
      
    // this.setState({ resines: items });
     setResines(items) 
    }
  }

  const onSelect = e =>{
    let prog = [...selected];
    const id = e.target.name 
    //   machines.push(data.data.newMachine);
    const select = selected.find( program => program.program === id);
    if(!select){
      const getProgram = programs.find( program => program._id === id);
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
          prod: 0,
          dtime: 0,
          availability: 0,
          performance: 0,
          quality: 0,
          oee: 0,
          cycles: 0
        }
      }

      prog.push(item);
      return setSelected(prog)
      // return this.setState({selected: programs});
      
    } else{
      const items = selected.filter(program => program.program !== id);
      const defect = defects.filter(defect => defect.program !== id);

      const newSelected = [...items]
      const newArray = newSelected.map( item => {
        const { production, capacity } = item
        const { real, prod, wtime, quality } = production
        
        const TWTime = items.reduce( (a, b) =>{
          return a + parseFloat(b.production.wtime)
        },0)
        const predtime = (time - TWTime )/items.length
        const dtime = precise_round(predtime, 2)

        const allTime = wtime + dtime
        const preav = (wtime / allTime)*100
        const preplan = allTime * capacity
        const plan = precise_round(preplan, 0)
        const preperf = (real/prod)*100
        const performance = precise_round( preperf, 2) 
        const availability = precise_round( preav, 2)
        const preoee = (availability*performance*quality)/10000
        const oee = precise_round(preoee, 2)
        return { ...item, production: {...item.production, dtime, plan, availability, performance, quality, oee}}
      })

      const TOK = totalOK(newArray)
      const TReal = totalReal(newArray)
      const TNG = onTNG(newArray)
      const TPlan = totalPlan(newArray)
      const TProd = totalProd(newArray)
      const totWTime = precise_round(totalWTime(newArray), 2)
      let TDTime = precise_round(totalDTime(newArray), 2)
      const TAvailability = precise_round((totWTime/(totWTime + TDTime)*100),2)
      const TPerformance = precise_round(((TReal/TProd)*100),2)
      const TQuality = precise_round(((TOK/TReal)*100),2)
      const TOEE = precise_round(((TAvailability*TPerformance*TQuality)/10000), 2)

      let resin = resines
      if(newArray.length === 0 ){ resin = []; TDTime = time }
      setSelected(newArray)
      setDefects(defect)
      setTOK(TOK)
      setTNG(TNG)
      setTReal(TReal)
      setTPlan(TPlan)
      setTProd(TProd)
      setTWTime(totWTime)
      setTDTime(TDTime)
      setTAvailability(TAvailability)
      setTPerformance(TPerformance)
      setTQuality(TQuality)
      setTOEE(TOEE)
      setResines(resin)
      // return this.setState({ selected: newArray, defects: defects, TNG, TProd, TOK, TReal, TPlan, TWTime: totalWTime, TDTime, TAvailability, TPerformance, TQuality, TOEE, resines });
    }
  }


  const onSubmit = async (e) =>{
    e.preventDefault();    
    // const { date, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TProd, TDTime, 
    //   TAvailability, TPerformance, TQuality, TOEE, selected, defects, resines, 
    //   downtime, comments, team, inspector, operator  } = this.state;
    const production = selected.map( item => item.production )
    const workers = {team, operator, inspector }
    const report = {
      reportDate: date+'T15:00:30.640+00:00',
      shift,
      machine,
      TReal,
      TNG,
      TOK,
      TPlan,
      TWTime,
      TProd, 
      TDTime,
      TAvailability,
      TPerformance,
      TQuality,
      TOEE,
      production,
      downtimeDetail: downtime,
      defects,
      resines,
      userId: userId,
      comments,
      workers
    }
    
    return addReport(report)
  }


  const renderMachines = ()=>{
    return machinesList.map(( machine ) => 
    <option key={machine._id} value={machine._id}>{machine.machineNumber}</option>);
  }

 

  const filterPrograms = (value) =>{
     const progrs =  programsList.filter(program => {
       return program.machineNumber._id === value;
    });
    return progrs
  }

  const renderContainer = () =>{
    if(!machine){ return null } 
     else {
        return (<div className='checkbox-container'>
        {renderPrograms()}
  
      </div>)
    }
  }

  const renderPrograms = () =>{ 
    if(show === 'defects'){
        return renderDefectsTable()
    } else if(show === 'purge'){
      return renderResinesTable()
    } 
    else{
      return renderDownTable()
    }
  }

  const renderResinesTable = () =>{
    const select = selected
    if(select.length === 0){ return <div>choose Molde</div>}
    else{
      return(<table className='defect-table'>
          <thead>
            <tr>
              <th className='defect-header-table'>Resine</th>
              <th className='pcs-header-table'>Purge (g)</th>
            </tr>
          </thead>
          <tbody>
            {renderResineRows()}
          </tbody>
        </table>)
    }
  }


  const renderResineRows = () =>{
    const material = materialsList.filter( item => item.type === 'resine')
    return (material.map(( material ) => 
        <tr key={material._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
        <input type='checkbox' className='checkbox-defect-input' checked={findResine(material._id)} name={material._id} onChange={onSelectResine}></input>
        <label className='label-defect-body' htmlFor={material._id}>{material.description}</label>

          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' name={material._id} id={material._id} onChange={onResine} disabled={disabledResine(material._id)} value={getDefaultPurge(material._id)} className='input-defect-number'></input>
          </td>
        </tr>))
  }


  const renderDefectsRows = (program) =>{
    const defects = defectsList.filter( item => item.isInjection === true)
     return (defects.map(( defect ) => 
        <tr key={defect._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
        <input type='checkbox' className='checkbox-defect-input' checked={findDefect(program, defect._id)} value={defect._id} name={program} onChange={onSelectDefect}></input>
  <label className='label-defect-body' htmlFor={defect._id}>{defect.defectCode} {defect.defectName}</label>

          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' name={program} id={defect._id} onChange={onDefect} disabled={disabledDefect(program, defect._id)} value={getDefaultDefect(program, defect._id)} className='input-defect-number'></input>
          </td>
        </tr>))
  }

  const renderDefectsTable = () =>{
    const select = selected
    if(select.length === 0){ return <div>choose Molde</div>}
    else{
      return (select.map( item =>{ 
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
            {renderDefectsRows(item.program)}
          </tbody>
        </table>)
      }))
    }
  }

  const renderTableDownTime = () =>{
    const downt = issuesList;
    if(!downt){ 
      return null 
    }
    else{ 
      return downt.map(( downtime ) =>
        <tr key={downtime._id} className='checkboxes-defects defectboxes'>
          <td className='input-defect-body'>
          <input type='checkbox' className='checkbox-defect-input' checked={findDowntime(downtime._id)} onChange={onSelectIssue} value={downtime._id} name={downtime._id}></input>
          <label className='label-defect-body'>{downtime.issueCode} {downtime.issueName}</label>
          </td>
          <td className='input-defect-body-pcs'>
            <input type='number' disabled={disabledDownTime(downtime._id)} min="0" max="840" value={getDefaultMins(downtime._id)} name={downtime._id} className='input-defect-number' onChange={onMins} ></input>
          </td>
        </tr>  
      );
    }
  }
  const renderProduction = () =>{
    // const selected = this.state.selected;
    if(!selected){ 
      return null 
    }
    else{ 
      return programs.map(( program ) =>
        <tr key={program._id}>
          <td className='production_row'>
            <input type='checkbox' className='checkbox-input' checked={findMolde(program._id)} onChange={onSelect} value={program._id} name={program._id}></input>
            <label>{program.moldeNumber.moldeNumber}</label>
          </td>
          <td className='production_row'>
            <label>{program.partNumber.partName}</label>
          </td>
          <td className='production_row'>
            <input type='number' min="1" max="12000" disabled={disabledProduction(program._id)} value={getDefaultReal(program._id)} name={program._id} className='production_input' onChange={onRealProduction} ></input>
          </td>
          <td className='production_row'>
            <input type='number' min="0" max="12000" disabled={disabledProduction(program._id)} value={getDefaultNG(program._id)} name={program._id} className='production_input' onChange={onNGProduction}></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getOK(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getPlan(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type="number" step=".01" className='production_input' disabled={disabledProduction(program._id)} value={getWTime(program._id)} name={program._id} onChange={onWTProduction}></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getProd(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getDTime(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getAva(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getPerformance(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getQuality(program._id)} disabled></input>
          </td>
          <td className='production_row'>
            <input type='number' className='production_input' name={program._id} value={getOEE(program._id)} disabled></input>
          </td>
        </tr>  
      );
    }
  }

  const showMolds = ( ) => {
    setShow('molds')
    // return this.setState({show: 'molds'})
  }

  const showIssues = ( ) => {
    setShow('issues')
    // return this.setState({show: 'issues'})
  }

  const showDefects = ( ) => {
    setShow('defects')
    // return this.setState({show: 'defects'})
  }

  const showPurge = ( ) => {
    setShow('purge')
    // return this.setState({show: 'purge'})
  }

  // const showstate = () =>{
  //   return console.log(this.state)
  // }

  const renderTitle = () =>{
    if(!machine){
      return
    } else { return(
    <div className='title_header'>
            {/* <button type='button' onClick={this.showMolds}>Injection Molds</button> */}
            <button type='button' onClick={showIssues}>Downtime</button>
            <button type='button' onClick={showDefects}>Defects</button>
            <button type='button' onClick={showPurge}>Purge</button>
            {/* <button type='button' onClick={this.showstate}>state</button> */}
           </div>
    )
  }
}

const validateNegative = () =>{
  const production = selected.find( item => item.production.real <= 0 | item.production.ng < 0 | item.production.ng === '' | item.production.ok < 0 | item.production.wtime <= 0 | item.production.real % item.moldeNumber.cavities !== 0)
  const defect = defects.find( item => item.defectPcs <= 0 )
  const downt = downtime.find( item => item.mins <= 0 )
  const purge = resines.find( item => item.purge <= 0 )
  return !production && !defect && !downt && !purge ? true : false
}

const validateNG = () =>{
  const production = selected.map(item => {
    return { program: item.production.program, ng: item.production.ng }
  }).sort((a, b) => (a.program > b.program ) ? 1 : -1 )
  const defect = production.map( item => {
    const reduceDefects = defects.filter( defect => defect.program === item.program)
    .reduce( (a, b) =>{
      return a + b.defectPcs
    },0)
    return { program: item.program, ng: reduceDefects }
  }).sort((a, b) => (a.program > b.program ) ? 1 : -1 )
  return JSON.stringify(production) === JSON.stringify(defect) ? true : false
}

const validateSubmit = () =>{
  // const timeToReport = this.getDowntimeToReport();
  // const TWTimes = TWTime

  const validNG = validateNG()
  const validNegative = validateNegative()
  // const TReal = this.state.TReal
  // const TOK = this.state.TOK
  // const TNG = this.state.TNG
  const defect = totalDefectPcs()
  // if( timeToReport !== 0){ return false }
  if(defect !== TNG){ return false }
  else if(TWTime !== 0 && TReal <= 0){ return false }
  else if(TOK < 0 ){ return false }
  else if(!validNG){ return false }
  else if(!validNegative){ return false }
  else{ return true }
}

  const renderButton= ()=>{
    const validSubmit = validateSubmit()
    if(!validSubmit){ return <input type="submit" onSubmit={onSubmit} value="Submit" disabled></input> }
    else{ return <input type="submit" onSubmit={onSubmit} value="Submit"></input> }
  }

  const getDowntimeToReport = () =>{
    // const { time, TWTime } = this.state;
    const totalTime = parseFloat(time * 60);
    const totalW = parseFloat(TWTime * 60);
    const mins = totalMins();
    const minsToReport = totalTime - totalW - mins
    return parseInt(minsToReport)
  }

  const renderDownTable = () =>{
    if(!machine){
      return
    } else { 
      return (
        <table className='production_table-container-downtime'>
          <thead>
      <tr>
        <th className='defect-header-table'>Downtime to report ({getDowntimeToReport()})</th>
        <th className='pcs-header-table'>Time (min)</th>
      </tr>
      </thead>
      <tbody>
        {renderTableDownTime()}
      </tbody>
      <tfoot>
      <tr>
      <th className='production_table control-mins'>Total Downtime</th>
      <th className='production_table mins'><input type='number' className='production_input' name='mins' value={totalMins()} disabled></input></th>

      </tr>
      </tfoot>
      </table>    
      )}
  }


  const renderChoose = () =>{

    if(!machine){
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
        <th className='production_table prod'>Prod (pcs)</th>
        <th className='production_table downtime_table'>DTime (hrs)</th>
        <th className='production_table availability'>Avail%</th>
        <th className='production_table performance'>Perf%</th>
        <th className='production_table quality'>Qlty%</th>
        <th className='production_table oee'>OEE%</th>
      </tr>
      </thead>
      <tbody>
        {renderProduction()}
      </tbody>
      <tfoot>
      <tr>
        <th colSpan='2' className='production_table total_yellow'>Total</th>
      <th className='production_table pcs'><input type='number' className='production_input' name='real' value={TReal} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TNG} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TOK} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TPlan} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TWTime} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TProd} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TDTime} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TAvailability} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TPerformance} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TQuality} disabled></input></th>
        <th className='production_table ng'><input type='number' className='production_input' name='real' value={TOEE} disabled></input></th>
      </tr>
      </tfoot>
      </table>    
      )
    }
  }


  const renderTable = () => {
    if(!machinesList){ return null}else{
      return (<table className='header_table_report'>
      <tbody>
      <tr>
        <th className="report_header"><label>Date: </label> 
            <input type="date" name='date' className='date_input' onChange={onInputChange} required/>
        </th>
        <th className="report_header">
            <label>Shift: </label> 
            <select onChange={onInputChange} name="shift" defaultValue="" required>
              <option disabled value="">select</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
        </th>
        <th className="report_header"><label>Machine: </label>
            <select onChange={onMachineChange} name="machine" defaultValue="" required>
              <option disabled value="">select</option>
              {renderMachines()}
            </select>
        </th>
        <th className="report_header">
            <label>Plan Time (hrs): </label>
            <input type="number" 
            className='time_input' 
            name='time'
            value={time}  min="0" max="14" onChange={onInputTimeChange} required/>
        </th>
      </tr>
      </tbody>
      </table>)
    }
  }

  const onChangeTeam = (e)=>{
    const team = e.target.value
    const profs = profilesList.filter( profile => profile.team === team)
    setProfiles(profs)
    setTeam(team)
    // return this.setState({profiles, team})
  }

  const onComments = (e) =>{
    const comments = e.target.value
    return setComments(comments)
    // return this.setState({comments})
  }

  const onInspector = (e) =>{
    const inspector = e.target.value;
    setInspector(inspector)
    // return this.setState({inspector})
  }

  const onOperator = (e) =>{
    const operator = e.target.value;
    setOperator(operator)
    // return this.setState({operator})
  }

  const renderInspectorOption = () =>{
    return profiles
    .sort( (a,b) => {
      if (a.position < b.position) return -1;
      
      return 0;
    })
    .map( item => {
      const position = item.position === 'Inspector' ? 'inspector' : item.position === 'Operator' ? 'operator' : 'leader';
      return <option key={item._id} value={item._id} className={position}>{`${item.position} - ${item.firstname} ${item.lastname}`}</option>
    })
  }

  const renderOperatorOption = () =>{
    return profiles
    .sort( (a,b) => {
      if (a.position > b.position) return -1;
      
      return 0;
      // if (a.firstname < b.firstname) return -1;
      
    })
    .map( item => {
      const position = item.position === 'Inspector' ? 'inspector' : item.position === 'Operator' ? 'operator' : 'leader';
      return <option key={item._id} value={item._id} className={position}>{`${item.position} - ${item.firstname} ${item.lastname}`}</option>
    })
  }

  const renderComments = () =>{
    if(!machine){ return null } 
     else {
        return (
        <div className='comments-container'>
          <div className='comments-area'>
            <label>Comments:</label>
            <textarea onChange={onComments} value={comments} className='textArea' rows='4' cols='35' maxLength='120'></textarea>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td><label>Team: </label></td>
                  <td>
                    <select value={team} onChange={onChangeTeam}>
                      <option value='' disabled>select</option>
                      <option value='varias'>R Varias</option>
                      <option value='amealco'>Amealco</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td><label htmlFor='inspector'>Inspector: </label></td>
                  <td>
                    { team && <select id='inspector' value={inspector} onChange={onInspector}>
                      <option value='' >select</option>
                      {renderInspectorOption()}
                    </select> }
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor='operator'>Operator: </label></td>
                  <td>
                    {team && <select id='operator' value={operator} onChange={onOperator}>
                      <option value='' >select</option>
                      {renderOperatorOption()}
                    </select>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

  

  
  if(message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal-report">
        <div className="modal-report-content report_modal">
          <h2 className='report-title'>Injection Production Report:</h2>
          <form onSubmit={onSubmit} className='report-form'>
           {renderTable()}          
          {renderChoose()}
           {renderTitle()}
          <div className='section_two'>
            {renderContainer()}
            {renderComments()}
            {/* <div className='downtime-table'>
              {this.renderDownTable()}
            </div> */}
          </div>
          
  
            
            
            
            
            <Link to="/reports"><button>Cancel</button></Link>
            {renderButton()}
          </form>
           

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  } else if(message === 'error'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Something goes Wrong, Try again later <Link to="/reports"><button onClick={onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Report added correctly <Link to="/reports"><button onClick={onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
}
  


const mapStateToProps = state =>({
  profilesList: state.profiles,
  issuesList: state.issues,
  machinesList: state.machines,
  materialsList: state.materials,
  programsList: state.programs,
  defectsList: state.defects,
  message: state.reportMessage
})

export default connect(mapStateToProps, {
  fetchDefects, 
  fetchWorkers, 
  fetchPrograms, 
  fetchMachines, 
  fetchMaterials, 
  fetchIssues,
  addReport, closeReport
})(AddReport)