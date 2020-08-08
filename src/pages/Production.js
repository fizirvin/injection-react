import React from 'react';
import DowntimeBar from './charts/DowntimeBar.js'
import DowntimeWeekChart from './charts/DowntimeWeekChart.js'
import DownTimeWeekByMachine from './charts/DowntimeWeekByMachine.js'
import WeekChart from './charts/WeekChart'
import WeekChartVertical from './charts/WeekChartVertical'
import BarChart from './charts/BarCharts'

import { filterDayTotalReal, filterWeekTotalReal, filterDayTotalNG, filterWeekTotalNG,
  filterDayTotalOK, filterWeekTotalOK, filterDayTotalPlan, filterWeekTotalPlan, filterDayTotalWTime, filterWeekTotalWTime,
  filterDayTotalDTime, filterWeekTotalDTime, filterDayTotalOEE, filterWeekTotalOEE, filterDayTotalPurge, filterWeekTotalPurge,
  filterHighest, filterHighestIndicator, filterHighestPurgeByDay, filterHighestPurge, filterHighestDefectByDay, filterHighestDefect, reduceRealMolde, reduceNGMolde, reduceOKMolde,
  reducePlanMolde, reduceTimeMolde, reduceDownTimeMolde, filterTotalMoldeReal, filterTotalMoldeNG,
  filterTotalMoldeOK, filterTotalMoldePlan, filterTotalMoldeTime, filterTotalMoldeDTime, reduceMoldeOEE,
  filterTotalOEEMolde, reduceDefectListByDate, reduceDefectListByCode, reduceDefectListByIdDate, reducePurgeByResine, reduceMinsByIssue, reduceRealModel, reduceNGModel,
  reduceOKModel, reducePlanModel, reduceTimeModel, reduceDownTimeModel, reduceModelOEE, filterTotalModelReal, filterTotalModelNG,
  filterTotalModelOK, filterTotalModelPlan, filterTotalModelTime, filterTotalModelDTime, filterTotalOEEModel,
  reduceReal, reduceNG, reduceOK, reduceTime, reduceDownTime, reducePlan, reduceOEE, filterTotalOK, filterTotalPlan, filterTotalTime, filterTotalDTime,
  filterTotalOEE, filterTotalReal, filterTotalNG, reducePurge, filterTotalPurge } from '../actions/helpers'

class Production extends React.Component {
  state = {
    today:'',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    data: [],
    week: [],
    moldes: [...this.props.moldes],
    models: [...this.props.models],
    machines: [...this.props.machines],
    materials: [...this.props.materials],
    production: [...this.props.production],
    purge: [...this.props.purge],
    downtime: [...this.props.downtime],
    ng: [...this.props.ng],
    reports: [...this.props.reports],
    shift: '12',
    render: 'Machine',
    graphic: 'Machine',
    detail: 'off',
    data2: [],
    data3: [],
    week2: [],
    week3: [],
    data4: [],
    week4: [],
    title2: 'Production by Machine',
    period: 'week',
    realtable: { },
    ngtable: { },
    oktable: { },
    plantable: { },
    worktimetable: { },
    downtimetable: { },
    oeetable: { },
    purgetable: { },
    header: {
      position1: 'Jan',
      position2: 'Feb',
      position3: 'Mar',
      position4: 'Apr',
      position5: 'May',
      position6: 'Jun',
      position7: 'Jul',
      position8: 'Total'
    },
    subheader: {
      position1: 1,
      position2: 2,
      position3: 3,
      position4: 4,
      position5: 5,
      position6: 6,
      position7: 7,
      position8: '2020'
    }
  }

