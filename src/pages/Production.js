import React from 'react';

import DowntimeBar from './charts/DowntimeBar.js'
import DowntimeWeekChart from './charts/DowntimeWeekChart.js'
import DownTimeWeekByMachine from './charts/DowntimeWeekByMachine.js'

import WeekChart from './charts/WeekChart'
import WeekChartVertical from './charts/WeekChartVertical'
import BarChart from './charts/BarCharts'

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
    production: [...this.props.production],
    purge: [...this.props.purge],
    downtime: [...this.props.downtime],
    reports: [...this.props.reports],
    shift: '12',
    render: 'Machine',
    data2: [],
    week2: []
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
    const render = this.state.render
    const production = this.props.production
    const downtime = this.state.downtime
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    // const data = this.setGraphicFirst(state.monday, state.sunday)
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
     
    const render = this.state.render
    const production = this.state.production
    const downtime = this.state.downtime
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, week2})
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
    
    const render = this.state.render
    const production = this.state.production
    const downtime = this.state.downtime
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, week2})
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
    const render = this.state.render
    const production = this.state.production
    const downtime = this.state.downtime
    const data = this.setGraphicFilter(state.monday, state.sunday, render, production )
    const data2 = this.setGraphicFirst(state.monday, state.sunday, downtime)
    const week2 = this.setGraphicFirstMachine(state.monday, state.sunday, downtime)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data, data2, week2})
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
  if(this.state.render === 'Downtime'){
    return (<div className='Graphic'>   
        <DownTimeWeekByMachine data={this.state.week2}> </DownTimeWeekByMachine>
    </div>)
  }
  else { 
    return (<div className='Graphic'> 
    <BarChart data={this.state.week}></BarChart>
    </div>)
  }
}

