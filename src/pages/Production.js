import React from 'react';
import BarChart from './charts/BarCharts'
import WeekChart from './charts/WeekChart'

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
    render: 'Model',
    graphic: '',
    type: '',
    week: [],
    data: [],
    general: ''
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

    const data = this.setGraphicFirst(state.monday, state.sunday, 'Model')
    
    return this.setState({...state, data})

  }

  setGraphicFirst = (mon, sun, filter) =>{ 
    if(filter === 'Model'){
      const data = this.props.models.map(model =>{  
        const ok = this.forGraphOK(model._id, mon, sun)
        const ng = this.forGraphNG(model._id, mon, sun)
        return {part: model.partNumber, ok: ok, ng: ng}
      })
      return data
    }
    else if(filter === 'Machine'){
      const data = this.props.machines.map(machine =>{  
        const ok = this.forGraphMachine(machine._id, mon, sun)
        const ng = this.forGraphMachineNG(machine._id, mon, sun)
        return {part: machine.machineNumber, ok: ok, ng: ng}
      })
      return data
    }
    else if( filter === 'Molde'){
      const data = this.props.moldes.map(molde =>{  
        const ok = this.forGraphMolde(molde._id, mon, sun)
        const ng = this.forGraphMoldeNG(molde._id, mon, sun)
        return {part: molde.moldeNumber, ok: ok, ng: ng}
      })
      return data
    }
    else { return }
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

  getDateofTable = (number, aDate)=>{
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - this.todayIs(today);
    const set = dayOfMonth + difference;
    const date= today.setDate(set);
    
    return this.formatDate(date)
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
       
    const data = this.setGraphicFirst(state.monday, state.sunday, this.state.render)
    const week = []
    return this.setState({...state, data, week})
    
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
       

    const data = this.setGraphicFirst(state.monday, state.sunday, this.state.render)
    const week = []
    return this.setState({...state, data, week})
    
  }

  showState = () => {
    console.log(this.props)
    
  }

  filterProduction = (date, id) => {
    const array = [...this.props.reportsDate]
    const filter = array.filter( item => item.date === date).filter( item => item.part === id)

    return filter
  }

  filterProductionByMachine = (date, id) => {
    const array = [...this.props.reportsDate]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)

    return filter
  }

  filterProductionByMolde = (date, id) => {
    const array = [...this.props.reportsDate]
    const filter = array.filter( item => item.date === date).filter( item => item.molde === id)

    return filter
  }

  reduceOk = (date, id) =>{
    const reduce = this.filterProduction(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  reduceMachineOk = (date, id) =>{
    const reduce = this.filterProductionByMachine(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  reduceMoldeOk = (date, id) =>{
    const reduce = this.filterProductionByMolde(date, id).reduce( (a, b) =>{
      return a + b.ok || 0
    },0)
    return reduce
  }

  

  reduceNG = (date, id) =>{
    const reduce = this.filterProduction(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceMachineNG = (date, id) =>{
    const reduce = this.filterProductionByMachine(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  reduceMoldeNG = (date, id) =>{
    const reduce = this.filterProductionByMolde(date, id).reduce( (a, b) =>{
      return a + b.ng || 0
    },0)
    return reduce
  }

  filterTotalProduction = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphOK = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon
      && item.date <= sun)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterTotalMachine = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphMachine = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterTotalMolde = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  forGraphMolde = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  filterTotalNG = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  forGraphNG = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon
      && item.date <= sun)
      .filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }


  filterTotalMachineNG = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  forGraphMachineNG = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  filterTotalMoldeNG = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  forGraphMoldeNG = (id, mon, sun) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( 
      item => item.date >= mon 
      && item.date <= sun )
      .filter( item => item.molde === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ng || 0
    },0)

    return reduce
  }

  renderMoldeList() {
    return this.props.moldes.map( molde => 
      <tr key={molde._id}>
        <td className='production_list_row' colSpan='3'>{molde.moldeNumber}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.monday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.monday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.tuesday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.tuesday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.wednesday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.wednesday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.thursday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.thursday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.friday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.friday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.saturday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.saturday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeOk(this.state.sunday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMoldeNG(this.state.sunday, molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalMolde(molde._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalMoldeNG(molde._id)}</td>
        <td className='production_normal_row' colSpan='1'><button name='molde' value={molde._id} onClick={this.displayGraph} >graph</button></td>
      </tr>
    )
  }
  
  renderMachineList() {
    return this.props.machines.map( machine => 
      <tr key={machine._id}>
        <td className='production_list_row' colSpan='3'>{machine.machineNumber}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.monday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.monday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.tuesday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.tuesday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.wednesday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.wednesday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.thursday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.thursday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.friday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.friday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.saturday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.saturday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineOk(this.state.sunday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceMachineNG(this.state.sunday, machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalMachine(machine._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalMachineNG(machine._id)}</td>
        <td className='production_normal_row' colSpan='1'><button name='machine' value={machine._id} onClick={this.displayGraph} >graph</button></td>
      </tr>
    )
  }

  renderList = (list) =>{
    if(list === 'Model'){ return this.renderModelList()} 
    else if(list === 'Machine'){return this.renderMachineList()} 
    else if(list === 'Molde'){return this.renderMoldeList()}
    else{
      return <div>select filter</div>
    }
  }


  renderModelList() {
    return this.props.models.map( model => 
      <tr key={model._id}>
        <td className='production_list_row' colSpan='3'>{model.partNumber}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.monday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.monday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.tuesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.tuesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.wednesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.wednesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.thursday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.thursday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.friday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.friday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.saturday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.saturday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.sunday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.sunday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalProduction(model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalNG(model._id)}</td>
        <td className='production_normal_row' colSpan='1'><button name='model' value={model._id} onClick={this.displayGraph} >graph</button></td>
      </tr>
    )
  }

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
       

    const data = this.setGraphicFirst(state.monday, state.sunday, this.state.render)
    return this.setState({...state, data, week: [] })



  }

  changeTo = (e) =>{
    if( e.target.name === 'Machine'){
      const data = this.setGraphicFirst(this.state.monday, this.state.sunday, 'Machine')
      this.setState({render: e.target.name, data, week: []})
    }
    else if(e.target.name === 'Molde'){
      const data = this.setGraphicFirst(this.state.monday, this.state.sunday, 'Molde')
      this.setState({render: e.target.name, data, week: []})
    }
    else if(e.target.name === 'Model'){
      const data = this.setGraphicFirst(this.state.monday, this.state.sunday, 'Model')
      this.setState({render: e.target.name, data, week: []})
    }
    else{ return }
  }

  renderProductionHeader() {
    return <div className='production_nav'>
      <h2>Injection Production</h2>
      <button name='Model' onClick={this.changeTo}>Model</button>
      <button name='Machine' onClick={this.changeTo}>Machine</button>
      <button name='Molde' onClick={this.changeTo}>Molde</button>
      {/* <button onClick={this.showState}>state</button> */}
      <label>Change Week:</label>
      <button onClick={this.goBack}>Go Back</button>
      <button onClick={this.goForward}>Go Forward</button>
      <label>Go to Date:</label>
      <input type='date' onChange={this.goToDate}></input>
      
    </div>
  }

  days_of_a_year(year) 
{
   
  return this.isLeapYear(year) ? 366 : 365;
}

isLeapYear(year) {
     return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

  dayOfYear(){
    const today = new Date();
    const first = new Date(today.getFullYear(), 0, 1);
    const theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
    return theDay
  }

  // today(){
  //   const date = new Date();
  //   return date
  // }

  // var d = new Date();
  // d.setDate(15);

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



  displayGraph = (e) =>{
    const id = e.target.value
    if(this.state.render === 'Model'){
      const total = this.filterTotalProduction(id)
      if( total === 0){ return } 
      else{ 
        const monday = this.reduceOk(this.state.monday, id);
        const monNG = this.reduceNG(this.state.monday, id);
        const tuesday = this.reduceOk(this.state.tuesday, id);
        const tueNG = this.reduceNG(this.state.tuesday, id);
        const wednesday = this.reduceOk(this.state.wednesday, id);
        const wedNG = this.reduceNG(this.state.wednesday, id);
        const thursday = this.reduceOk(this.state.thursday, id);
        const thuNG = this.reduceNG(this.state.thursday, id);
        const friday = this.reduceOk(this.state.friday, id);
        const friNG = this.reduceNG(this.state.friday, id);
        const saturday = this.reduceOk(this.state.saturday, id);
        const satNG = this.reduceNG(this.state.saturday, id);
        const sunday = this.reduceOk(this.state.sunday, id);
        const sunNG = this.reduceNG(this.state.sunday, id);
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
        this.setState({type: e.target.name, graphic: e.target.value, week})
      } 
    } 
    else if(this.state.render === 'Machine'){
      const total = this.filterTotalMachine(id)
      if(total === 0){ return }
      else{
        const monday = this.reduceMachineOk(this.state.monday, id);
        const monNG = this.reduceMachineNG(this.state.monday, id);
  
        const tuesday = this.reduceMachineOk(this.state.tuesday, id);
        const tueNG = this.reduceMachineNG(this.state.tuesday, id);
  
        const wednesday = this.reduceMachineOk(this.state.wednesday, id);
        const wedNG = this.reduceMachineNG(this.state.wednesday, id);
  
        const thursday = this.reduceMachineOk(this.state.thursday, id);
        const thuNG = this.reduceMachineNG(this.state.thursday, id);
  
        const friday = this.reduceMachineOk(this.state.friday, id);
        const friNG = this.reduceMachineNG(this.state.friday, id);
  
        const saturday = this.reduceMachineOk(this.state.saturday, id);
        const satNG = this.reduceMachineNG(this.state.saturday, id);
  
        const sunday = this.reduceMachineOk(this.state.sunday, id);
        const sunNG = this.reduceMachineNG(this.state.sunday, id);
  
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
        this.setState({type: e.target.name, graphic: e.target.value, week})
      }
    }
    else if(this.state.render === 'Molde'){
      const total = this.filterTotalMolde(id)

      if(total === 0){return }
      else{
        const monday = this.reduceMoldeOk(this.state.monday, id);
        const monNG = this.reduceMoldeNG(this.state.monday, id);
  
        const tuesday = this.reduceMoldeOk(this.state.tuesday, id);
        const tueNG = this.reduceMoldeNG(this.state.tuesday, id);
  
        const wednesday = this.reduceMoldeOk(this.state.wednesday, id);
        const wedNG = this.reduceMoldeNG(this.state.wednesday, id);
  
        const thursday = this.reduceMoldeOk(this.state.thursday, id);
        const thuNG = this.reduceMoldeNG(this.state.thursday, id);
  
        const friday = this.reduceMoldeOk(this.state.friday, id);
        const friNG = this.reduceMoldeNG(this.state.friday, id);
  
        const saturday = this.reduceMoldeOk(this.state.saturday, id);
        const satNG = this.reduceMoldeNG(this.state.saturday, id);
  
        const sunday = this.reduceMoldeOk(this.state.sunday, id);
        const sunNG = this.reduceMoldeNG(this.state.sunday, id);
  
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
        this.setState({type: e.target.name, graphic: e.target.value, week})
      }
    }else{ return }
  }
  

  renderContent = () => {
    if(!this.state.today) { 
      return null
    } else {
      return (
        <div className="Production">
          {this.renderProductionHeader()}
          <div className='production_container'>
          <table className="production_table_list">
            <thead>
              <tr>
                <th className="production_list_header production_model_table" colSpan='3' rowSpan='2'>{this.state.render}</th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Mon</div><div>{this.state.monday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Tue</div><div>{this.state.tuesday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Wed</div><div>{this.state.wednesday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Thu</div><div>{this.state.thursday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Fri</div><div>{this.state.friday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Sat</div><div>{this.state.saturday}</div></th>
                <th className="production_list_header production_model" colSpan='2' rowSpan='1'><div>Sun</div><div>{this.state.sunday}</div></th>
                <th className="production_list_header production_model_total" colSpan='2' rowSpan='1'>Total</th>
                <th className="production_list_header production_model_detail" colSpan='1' rowSpan='2'>Graph</th>
              </tr>
              
              
              <tr>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>OK</th>
              <th className="production_list_header production_model_ok" colSpan='1' rowSpan='1'>NG</th>
              </tr>
            </thead> 
            <tbody>
              {this.renderList(this.state.render)}
            </tbody>
          </table>
          <div className='graphics'>
          {this.renderModelGraphic()}
          {this.renderGraphic()}
          </div>
          </div>
        </div>
      )
    }
  }
  

  render(){
    return this.renderContent()
  }
}

export default Production;