  async componentDidMount (){
    const date = new Date();
    const today = this.formatDate(date)+'T01:00:00.000-06:00'

    const state = {
    today: today,  
    monday: this.getDateofTable(1, today),
    tuesday: this.getDateofTable(2, today),
    wednesday: this.getDateofTable(3, today),
    thursday: this.getDateofTable(4, today),
    friday: this.getDateofTable(5, today),
    saturday: this.getDateofTable(6, today),
    sunday: this.getDateofTable(7, today)
    }

    const {render, production, downtime } = this.state
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    // const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    // const data3 = this.setGraphicFirstPurge(state.monday, state.sunday, purge)
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    return this.setState({...state, week, data, week2})
  }
//-------------------------------------
  goToDate = (e) =>{
    const date1 = e.target.value + 'T01:00:00.000-06:00'
    const date = new Date(date1);
  
    const today= this.formatDate(date)+'T01:00:00.000-06:00';
    const state = {
      today: today,  
      monday: this.getDateofTable(1, today),
      tuesday: this.getDateofTable(2, today),
      wednesday: this.getDateofTable(3, today),
      thursday: this.getDateofTable(4, today),
      friday: this.getDateofTable(5, today),
      saturday: this.getDateofTable(6, today),
      sunday: this.getDateofTable(7, today),
    }
     
    
    const { render, production, downtime, purge, ng } = this.state
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const data3 = this.setGraphicFirstPurge(state.monday, state.sunday, purge)
    const data4 = this.setGraphicFirstDefect(state.monday, state.sunday, ng)
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week3 = this.setGraphicFirstMachinePurge(state.monday, state.sunday, purge)
    const week4 = this.setGraphicFirstMachineDefect(state.monday, state.sunday, ng)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, week2, data3, week3, data4, week4})
  }

  goBack = async () =>{
    const date1 = this.state.today;
    const date = new Date(date1);
    const pastWeek = date.getDate()-7;
    date.setDate(pastWeek);
    const today= this.formatDate(date)+'T01:00:00.000-06:00';

    const state = {
      today: today,  
      monday: this.getDateofTable(1, today),
      tuesday: this.getDateofTable(2, today),
      wednesday: this.getDateofTable(3, today),
      thursday: this.getDateofTable(4, today),
      friday: this.getDateofTable(5, today),
      saturday: this.getDateofTable(6, today),
      sunday: this.getDateofTable(7, today),
    }
    
  
    const { render, production, downtime, purge, ng } = this.state
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const data3 = this.setGraphicFirstPurge(state.monday, state.sunday, purge)
    const data4 = this.setGraphicFirstDefect(state.monday, state.sunday, ng)
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week3 = this.setGraphicFirstMachinePurge(state.monday, state.sunday, purge)
    const week4 = this.setGraphicFirstMachineDefect(state.monday, state.sunday, ng)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, week2, data3, week3, data4, week4})
  }

  goForward = async () =>{
    const date1 = this.state.today;
    const date = new Date(date1);
    const nextWeek = date.getDate()+7;
    date.setDate(nextWeek);
    const today= this.formatDate(date)+'T01:00:00.000-06:00';
    
    const state = {
      today: today,  
      monday: this.getDateofTable(1, today),
      tuesday: this.getDateofTable(2, today),
      wednesday: this.getDateofTable(3, today),
      thursday: this.getDateofTable(4, today),
      friday: this.getDateofTable(5, today),
      saturday: this.getDateofTable(6, today),
      sunday: this.getDateofTable(7, today),
    }
    
    const { render, production, downtime, purge, ng } = this.state
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const data3 = this.setGraphicFirstPurge(state.monday, state.sunday, purge)
    const data4 = this.setGraphicFirstDefect(state.monday, state.sunday, ng)
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week3 = this.setGraphicFirstMachinePurge(state.monday, state.sunday, purge)
    const week4 = this.setGraphicFirstMachinePurge(state.monday, state.sunday, ng)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, data3, week2, week3, data4, week4})
  }
  
//----------------------------------------------------  
  getDateofTable = (number, aDate)=>{
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - this.todayIs(today);
    const set = dayOfMonth + difference;
    const date= today.setDate(set);
    
    return this.formatDate(date)
  }

  todayIs(date){
    const today = date
    const dayOfWeek = today.getDay()
    let day;
    switch (dayOfWeek) {
      case 0:
        day = 7;
        break;
      case 1:
        day = 1;
        break;
      case 2:
         day = 2;
        break;
      case 3:
        day = 3;
        break;
      case 4:
        day = 4;
        break;
      case 5:
        day = 5;
        break;
      case 6:
        day = 6;
        break;
        default:
        day = 6;  
    }
    return day
  }

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate();
    const m = date.getMonth()+1

    function M(){
      if(m < 10){
        return '0'+ m
      } else { return m } 
    }
    
    function D(){
      if(d < 10){
        return '0'+ d
      } else { return d }
    }
  
    const formatD = D();
    const formatM = M();
    formatDate = y + '-'+ formatM + '-'+ formatD
    return formatDate
  }
//------------------------------
  
setDataForGraph = ( id ) =>{
  const monday = this.reduceMins(this.state.monday, id);
  const tuesday = this.reduceMins(this.state.tuesday, id);
  const wednesday = this.reduceMins(this.state.wednesday, id);
  const thursday = this.reduceMins(this.state.thursday, id);
  const friday = this.reduceMins(this.state.friday, id);
  const saturday = this.reduceMins(this.state.saturday, id);
  const sunday = this.reduceMins(this.state.sunday, id);

  const week = [
    {
      day: 'Mon',
      mins: monday,
    },
    {
      day: 'Tue',
      mins: tuesday
    },
    {
      day: 'Wed',
      mins: wednesday
    },
    {
      day: 'Thu',
      mins: thursday
    },
    {
      day: 'Fri',
      mins: friday
    },
    {
      day: 'Sat',
      mins: saturday
    },
    {
      day: 'sun',
      mins: sunday
   }
  ]

  return <DowntimeBar data={week}></DowntimeBar>
}

renderGraphic = () =>{

  if(this.state.graphic === 'Downtime'){
    return (<div className='Graphic'>
      <div className='title_graphic'>Downtime by machine</div>   
        <DownTimeWeekByMachine data={this.state.week2}> </DownTimeWeekByMachine>
    </div>)
  }
  else if(this.state.graphic === 'Purge'){
    return (<div className='Graphic'>
      <div className='title_graphic'>Purge by machine</div>    
        <DownTimeWeekByMachine data={this.state.week3}> </DownTimeWeekByMachine>
    </div>)
  }
  else if(this.state.graphic === 'NG'){
    return (<div className='Graphic'>
      <div className='title_graphic'>NG by machine</div>    
        <DownTimeWeekByMachine data={this.state.week4}> </DownTimeWeekByMachine>
    </div>)
  }
  else { 
    return (<div className='Graphic'>
      <div className='title_graphic'>Production by Day</div>  
    <BarChart data={this.state.week}></BarChart>
    </div>)
  }
}

