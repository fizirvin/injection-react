import React from 'react';

import DowntimeBar from './charts/DowntimeBar.js'
import DowntimeWeekChart from './charts/DowntimeWeekChart.js'
import DownTimeWeekByMachine from './charts/DowntimeWeekByMachine.js'

import WeekChart from './charts/WeekChart'
import BarChart from './charts/BarCharts'

class Efficiency extends React.Component {
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
    reports: [...this.props.reports],
    shift: '12',
    render: 'Machine'
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

    const production = this.props.production
    const data = this.setGraphicFilter(state.monday, state.sunday, 'Machine', production )
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    // const week = this.setGraphicFirstMachine(state.monday, state.sunday)
    return this.setState({...state, week, data})
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
     
    const production = this.state.production
    const data = this.setGraphicFilter(state.monday, state.sunday, 'Machine', production )
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data})
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
    
    const production = this.state.production
    // const data = this.setGraphicFirst(state.monday, state.sunday)
    const data = this.setGraphicFilter(state.monday, state.sunday, 'Machine', production )
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data})
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
    const production = this.state.production
    const data = this.setGraphicFilter(state.monday, state.sunday, 'Machine', production )
    const week = this.GraphAllWeekFirst(state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday, state.sunday, production)
    return this.setState({...state, week, data})
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
  if(this.state.week.length === 0){
    return 
  }
  else { 
    
    return (<div className='Graphic'>
          
    <BarChart data={this.state.week}></BarChart>
    </div>)
  }
}

