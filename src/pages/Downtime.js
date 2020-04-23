import React from 'react';
import { Link } from 'react-router-dom';

import DowntimeBar from './charts/DowntimeBar.js'



class Downtime extends React.Component {

  state = {
    today:'',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    data: []
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

    const data = this.setGraphicFirst(state.monday, state.sunday)
    
    return this.setState({...state, data})

  }

  

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
       
   
    const data = this.setGraphicFirst(state.monday, state.sunday)
    return this.setState({...state, data})
    
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
       

    
    const data = this.setGraphicFirst(state.monday, state.sunday)
    return this.setState({...state, data})
    
  }

  filterDowntime = (date, id) => {
    const array = [...this.state.data]
    const filter = array.filter( item => item.date === date).filter( item => item.machine === id)

    return filter
  }

  reduceMins = (date, id) =>{
    const reduce = this.filterDowntime(date, id).reduce( (a, b) =>{
      return a + b.mins || 0
    },0)
    return reduce
  }

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

renderDowntimeWeekGraphic = () =>{
  if(this.state.data.length === 0){
    return 
  }
  else { 
    return (
      <div className='Graphic'>  
        {/* <WeekChart data={this.state.data}></WeekChart> */}
      </div>
    )
  }
}

setGraphicFirst = (mon, sun) =>{ 
  
    const data = this.props.issues.map(issue =>{  
      const mins = this.FilterDataForGraph(issue._id, mon, sun)
      return {issue: issue.issueName, mins: mins}
    })
    return data
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

  filterMins = (date, id) => {
    const array = [...this.props.reports]
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
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.date >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.mins || 0
    },0)

    return reduce
  }

  showReports = () =>{
    console.log(this.state, this.props)
  }

  renderHeaderTable(){
    return (
      <table className='downtime_tablehader'>
        <thead>
          <tr>
            <th className='downtime_header_machine'>Machine</th>
            <th className='downtime_header_day'><div>Mon</div><div>{this.state.monday}</div></th>
            <th className='downtime_header_day'><div>Tue</div><div>{this.state.tuesday}</div></th>
            <th className='downtime_header_day'><div>Wed</div><div>{this.state.wednesday}</div></th>
            <th className='downtime_header_day'><div>Thu</div><div>{this.state.thursday}</div></th>
            <th className='downtime_header_day'><div>Fri</div><div>{this.state.friday}</div></th>
            <th className='downtime_header_day'><div>Sat</div><div>{this.state.saturday}</div></th>
            <th className='downtime_header_day'><div>Sun</div><div>{this.state.sunday}</div></th>
            <th className='downtime_header_week'>Week mins</th>
            <th className='downtime_header_highest'>Highest</th>
            <th className='downtime_header_item'>Item</th>
          </tr>
        </thead>
      </table>
    )
  }

  renderHeader(){
    return (
      <div className='downtime_header'>
        <h2>Injection Downtime</h2>
        <div className='downtime_controlls'>
          <table>
            <tbody>
              <tr>
                <td>Filter By:</td>
                <td><button onClick={this.showReports}>Filter 1</button><button>Filter 2</button><button>Filter 3</button></td>
              </tr>
              <tr>
                <td>Change Week:</td>
                <td><button onClick={this.goBack}>Go Back</button><button onClick={this.goForward}>Go Forward</button></td>
              </tr>
              <tr>
                <td>Go to Date:</td>
                <td><input type='date'></input></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderBodyRow = () =>{
    return this.props.machines.map( machine =>
      <tr key={machine._id}>
        <td className='downtime_body_machine'>{machine.machineNumber}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.monday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.tuesday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.wednesday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.thursday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.friday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.saturday, machine._id)}</td>
        <td className='downtime_body_day'>{this.reduceMins(this.state.sunday, machine._id)}</td>
        <td className='downtime_body_week'>{this.filterTotalMins(machine._id)}</td>
        <td className='downtime_body_highest'>{this.reduceMins(machine._id)}</td>
        <td className='downtime_body_item'>{this.reduceMins(machine._id)}</td>
        

        {/* <td className='downtime_body_graphic'>{this.setDataForGraph(machine._id)}</td> */}
      </tr>
    )
  }

  render(){
    return (
      <div className="Downtime">
          {this.renderHeader()}
          <div className='downtime_graphs'>
        <div className='downtime_container'>
          {this.renderHeaderTable()}
          <div className='downtime_table_body'>
            <table className='downtime_body_table'>
              <tbody>
                {this.renderBodyRow()}
              </tbody>
            </table>
          </div>
        </div>
        <div className='graphics_container'>
            graphics
        </div>
        </div>
      </div>
    )
  }
}

export default Downtime;