renderModelGraphic = () =>{
  if(this.state.render === 'Machine'){
    return (
      <div className='Graphic'>  
        <WeekChart data={this.state.data}></WeekChart>
      </div>
    )
  }
  else if(this.state.render === 'Downtime'){
    return (
      <div className='Graphic'>  
        <DowntimeWeekChart data={this.state.data2}></DowntimeWeekChart>
      </div>
    )
  }
  else{
    return (
      <div className='Graphic'>  
        <WeekChartVertical data={this.state.data}></WeekChartVertical>
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

  setGraphicFirstMachine = (mon, sun, arr) =>{ 
    const data = this.props.machines.map(machine =>{  
      const mins = this.FilterDataForGraphByMachine(machine._id, mon, sun, arr)
      return {machine: machine.machineNumber, mins: mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
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
      return data
    }
    else if(filter === 'Machine'){
      const data = this.state.machines.map(machine =>{  
        const ok = this.forGraphMachine(machine._id, mon, sun, array)
        const ng = this.forGraphMachineNG(machine._id, mon, sun, array)
        return {part: machine.machineNumber, ok: ok, ng: ng}
      })
      return data
    }
    else if( filter === 'Molde'){
      const data = this.state.moldes.map(molde =>{  
        const ok = this.forGraphMolde(molde._id, mon, sun, array)
        const ng = this.forGraphMoldeNG(molde._id, mon, sun, array)
        return {part: molde.moldeNumber, ok: ok, ng: ng}
      })
      return data
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

  filterMachineDate = (date, id) => {
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
  }

  filterModelDate = (date, id) => {
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.part === id)
    return filter
  }

  filterMoldeDate = (date, id) => {
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === date).filter( item => item.molde === id)
    return filter
  }

  reduceReal = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
  }

  reduceRealModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
  }

  reduceRealMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + b.real || 0
    },0)
    return reduce
  }

  filterTotalReal = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
  }

  filterTotalModelReal = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
  }

  filterTotalMoldeReal = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
    },0)

    return reduce
  }

  reduceNG = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceNGModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceNGMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceNGforWeekGraph = (date, array) =>{
    const reduce = this.filterDateforWeekGraph(date, array).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  filterTotalNG = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  filterTotalModelNG = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  filterTotalMoldeNG = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  reduceOK = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  reduceOKModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  reduceOKMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  reduceOKforWeekGraph = (date, array) =>{
    const reduce = this.filterDateforWeekGraph(date, array).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  filterTotalOK = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterTotalModelOK = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterTotalMoldeOK = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterDayTotalOK = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterWeekTotalOK = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterDayTotalNG = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  filterWeekTotalNG = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  filterDayTotalReal = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.real || 0
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

  filterDayTotalPlan = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
  }

  filterWeekTotalPlan = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
  }

  filterDayTotalWTime = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return this.precise_round(reduce,2)
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

  filterDayTotalDTime = (day) =>{
    const array = [...this.state.production]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return this.precise_round(reduce,2)
  }

  filterWeekTotalDTime = ( ) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
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

  filterDayTotalPurge = (day) =>{
    const array = [...this.state.purge]
    const filter = array.filter( item => item.date === day)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
  }

  filterWeekTotalPurge = () =>{
    const array = [...this.state.purge]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
  }

  filterDayTotalOEE = (date) =>{
    const real = this.filterDayTotalPlan(date)
    const ok = this.filterDayTotalOK(date)
    const plan = this.filterDayTotalPlan(date)
    const wtime = this.filterDayTotalWTime(date)

    const dtime = this.filterDayTotalDTime(date)
    const time = parseInt(wtime + dtime) 
    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    
    return oee
  }

  filterWeekTotalOEE = ( ) =>{
    const real = this.filterWeekTotalReal()
    const ok = this.filterWeekTotalOK()
    const plan = this.filterWeekTotalPlan()
    const wtime = this.filterWeekTotalWTime()

    const dtime = this.filterWeekTotalDTime()
    const time = parseInt(wtime + dtime) 
    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    
    return oee
  }

  

  reduceTime = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  reduceTimeModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  reduceTimeMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  reduceDownTime = ( date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  reduceDownTimeModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  reduceDownTimeMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)
    return reduce
  }

  filterTotalTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  filterTotalModelTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  filterTotalMoldeTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.wtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  filterTotalDTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  filterTotalModelDTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  filterTotalMoldeDTime = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseFloat(b.dtime.$numberDecimal) || 0
    },0)

    return reduce
  }

  reducePlan = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
  }

  reducePlanModel = (date, id) =>{
    const reduce = this.filterModelDate(date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
  }

  reducePlanMolde = (date, id) =>{
    const reduce = this.filterMoldeDate(date, id).reduce( (a, b) =>{
      return a + b.plan || 0
    },0)
    return reduce
  }

  filterTotalPlan = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
  }

  filterTotalModelPlan = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
  }

  filterTotalMoldePlan = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.plan || 0
    },0)

    return reduce
  }

  reduceOEE = (date, id) =>{
    const real = this.reduceReal(date, id)
    const ng = this.reduceNG(date, id)
    const ok = this.reduceOK(date, id)
    const plan = this.reducePlan(date, id)
    const wtime = this.reduceTime(date, id)
    const dtime = this.reduceDownTime(date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
  }

  reduceModelOEE = (date, id) =>{
    const real = this.reduceRealModel(date, id)
    
    const ok = this.reduceOKModel(date, id)
    const plan = this.reducePlanModel(date, id)
    const wtime = this.reduceTimeModel(date, id)
    const dtime = this.reduceDownTimeModel(date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
    
    return oee
  }

  reduceMoldeOEE = (date, id) =>{
    const real = this.reduceRealMolde(date, id)
    
    const ok = this.reduceOKMolde(date, id)
    const plan = this.reducePlanMolde(date, id)
    const wtime = this.reduceTimeMolde(date, id)
    const dtime = this.reduceDownTimeMolde(date, id)
    const time = parseInt(wtime + dtime) 
    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
    
    return oee
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

  filterTotalOEE = (id) =>{
    const real = this.filterTotalReal(id)
    const ok = this.filterTotalOK(id)
    const plan = this.filterTotalPlan(id)
    const wtime = this.filterTotalTime(id)
    const dtime = this.filterTotalDTime(id)
    const time = parseInt(wtime + dtime)

    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
  }


  filterTotalOEEModel = (model) =>{
    const real = this.filterTotalModelReal(model)
    const ok = this.filterTotalModelOK(model)
    const plan = this.filterTotalModelPlan(model)
    const wtime = this.filterTotalModelTime(model)
    const dtime = this.filterTotalModelDTime(model)
    const time = parseInt(wtime + dtime)

    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
  }

  filterTotalOEEMolde = (model) =>{
    const real = this.filterTotalMoldeReal(model)
    const ok = this.filterTotalMoldeOK(model)
    const plan = this.filterTotalMoldePlan(model)
    const wtime = this.filterTotalMoldeTime(model)
    const dtime = this.filterTotalMoldeDTime(model)
    const time = parseInt(wtime + dtime)

    
    const availability = this.precise_round(( wtime / time )*100, 2)
    const performance = this.precise_round(( real / plan )*100, 2)
    const quality = this.precise_round(( ok / real )*100, 2)
    const oee = this.precise_round( ((availability*performance*quality)/10000), 2 )
     
    return oee
  }

  filterMins = (date, id) => {
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
  }

  filterMinsByIssue = (date, id, issue) => {
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id).filter( item => item.issue === issue)
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

  reduceMinsByIssue = (date, id, issue) =>{
    const reduce = this.filterMinsByIssue(date, id, issue).reduce( (a, b) =>{
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

  filterResines = (date, id) => {
    const array = [...this.state.purge]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
  }

  reducePurge = (date, id) =>{
    const reduce = this.filterResines(date, id).reduce( (a, b) =>{
      return a + b.purge || 0
    },0)
    return reduce
  }

  filterTotalPurge = (id) =>{
    const array = [...this.state.purge]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)

    return reduce
  }

  precise_round(num, dec){
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  filterHighest = (day) =>{
    const array = [...this.state.downtime]
    const filter = array.filter( item => item.date === day ) 
      // const issues = [...new Set(filter)];
      const issues = [...filter]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue.issue)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueCode, mins: reduceMins }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.mins || 0
        },0)

        if(reduceMapping === 0){
          return '0'
        } else {
          const issue = mapping.sort((x, y)  => y.mins - x.mins)[0].issue
          const mins =  mapping.sort((x, y)  => y.mins - x.mins)[0].mins
          return `${issue} ${mins}`
        }
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

  filterHighestIndicator = () =>{
    const array = [...this.state.downtime]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      

      const issues = [...filter]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue.issue)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueCode, mins: reduceMins }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.mins || 0
        },0)

        if(reduceMapping === 0){
          return '0 mins'
        } else {
          const issue = mapping.sort((x, y)  => y.mins - x.mins)[0].issue
          const mins =  mapping.sort((x, y)  => y.mins - x.mins)[0].mins
          return `${issue} ${mins}`
        }
  }

  showReports = () =>{
    console.log(this.state, this.props)
  }

  changeTo = (e) =>{
    const production = this.state.production
    if( e.target.name === 'Machine'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, data})
    }
    else if(e.target.name === 'Molde'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Molde', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, data})
    }
    else if(e.target.name === 'Model'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Model', production)
      // this.setState({render: e.target.name, data, week: []})
      return this.setState({render: e.target.name, data})
    }
    else{ return }
  }

  changeShift = (e) =>{
    const shift = e.target.name
    if(shift === '12'){
      const production = [...this.props.production]
      const purge = [...this.props.purge]
      const downtime = [...this.props.downtime]
      const render = this.state.render
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, render, production )
      const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
      const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      return this.setState({production, downtime, purge, shift, week, data, data2, week2})
    } else{
      const production = [...this.props.production].filter(item => item.shift === shift)
      const purge = [...this.props.purge].filter(item => item.shift === shift)
      const downtime = [...this.props.downtime].filter(item => item.shift === shift)
      
      const render = this.state.render
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, render, production )
      const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
      const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      return this.setState({production, downtime, purge, shift, week, data, data2, week2})
    }
  }

  shiftActive = (name) =>{
    return name === this.state.shift ? 'shiftActive' : null 
  }

  filterActive = (name) =>{
    return name === this.state.render ? 'shiftActive' : null 
  }

  detailActive = (name) =>{
    return name === this.state.render ? 'downarrow_button_selected' : 'downarrow_button'
  }

  detailDowntime = (e) =>{
    const render = e.target.name
    const downtime = this.state.downtime
    const data2 = this.setGraphicFirst(this.state.monday, this.state.sunday, downtime)
    const week2 = this.setGraphicFirstMachine(this.state.monday, this.state.sunday, downtime)
    return this.setState({render, data2, week2})
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
            <th className='efficiency_header_week' colSpan='2' rowSpan='1'>Total</th>
            {/* <th className='efficiency_header_highest'>Highest (mins)</th>
            <th className='efficiency_header_item'>Indicator Item</th> */}
          </tr>
        </thead>
      </table>
    )
  }

  renderHeader(){
    return (
      <div className='downtime_header'>
        <h2 className='production_title_header'>Injection Production</h2>
        <div className='downtime_controlls'>
          <table className='controls_table'>
            <tbody>
              <tr>
                <td>Shifts:</td>
                <td><button name='12' className={this.shiftActive('12')} onClick={this.changeShift}>Shift 1&2</button><button name='1' className={this.shiftActive('1')} onClick={this.changeShift}>Shift 1</button><button name='2' className={this.shiftActive('2')} onClick={this.changeShift}>Shift 2</button></td>
                <td>Change Week:</td>
                <td><button onClick={this.goBack}>Go Back</button><button onClick={this.goForward}>Go Forward</button></td>
                <td>Filter By:</td>
                <td><button name='Machine' className={this.filterActive('Machine')} onClick={this.changeTo}>Machine</button><button name='Model' className={this.filterActive('Model')} onClick={this.changeTo}>Model</button><button name='Molde' className={this.filterActive('Molde')} onClick={this.changeTo}>Molde</button></td>
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
            <td className='efficiency_body_day'>{this.reduceReal(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceReal(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalReal(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNG(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalNG(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOK(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalOK(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlan(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalPlan(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTime(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalTime(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTime(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalDTime(machine._id)}</td>
          </tr>
          {this.renderDowntimeDetail(machine._id)}
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOEE(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalOEE(machine._id)} </td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Purge (g)</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reducePurge(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalPurge(machine._id)}</td>
          </tr>
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
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelReal(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelNG(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelOK(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelPlan(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelTime(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeModel(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalModelDTime(model._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.monday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.tuesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.wednesday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.thursday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.friday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.saturday, model._id)}</td>
            <td className='efficiency_body_day'>{this.reduceModelOEE(this.state.sunday, model._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalOEEModel(model._id)}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderDowntimeDetail = (id) =>{
    if(this.state.render === 'Downtime'){
      const array = this.filterArrayDowntime(id)
      return array.map( issue =>
        <tr key={issue.issue}>
          <td className='efficiency_body_machine'>{issue.issueCode} (mins)</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.monday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.tuesday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.wednesday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.thursday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.friday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.saturday, id, issue.issue)}</td>
          <td className='efficiency_body_day'>{this.reduceMinsByIssue(this.state.sunday, id, issue.issue)}</td>
          <td className='efficiency_body_week'>{issue.mins}</td>
        </tr>
      )  
    } else {
      return null
    }
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
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceRealMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldeReal(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>NG (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceNGMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldeNG(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OK (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceOKMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldeOK(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Plan (pcs)</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reducePlanMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldePlan(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Worktime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceTimeMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldeTime(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Downtime (hrs)</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceDownTimeMolde(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMoldeDTime(molde._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>OEE (%)</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.monday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.tuesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.wednesday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.thursday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.friday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.saturday, molde._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMoldeOEE(this.state.sunday, molde._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalOEEMolde(molde._id)}</td>
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
    return ( 
      <table className='efficiency_tableTotal'>
        <tbody>
          <tr>
            <td className='efficiency_total_machine'>Total Real (pcs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalReal(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalReal()}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total NG (pcs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalNG(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalNG()}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total OK (pcs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOK(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalOK()}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Plan (pcs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPlan(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalPlan()}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalWTime(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalWTime()}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'><button name='Downtime' onClick={this.detailDowntime} className={this.detailActive('Downtime')}>▼</button> Total Downtime (hrs)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalDTime(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalDTime()}</td>
          </tr>
          {this.renderIndicator()}
          <tr>
            <td className='efficiency_total_machine'>Total OEE (%)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalOEE(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalOEE()} </td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Purge (g)</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.monday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.tuesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.wednesday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.thursday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.friday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.saturday)}</td>
            <td className='efficiency_total_day'>{this.filterDayTotalPurge(this.state.sunday)}</td>
            <td className='efficiency_total_week'>{this.filterWeekTotalPurge()}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderIndicator = () =>{
    if(this.state.render === 'Downtime'){
      return (
        <tr>
          <td className='efficiency_total_machine'>Indicator (mins)</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.monday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.tuesday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.wednesday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.thursday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.friday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.saturday)}</td>
          <td className='efficiency_total_day'>{this.filterHighest(this.state.sunday)}</td>
          <td className='efficiency_total_week'>{this.filterHighestIndicator()}</td>
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