renderModelGraphic = () =>{
  if(this.state.data.length === 0){
    return 
  }
  else { 
    return (
      <div className='Graphic'>  
        <WeekChart data={this.state.data}></WeekChart>
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
  FilterDataForGraphByMachine = (id, mon, sun) =>{
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.machine === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.mins || 0
      },0)

    return reduce
  }

  setGraphicFirstMachine = (mon, sun) =>{ 
    const data = this.props.machines.map(machine =>{  
      const mins = this.FilterDataForGraphByMachine(machine._id, mon, sun)
      return {machine: machine.machineNumber, mins: mins}
    })
    return data.sort((x, y)  => y.mins - x.mins)
  }

  FilterDataForGraph = (id, mon, sun) =>{
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun).filter( item => item.issue === id)
      const reduce = filter.reduce( (a, b) =>{
        return a + b.mins || 0
      },0)

    return reduce
  }

  setGraphicFirst = (mon, sun) =>{ 
    const data = this.props.issues.map(issue =>{  
      const mins = this.FilterDataForGraph(issue._id, mon, sun)
      return {issue: issue.issueName, mins: mins}
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
        return {part: model.partNumber, ok: ok, ng: ng}
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

  reduceReal = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
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

  reduceNG = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
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

  reduceOK = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
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

  reduceTime = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + parseFloat(b.time.$numberDecimal) || 0
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
      return a + parseFloat(b.time.$numberDecimal) || 0
    },0)

    return reduce
  }

  reduceCapacity = (date, id) =>{
    const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
      return a + parseInt( b.capacity * parseFloat(b.time.$numberDecimal)) || 0
    },0)
    return reduce
  }

  filterTotalCapacity = (id) =>{
    const array = [...this.state.production]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + parseInt( b.capacity * parseFloat(b.time.$numberDecimal)) || 0
    },0)

    return reduce
  }

  // reduceEfficiency = (date, id) =>{
  //   const length = this.filterMachineDate(date, id).length
  //   const reduce = this.filterMachineDate(date, id).reduce( (a, b) =>{
  //     return a + parseFloat(b.oee.$numberDecimal) || 0
  //   },0)
  //   return reduce/length || 0
  // }

  reduceEfficiency = (date, id) =>{
    const capacity = this.reduceCapacity(date, id)
    const ok = this.reduceOK(date, id)
    const value = parseFloat(ok/capacity)*100
    return this.precise_round(value, 1) || 0
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

  filterTotalEfficiency = (id) =>{
    const ok = this.filterTotalOK(id)
    const capacity = this.filterTotalCapacity(id)
    const value = parseFloat(ok/capacity)*100
    return this.precise_round(value, 1) || 0
  }

  filterMins = (date, id) => {
    const array = [...this.state.reports]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)
    return filter
  }

  reduceMins = (date, id) =>{
    const reduce = this.filterMins(date, id).reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    return reduce
  }

  filterTotalMins = (id) =>{
    const array = [...this.state.reports]
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

  filterHighest = (id) =>{
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)

      const issues = [...this.props.issues]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue._id)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueName, mins: reduceMins }
        })
   
    return mapping.sort((x, y)  => y.mins - x.mins)[0].mins
  }

  filterHighestIndicator = (id) =>{
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)

      const issues = [...this.props.issues]
      const mapping = issues.map( issue =>
        {
          const reduceMins = filter.filter( item => item.issue === issue._id)
          .reduce( (a, b) =>{
            return a + b.mins || 0
          },0)
          return {issue: issue.issueName, mins: reduceMins }
        })

        const reduceMapping = mapping.reduce( (a, b) =>{
          return a + b.mins || 0
        },0)

        if(reduceMapping === 0){
          return 'no downtime'
        } else {
          return mapping.sort((x, y)  => y.mins - x.mins)[0].issue
        }
  }

  showReports = () =>{
    console.log(this.state, this.props)
  }

  changeTo = (e) =>{
    if( e.target.name === 'Machine'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine')
      this.setState({render: e.target.name, data, week: []})
    }
    else if(e.target.name === 'Molde'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Molde')
      this.setState({render: e.target.name, data, week: []})
    }
    else if(e.target.name === 'Model'){
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Model')
      this.setState({render: e.target.name, data, week: []})
    }
    else{ return }
  }

  changeShift = (e) =>{
    const shift = e.target.name
    if(shift === '12'){
      const production = [...this.props.production]
      const purge = [...this.props.purge]
      const reports = [...this.props.reports]
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine', production )
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      return this.setState({production, reports, purge, shift, week, data})
    } else{
      const production = [...this.props.production].filter(item => item.shift === shift)
      const purge = [...this.props.purge].filter(item => item.shift === shift)
      const reports = [...this.props.reports].filter(item => item.shift === shift)
      const data = this.setGraphicFilter(this.state.monday, this.state.sunday, 'Machine', production )
      const week = this.GraphAllWeekFirst(this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday, production)
      return this.setState({production, reports, purge, shift, week, data})
    }
  }

  shiftActive = (name) =>{
    return name === this.state.shift ? 'shiftActive' : null 
  }

  renderHeaderTable(){
    return (
      <table className='efficiency_tablehader'>
        <thead>
          <tr>
            <th className='efficiency_header_machine' colSpan='3' rowSpan='2'>Production By Machine</th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Mon</div><div>{this.state.monday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Tue</div><div>{this.state.tuesday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Wed</div><div>{this.state.wednesday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Thu</div><div>{this.state.thursday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Fri</div><div>{this.state.friday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Sat</div><div>{this.state.saturday}</div></th>
            <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>Sun</div><div>{this.state.sunday}</div></th>
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
        <h2>Injection Production</h2>
        <div className='downtime_controlls'>
          <table>
            <tbody>
              <tr>
                <td>Filter By:</td>
                <td><button onClick={this.showReports}>Machine</button><button>Model</button><button>Molde</button></td>
                <td>Shifts:</td><td><button name='12' className={this.shiftActive('12')} onClick={this.changeShift}>Shift 1&2</button><button name='1' className={this.shiftActive('1')} onClick={this.changeShift}>Shift 1</button><button name='2' className={this.shiftActive('2')} onClick={this.changeShift}>Shift 2</button></td>
              </tr>
              <tr>
                <td>Change Week:</td>
                <td><button onClick={this.goBack}>Go Back</button><button onClick={this.goForward}>Go Forward</button></td>
                <td>Go to Date:</td>
                <td><input type='date' onChange={this.goToDate}></input></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderBodyRow = () =>{
    if(!this.state.machines) return null
    return this.state.machines.map( machine =>
      <table key={machine._id} className='efficiency_body_table'>
        <tbody>
          <tr>
            <td className='efficiency_body_machine'>{machine.machineNumber} Real (pcs)</td>
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
            <td className='efficiency_body_machine'>Capacity (pcs)</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceCapacity(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalCapacity(machine._id)}</td>
          </tr>
          <tr>
            <td className='efficiency_body_machine'>Efficiency (%)</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceEfficiency(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalEfficiency(machine._id)}</td>
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
            <td className='efficiency_body_machine'>Downtime (mins)</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.monday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.tuesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.wednesday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.thursday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.friday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.saturday, machine._id)}</td>
            <td className='efficiency_body_day'>{this.reduceMins(this.state.sunday, machine._id)}</td>
            <td className='efficiency_body_week'>{this.filterTotalMins(machine._id)}</td>
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

  render(){
    return (
      <div className="Downtime">
          {/* {this.renderHeader()} */}
          <div className='downtime_graphs'>
        <div className='downtime_container'>
          {this.renderHeader()}
          {this.renderHeaderTable()}
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

export default Efficiency;