renderModelGraphic = () =>{
  if(this.state.graphic === 'Machine'){
    return (
      <div className='Graphic'>
        <div className='title_graphic'>Production by machine</div>  
        <WeekChart title={this.state.title2} data={this.state.data}></WeekChart>
      </div>
    )
  }
  else if(this.state.graphic === 'Downtime'){
    return (
      <div className='Graphic'>
        <div className='title_graphic'>Downtime by Issue</div>   
        <DowntimeWeekChart data={this.state.data2}></DowntimeWeekChart>
      </div>
    )
  }
  else if(this.state.graphic === 'Purge'){
    return (
      <div className='Graphic'>
        <div className='title_graphic'>Purge by resine</div>   
        <DowntimeWeekChart data={this.state.data3}></DowntimeWeekChart>
      </div>
    )
  }
  else if(this.state.graphic === 'NG'){
    return (
      <div className='Graphic'> 
          <div className='title_graphic'>NG by defect</div> 
        <DowntimeWeekChart data={this.state.data4}></DowntimeWeekChart>
      </div>
    )
  }
  else if(this.state.graphic === 'Model'){
    return (
      <div className='Graphic'>  
      <div className='title_graphic'>Production by model</div>
        <WeekChartVertical title={this.state.title2} data={this.state.data}></WeekChartVertical>
      </div>
    )
  }
  else{
    return (
      <div className='Graphic'>
        <div className='title_graphic'>Production by molde</div>  
        <WeekChartVertical title={this.state.title2} data={this.state.data}></WeekChartVertical>
      </div>
    )
  }
}

renderDowntimeWeekGraphic = () =>{
  if(this.state.data.length === 0){
    return 
  }
  else { 
    return (
      <div className='Graphic'>  
        <DowntimeWeekChart data={this.state.data}> </DowntimeWeekChart>
      </div>
    )
  }
}

renderDowntimeByMachineGraphic = () =>{
  if(this.state.data.length === 0){
    return 
  }
  else { 
    return (
      <div className='Graphic'>  
        <DownTimeWeekByMachine data={this.state.week}> </DownTimeWeekByMachine>
      </div>
    )
  }
}

//---------------------------
  FilterDataForGraphByMachine = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.machine === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.mins || 0
      },0)

    return reduce
  }

  FilterDataForGraphByMachinePurge = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.machine === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.purge || 0
      },0)

    return reduce
  }

  FilterDataForGraphByMachineDefect = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.machine === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)

    return reduce
  }

  setGraphicFirstMachine = (mon, sun, arr) =>{ 
    const data = this.props.machines.map(machine =>{  
      const mins = this.FilterDataForGraphByMachine(machine._id, mon, sun, arr)
      return {machine: machine.machineNumber, mins: mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  setGraphicFirstMachinePurge = (mon, sun, arr) =>{ 
    const data = this.props.machines.map(machine =>{  
      const mins = this.FilterDataForGraphByMachinePurge(machine._id, mon, sun, arr)
      return {machine: machine.machineNumber, mins: mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  setGraphicFirstMachineDefect = (mon, sun, arr) =>{ 
    const data = this.props.machines.map(machine =>{  
      const mins = this.FilterDataForGraphByMachineDefect(machine._id, mon, sun, arr)
      return {machine: machine.machineNumber, mins: mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  FilterDataForGraphPurge = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.resine === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.purge || 0
      },0)

    return reduce
  }

  FilterDataForGraphDefect = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.defect === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.defectPcs || 0
      },0)

    return reduce
  }

  FilterDataForGraph = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.issue === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.mins || 0
      },0)

    return reduce
  }

  setGraphicFirst = (mon, sun, arr) =>{ 
    const data = this.props.issues.map(({_id, issueCode, issueName}) =>{  
      const mins = this.FilterDataForGraph(_id, mon, sun, arr)
      const issue = `${issueCode} ${issueName}`
      return {issue, mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  setGraphicFirstPurge = (mon, sun, arr) =>{ 
    const data = this.props.materials.map(({_id, acronym, color}) =>{  
      const mins = this.FilterDataForGraphPurge(_id, mon, sun, arr)
      const issue = `${acronym} ${color}`
      return {issue, mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  setGraphicFirstDefect = (mon, sun, arr) =>{ 
    const data = this.props.defects.map(({_id, defectCode, defectName }) =>{  
      const mins = this.FilterDataForGraphDefect(_id, mon, sun, arr)
      
      const issue = `${defectCode} ${defectName}`
      return {issue, mins}
    })
    return data.filter( item => item.mins > 0).sort((x, y)  => y.mins - x.mins)
  }
  //-----------------------------------

  forGraphMolde = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphMoldeNG = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  forGraphMachine = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphMachineNG = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  forGraphOK = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon
      && item.date <= sun)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphNG = (id, mon, sun, arr) =>{
    const array = [...arr]
    const filter = array.filter( 
      item => item.date >= mon
      && item.date <= sun)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  setGraphicFilter = (mon, sun, filter, array) =>{ 
    if(filter === 'Model'){
      const data = this.state.models.map(model =>{  
        const ok = this.forGraphOK(model._id, mon, sun, array)
        const ng = this.forGraphNG(model._id, mon, sun, array)
        return {part: model.partName, ok: ok, ng: ng}
      })
      return data.sort((x, y)  => y.ok - x.ok)
    }
    else if(filter === 'Machine'){
      const data = this.state.machines.map(machine =>{  
        const ok = this.forGraphMachine(machine._id, mon, sun, array)
        const ng = this.forGraphMachineNG(machine._id, mon, sun, array)
        return {part: machine.machineNumber, ok: ok, ng: ng}
      })
      return data.sort((x, y)  => y.ok - x.ok)
    }
    else if( filter === 'Molde'){
      const data = this.state.moldes.map(molde =>{  
        const ok = this.forGraphMolde(molde._id, mon, sun, array)
        const ng = this.forGraphMoldeNG(molde._id, mon, sun, array)
        return {part: molde.moldeNumber, ok: ok, ng: ng}
      })
      return data.sort((x, y)  => y.ok - x.ok)
    }
    else { return }
  }

  GraphAllWeekFirst = (mon, tue, wed, thu, fri, sat, sun, array) =>{ 
    const monday = this.reduceOKforWeekGraph(mon, array);
    const monNG = this.reduceNGforWeekGraph(mon, array);
    const tuesday = this.reduceOKforWeekGraph(tue, array);
    const tueNG = this.reduceNGforWeekGraph(tue, array);
    const wednesday = this.reduceOKforWeekGraph(wed, array);
    const wedNG = this.reduceNGforWeekGraph(wed, array);
    const thursday = this.reduceOKforWeekGraph(thu, array);
    const thuNG = this.reduceNGforWeekGraph(thu, array);
    const friday = this.reduceOKforWeekGraph(fri, array);
    const friNG = this.reduceNGforWeekGraph(fri, array);
    const saturday = this.reduceOKforWeekGraph(sat, array);
    const satNG = this.reduceNGforWeekGraph(sat, array);
    const sunday = this.reduceOKforWeekGraph(sun, array);
    const sunNG = this.reduceNGforWeekGraph(sun, array);
    const week = [
      {
        part: 'Mon',
        ok: monday,
        ng: monNG
      },
      {
        part: 'Tue',
        ok: tuesday,
        ng: tueNG
      },
      {
        part: 'Wed',
        ok: wednesday,
        ng: wedNG
      },
      {
        part: 'Thu',
        ok: thursday,
        ng: thuNG
      },
      {
        part: 'Fri',
        ok: friday,
        ng: friNG
      },
      {
        part: 'Sat',
        ok: saturday,
        ng: satNG
      },
      {
        part: 'sun',
        ok: sunday,
        ng: sunNG
      }
    ]
    return week
  } 
    

  //-----------------------------------
  filterDowntime = (date, id) => {
    const array = [...this.state.data]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)

    return filter
  }

  //----------------------------------------//

  filterDateforWeekGraph = (date, arr) => {
    const array = [...arr]
    const filter = array.filter( item => item.date === date)
    return filter
  }

  filterMoldeDate = (date, id) => {
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.molde === id)
    return filter
  }

  reduceNGforWeekGraph = (date, array) =>{
    const reduce = this.filterDateforWeekGraph(date, array).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceOKforWeekGraph = (date, array) =>{
    const reduce = this.filterDateforWeekGraph(date, array).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  filterWeekTotalReal = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
  }

  filterWeekTotalWTime = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return this.precise_round(reduce,2)
  }

  filterDayTotalMins = (day) =>{
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    return reduce
  }

  filterWeekTotalMins = () =>{
    const array = [...this.state.downtime]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    return reduce
  }
  // filterTotalEfficiency = (id) =>{
  //   const array = [...this.props.production]
  //   const filter = array.filter( 
  //     item => item.date >= this.state.monday 
  //     && item.date <= this.state.sunday)
  //     .filter( item => item.machine === id)
  //   const length = filter.length  
  //   const reduce = filter.reduce( (a, b) =>{
  //     return a + parseFloat(b.oee.$numberDecimal) || 0
  //   },0)

  //   return reduce/length || 0
  // }

  filterMins = (date, id) => {
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
  }

  filterModelMins = (date, id) => {
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === date).filter( item => item.part === id)
    return filter
  }

  reduceMins = (date, id) =>{
    const reduce = this.filterMins(date, id).reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    return reduce
  }

  reduceModelMins = (date, id) =>{
    const reduce = this.filterModelMins(date, id).reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    return reduce
  }

  filterTotalMins = (id) =>{
    const array = [...this.state.downtime]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    return reduce
  }

  precise_round(num, dec){
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  filterArrayDowntime = (id) =>{
    const array = [...this.state.downtime]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
      // const issues = [...new Set(filter)];
      const issues = [...filter]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue.issue)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issue, issueCode: issue.issueCode, mins: reduceMins }
        })

    return mapping.sort((x, y)  => y.mins - x.mins)
  }

  filterArrayPurge = (id) =>{
    const array = [...this.state.purge]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
      // const issues = [...new Set(filter)];
      const resines = [...filter]
      const mapping = resines.map( resine =>
        {
          const reducePurge = filter.filter( item => item.resine === resine.resine)
          .reduce( (a, b) =>{
            return a + b.purge || 0
          },0)
          return {resine: resine.resine, acronym: resine.acronym, color: resine.color, purge: reducePurge }
        })
        
    return mapping.sort((x, y)  => y.purge - x.purge)
  }

  filterArrayDefect = (id) =>{
    const array = [...this.state.ng]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
      // const issues = [...new Set(filter)];
      const defects = [...filter]
      const mapping = defects.map( defect =>
        {
          const reduce = filter.filter( item => item.partNumber === defect.partNumber && item.molde === defect.molde && item.defect === defect.defect)
          .reduce( (a, b) =>{
            return a + b.defectPcs || 0
          },0)
          return { partName: defect.partName, moldeNumber: defect.moldeNumber, defectCode: defect.defectCode, defectPcs: reduce }
        })

    return mapping.sort((x, y)  => y.defectPcs - x.defectPcs)
  }

  filterArrayDefectModelMolde = (id) =>{
    const array = [...this.state.ng]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
      // const issues = [...new Set(filter)];

      const items = [...filter]; // Some array I got from async call

      const uniqueMoldeModels = Array.from(new Set(items.map( ({moldeNumber, partName})  =>{ 
        const reduce = filter.find( item => item.partName === partName && item.moldeNumber === moldeNumber )
        return reduce })))

      const mapping = uniqueMoldeModels.map( item =>{
        const items = filter.filter( i => i.partNumber === item.partNumber && i.molde === item.molde)
        const defects = items.map( d =>{
          return {defectCode: d.defectCode, pcs: d.defectPcs, defectName: d.defectName, date: d.date, id: d.defect}
        })
        const reduce = items.reduce( (a, b) =>{
          return a + b.defectPcs || 0
        },0)
          return { partName: item.partName, moldeNumber: item.moldeNumber, defects: [...defects], defectPcs: reduce }
      })
      return mapping
     
  }

  

  showReports = () =>{
    console.log(this.state, this.props)
  }

  changeTo = (e) =>{
    const production = this.state.production
    if( e.target.name === 'Machine'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, graphic: e.target.name, data, title2: 'Production by Machine'})
    }
    else if(e.target.name === 'Molde'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Molde', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, graphic: e.target.name, data, title2: 'Production by Molde'})
    }
    else if(e.target.name === 'Model'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Model', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, graphic: e.target.name, data, title2: 'Production by Model'})
    }
    else{ return }
  }

  changePeriod = (e) =>{
    const period = e.target.name;
    return this.setState({period})
  }

  changeShift = (e) =>{
    const shift = e.target.name
    if(shift === '12'){
      const production = [...this.props.production]
      const purge = [...this.props.purge]
      const downtime = [...this.props.downtime]
      const ng = [...this.props.ng]
      const render = this.state.render
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, render, production )
      const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
      const data3 = this.setGraphicFirstPurge(this.state.monday, this.state.sunday, purge)
      const data4 = this.setGraphicFirstDefect(this.state.monday, this.state.sunday, ng)
      const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      const week3 = this.setGraphicFirstMachinePurge(this.state.monday, this.state.sunday, purge)
      const week4 = this.setGraphicFirstMachineDefect(this.state.monday, this.state.sunday, ng)
      return this.setState({production, downtime, purge, ng, shift, week, data, data2, week2, data3, week3, data4, week4})
    } else{
      const production = [...this.props.production].filter(item => item.shift === shift)
      const purge = [...this.props.purge].filter(item => item.shift === shift)
      const downtime = [...this.props.downtime].filter(item => item.shift === shift)
      const ng = [...this.props.ng].filter(item => item.shift === shift)
      
      const render = this.state.render
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, render, production )
      const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
      const data3 = this.setGraphicFirstPurge(this.state.monday, this.state.sunday, purge)
      const data4 = this.setGraphicFirstDefect(this.state.monday, this.state.sunday, ng)
      const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
      const week3 = this.setGraphicFirstMachinePurge(this.state.monday, this.state.sunday, purge)
      const week4 = this.setGraphicFirstMachineDefect(this.state.monday, this.state.sunday, ng)
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      return this.setState({production, ng, downtime, purge, shift, week, data, data2, week2, data3, week3, data4, week4})
    }
  }

  shiftActive = (name) =>{
    return name === this.state.shift ? 'shiftActive' : null 
  }

  filterActive = (name) =>{
    return name === this.state.render ? 'shiftActive' : null 
  }

  periodActive = (name) =>{
    return name === this.state.period ? 'periodActive' : null 
  }

  indicatorActive = (name) =>{
    return this.state.detail === name ? 'shiftActive' : null 
  }

  detailActive = (name) =>{
    const detail = this.state.graphic === name
    return detail ? 'downarrow_button_selected' : 'downarrow_button'
  }

  turnOnIndicators = () =>{
    return this.state.detail === 'off' ? this.setState({detail: 'on'}) : this.setState({detail: 'off'})
  }

  detailDowntime = (e) =>{
    const item = this.state.graphic
    if(item === e.target.name){
      const production = [...this.state.production]
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine', production )
      const graphic = 'Machine'
      return this.setState({graphic, data})
    }
    else{
      
      const graphic = e.target.name
      
      const { purge, downtime, ng } = this.state
      const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
      const data3 = this.setGraphicFirstPurge(this.state.monday, this.state.sunday, purge)
      const data4 = this.setGraphicFirstDefect(this.state.monday, this.state.sunday, ng)
      const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
      const week3 = this.setGraphicFirstMachinePurge(this.state.monday, this.state.sunday, purge)
      const week4 = this.setGraphicFirstMachineDefect(this.state.monday, this.state.sunday, ng)
      return this.setState({graphic, data2, week2, data3, week3, data4, week4})
    }
  }

  formatDateField = (day, style) =>{
    const date = new Date();
    const today = this.formatDate(date)
    const normal = `${style}`;
    const selected = `${style} production_today_field`
    
    if( today === day){
      return selected
    } else{
      return normal
    }
  }

  renderHeaderTable(){
    if( this.state.period === 'week' ){
      return (
        <table className='efficiency_tablehader'>
          <thead>
            <tr>
      <th className='efficiency_header_machine' colSpan='3' rowSpan='2'>Production By {this.state.render}</th>
              <th className={this.formatDateField(this.state.monday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Mon</div><div>{this.state.monday}</div></th>
              <th className={this.formatDateField(this.state.tuesday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Tue</div><div>{this.state.tuesday}</div></th>
              <th className={this.formatDateField(this.state.wednesday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Wed</div><div>{this.state.wednesday}</div></th>
              <th className={this.formatDateField(this.state.thursday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Thu</div><div>{this.state.thursday}</div></th>
              <th className={this.formatDateField(this.state.friday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Fri</div><div>{this.state.friday}</div></th>
              <th className={this.formatDateField(this.state.saturday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Sat</div><div>{this.state.saturday}</div></th>
              <th className={this.formatDateField(this.state.sunday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>Sun</div><div>{this.state.sunday}</div></th>
              <th className='efficiency_header_week' colSpan='2' rowSpan='1'><div>Total</div><div>Week</div></th>
              {/* <th className='efficiency_header_highest'>Highest (mins)</th>
              <th className='efficiency_header_item'>Indicator Item</th> */}
            </tr>
          </thead>
        </table>
      )
    } else if ( this.state.period === 'month' ){ 
      return (
        <table className='efficiency_tablehader'>
          <thead>
            <tr>
              <th className='efficiency_header_machine' colSpan='3' rowSpan='2'>Production By {this.state.render}</th>
              <th className={this.formatDateField(this.state.monday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position1}</div><div>{this.state.subheader.position1}</div></th>
              <th className={this.formatDateField(this.state.tuesday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position2}</div><div>{this.state.subheader.position2}</div></th>
              <th className={this.formatDateField(this.state.wednesday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position3}</div><div>{this.state.subheader.position3}</div></th>
              <th className={this.formatDateField(this.state.thursday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position4}</div><div>{this.state.subheader.position4}</div></th>
              <th className={this.formatDateField(this.state.friday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position5}</div><div>{this.state.subheader.position5}</div></th>
              <th className={this.formatDateField(this.state.saturday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position6}</div><div>{this.state.subheader.position6}</div></th>
              <th className={this.formatDateField(this.state.sunday, 'efficiency_header_day')} colSpan='2' rowSpan='1'><div>{this.state.header.position7}</div><div>{this.state.subheader.position7}</div></th>
              <th className='efficiency_header_week' colSpan='2' rowSpan='1'><div>{this.state.header.position8}</div><div>{this.state.subheader.position8}</div></th>
              {/* <th className='efficiency_header_highest'>Highest (mins)</th>
              <th className='efficiency_header_item'>Indicator Item</th> */}
            </tr>
          </thead>
        </table>
      )
    }
  }

  renderHeader(){
    return (
      <div className='downtime_header'>
        
        <div className='downtime_controlls'>
          <table className='controls_table'>
            <tbody>
              <tr>
                <td>Period:</td><td><button name='week' className={this.periodActive('week')} onClick={this.changePeriod}>Week</button><button className={this.periodActive('month')} name='month' onClick={this.changePeriod}>Month</button></td>
                <td>Shifts:</td>
                <td><button name='12' className={this.shiftActive('12')} onClick={this.changeShift}>Shift 1&2</button><button name='1' className={this.shiftActive('1')} onClick={this.changeShift}>Shift 1</button><button name='2' className={this.shiftActive('2')} onClick={this.changeShift}>Shift 2</button></td>
                <td>Change Week:</td>
                <td><button onClick={this.goBack}>Go Back</button><button onClick={this.goForward}>Go Forward</button></td>
                <td>Filter By:</td>
                <td><button name='Machine' className={this.filterActive('Machine')} onClick={this.changeTo}>Machine</button><button name='Model' className={this.filterActive('Model')} onClick={this.changeTo}>Model</button><button name='Molde' className={this.filterActive('Molde')} onClick={this.changeTo}>Molde</button>
                <button name='Machine' className={this.indicatorActive('on')} onClick={this.turnOnIndicators}>Indicators ▼</button>
                </td>
                <td>Go to Date:</td>
                <td><input type='date' onChange={this.goToDate}></input></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderMachineBody = () =>{
    return this.state.machines.map( machine =>
      <table key={machine._id} className='efficiency_body_table'>
        <tbody>
        <tr>
            <th className='title_body_model' colSpan="9">MACHINE #{machine.machineNumber}</th>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Real (pcs)</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceReal(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalReal(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceNG(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalNG(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          </tbody>
          
          {this.renderDefectDetail(machine._id)}
          <tbody>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOK(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalOK(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePlan(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalPlan(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceTime(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalTime(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTime(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalDTime(this.state.production, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          {this.renderDowntimeDetail(machine._id)}
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reduceOEE(this.state.production, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalOEE(this.state.production, machine._id, this.state.monday, this.state.sunday)} </td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Purge (g)</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{reducePurge(this.state.purge, this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{filterTotalPurge(this.state.purge, machine._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          {this.renderPurgeDetail(machine._id)}
        </tbody>
      </table>
    )
  }

  renderModelBody = () =>{
    return this.state.models.map( model =>
      <table key={model._id} className='efficiency_body_table'>
        <tbody>
          <tr>
            <th className='title_body_model' colSpan="9">MODEL {model.partName}</th>
          </tr>
          <tr>
            <td className='efficiency_body_machine'> Real (pcs)</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceRealModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelReal(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceNGModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelNG(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceOKModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelOK(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reducePlanModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelPlan(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelTime(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeModel(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalModelDTime(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{reduceModelOEE(this.state.production, this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{filterTotalOEEModel(this.state.production, model._id, this.state.monday, this.state.sunday)}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderDowntimeDetail = (id) =>{
    const detail = this.state.detail === 'on'
    if(detail){
      const array = this.filterArrayDowntime(id)

      const uniqueDowntimeList = Array.from(new Set(array.map( ({issue})  =>{ 
        const reduce = array.find( item => item.issue === issue )
        return reduce })))

      return uniqueDowntimeList.map( issue =>
        <tr key={issue.issue}>
          <td className='efficiency_body_machine'>{issue.issueCode} (mins)</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.monday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.tuesday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.wednesday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.thursday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.friday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.saturday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{reduceMinsByIssue(this.state.downtime, this.state.sunday, id, issue.issue)}</td>
          <td className='efficiency_body_week'>{issue.mins}</td>
        </tr>
      )  
    } else {
      return null
    }
  }

  renderPurgeDetail = (id) =>{
    const detail = this.state.detail === 'on'
    if(detail){
      const array = this.filterArrayPurge(id)

      const uniquePurgeList = Array.from(new Set(array.map( ({resine})  =>{ 
        const reduce = array.find( item => item.resine === resine )
        return reduce })))

      return uniquePurgeList.map( resine =>
        <tr key={resine.resine}>
          <td className='efficiency_body_machine'>{resine.acronym} {resine.color} (g)</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.monday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.tuesday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.wednesday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.thursday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.friday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.saturday, id, resine.resine)}</td>
          <td className='efficiency_body_day'>{reducePurgeByResine(this.state.purge, this.state.sunday, id, resine.resine)}</td>
          <td className='efficiency_body_week'>{resine.purge}</td>
        </tr>
      )  
    } else {
      return null
    }
  }

  renderDefectDetail = (id) =>{
    const detail = this.state.detail === 'on'
    if(detail){
      const array = this.filterArrayDefectModelMolde(id)
     
      return array.map( (defect, index) => {
        
        return <tbody key={index}>
        <tr>
          <th className='title_body_model' colSpan='8'>Model: {defect.partName} {defect.moldeNumber}</th>
          <td className='efficiency_body_week' colSpan='1'>{defect.defectPcs}</td>
        </tr>
        {this.renderDefectList(defect.defects)}
        </tbody>
      }
      )  
    } else {
      return null
    }
  }

  
  renderTotaldefects = (arr) =>{
    const uniqueDefectList = Array.from(new Set(arr.map( ({id})  =>{ 
      const reduce = arr.find( item => item.id === id )
      return reduce })))

      return uniqueDefectList.map( ({defectCode, id}) =>
        <tr>
          <td className='efficiency_total_machine'>Total OK (pcs)</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.monday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.tuesday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.wednesday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.thursday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.friday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.saturday, id)}</td>
          <td className='efficiency_total_day'>{reduceDefectListByIdDate(arr, this.state.sunday, id)}</td>
          <td className='efficiency_total_week'>total</td>
      </tr>
      ) 
  }

  renderDefectList = (arr) =>{
    const uniqueDefectList = Array.from(new Set(arr.map( ({id})  =>{ 
      const reduce = arr.find( item => item.id === id )
      return reduce })))
     
    return uniqueDefectList.map( ({defectCode, id}) =>
        <tr key={id+'b'+defectCode}>
          <td className='efficiency_body_machine' colSpan='1'>{defectCode}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.monday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.tuesday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.wednesday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.thursday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.friday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.saturday, id)}</td>
          <td className='efficiency_body_day'>{reduceDefectListByDate(arr, this.state.sunday, id)}</td>
          <td className='efficiency_body_week' colSpan='1'>{reduceDefectListByCode(arr, id)}</td>
        </tr>
      ) 
  }

  renderMoldeBody = () =>{
    return this.state.moldes.map( molde =>
      <table key={molde._id} className='efficiency_body_table'>
        <tbody>
          <tr>
            <th className='title_body_model' colSpan="9">MOLDE {molde.moldeNumber}</th>
          </tr>
          <tr>
            <td className='efficiency_body_machine'> Real (pcs)</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceRealMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldeReal(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceNGMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldeNG(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceOKMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldeOK(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reducePlanMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldePlan(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceTimeMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldeTime(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceDownTimeMolde(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalMoldeDTime(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{reduceMoldeOEE(this.state.production, this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{filterTotalOEEMolde(this.state.production, molde._id, this.state.monday, this.state.sunday)}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderBodyRow = () =>{
    if(!this.state.machines) { return null } 
    else if(this.state.render === 'Model'){ return this.renderModelBody()}
    else if(this.state.render === 'Molde'){ return this.renderMoldeBody()}
    else { return this.renderMachineBody()}
  }

  renderTotalRow = () =>{
    if(this.state.period === 'week'){
      return ( 
        <table className='efficiency_tableTotal'>
          <tbody>
            <tr>
              <td className='efficiency_total_machine'>Total Real (pcs)</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalReal(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalReal(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='NG' onClick={this.detailDowntime} className={this.detailActive('NG')}></button> Total NG (pcs)</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalNG(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalNG(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total OK (pcs)</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOK(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalOK(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total Plan (pcs)</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPlan(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalPlan(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalWTime(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalWTime(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='Downtime' onClick={this.detailDowntime} className={this.detailActive('Downtime')}></button> Total Downtime (hrs)</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalDTime(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalDTime(this.state.production, this.state.monday, this.state.sunday)}</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total OEE (%)</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalOEE(this.state.production, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalOEE(this.state.production, this.state.monday, this.state.sunday)} </td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='Purge' onClick={this.detailDowntime} className={this.detailActive('Purge')}></button> Total Purge (g)</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.monday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.tuesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.wednesday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.thursday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.friday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.saturday)}</td>
              <td className='efficiency_total_day'>{filterDayTotalPurge(this.state.purge, this.state.sunday)}</td>
              <td className='efficiency_total_week'>{filterWeekTotalPurge(this.state.purge, this.state.monday, this.state.sunday)}</td>
            </tr>
            {this.renderIndicator()}
            {this.renderPurgeIndicator()}
            {this.renderDefectIndicator()}
          </tbody>
        </table>
      )
    } else if(this.state.period === 'month'){
      return ( 
        <table className='efficiency_tableTotal'>
          <tbody>
            <tr>
              <td className='efficiency_total_machine'>Total Real (pcs)</td>
              <td className='efficiency_total_day'>{this.state.realtable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.realtable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.realtable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='NG' onClick={this.detailDowntime} className={this.detailActive('NG')}></button> Total NG (pcs)</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.ngtable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.ngtable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total OK (pcs)</td>
              <td className='efficiency_total_day'>{this.state.oktable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oktable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.oktable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total Plan (pcs)</td>
              <td className='efficiency_total_day'>{this.state.plantable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.plantable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.plantable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.worktimetable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.worktimetable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='Downtime' onClick={this.detailDowntime} className={this.detailActive('Downtime')}></button> Total Downtime (hrs)</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.downtimetable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.downtimetable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'>Total OEE (%)</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.oeetable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.oeetable.position8 || 0 }</td>
            </tr>
            <tr>
              <td className='efficiency_total_machine'><button name='Purge' onClick={this.detailDowntime} className={this.detailActive('Purge')}></button> Total Purge (g)</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position1 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position2 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position3 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position4 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position5 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position6 || 0 }</td>
              <td className='efficiency_total_day'>{this.state.purgetable.position7 || 0 }</td>
              <td className='efficiency_total_week'>{this.state.purgetable.position8 || 0 }</td>
            </tr>
            {this.renderIndicator()}
            {this.renderPurgeIndicator()}
            {this.renderDefectIndicator()}
          </tbody>
        </table>
      )
    }
  }

  renderIndicator = () =>{
    const detail = this.state.detail === 'on'
    if(detail){
      return (
        <tr>
          <td className='efficiency_total_machine'>DT Indicator (mins)</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.monday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.tuesday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.wednesday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.thursday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.friday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.saturday)}</td>
          <td className='efficiency_total_day'>{filterHighest(this.state.downtime, this.state.sunday)}</td>
          <td className='efficiency_total_week'>{filterHighestIndicator(this.state.downtime, this.state.monday, this.state.sunday)}</td>
        </tr>
      )
    } else{ return null }
  }

  renderPurgeIndicator = () =>{
    const detail = this.state.detail === 'on'
    if(detail){
      return (
        <tr>
          <td className='efficiency_total_machine'>Purge Indicator (g)</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.monday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.tuesday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.wednesday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.thursday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.friday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.saturday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestPurgeByDay(this.state.purge, this.state.sunday, this.props.machines)}</td>
          <td className='efficiency_total_week'>{filterHighestPurge(this.state.purge, this.state.monday, this.state.sunday, this.props.machines)}</td>
        </tr>
      )
    } else{ return null }
  }

  renderDefectIndicator = () =>{
    const detail = this.state.detail === 'on'
    if(detail){
      return (
        <tr>
          <td className='efficiency_total_machine'>Defect Indicator (pcs)</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.monday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.tuesday, this.props.machines, )}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.wednesday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.thursday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.friday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.saturday, this.props.machines)}</td>
          <td className='efficiency_total_day'>{filterHighestDefectByDay(this.state.ng, this.state.sunday, this.props.machines)}</td>
          <td className='efficiency_total_week'>{filterHighestDefect(this.state.ng, this.state.monday, this.state.sunday, this.props.machines)}</td>
        </tr>
      )
    } else{ return null }
  }

  render(){
    return (
      <div className="Downtime">
          {/* {this.renderHeader()} */}
          {this.renderHeader()}
        <div className='downtime_graphs'>
          <div className='downtime_container'>
            
            {this.renderHeaderTable()}
            {this.renderTotalRow()}
            <div className='downtime_table_body'>
              {this.renderBodyRow()}
            </div>
          </div>
          <div className='graphics_container'>
            {this.renderGraphic()}
            {this.renderModelGraphic()}
            {/* {this.renderDowntimeWeekGraphic()}
            {this.renderDowntimeByMachineGraphic()} */}
          </div>
        </div>
      </div>
    )
  }
}

export default Production;