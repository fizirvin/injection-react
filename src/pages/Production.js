import React from 'react';
import { Link } from 'react-router-dom';

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
    render: 'Model'
  }

  async componentDidMount(){
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
    sunday: this.getDateofTable(7, today),
    }
   
    return this.setState({...state})
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


  Change = async () =>{
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
       
    return this.setState({...state})
    
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
        <td className='production_normal_row' colSpan='1'><button>graph</button></td>
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
        <td className='production_normal_row' colSpan='1'><button>graph</button></td>
      </tr>
    )
  }

  renderList = (list) =>{
    if(list == 'Model'){ return this.renderModelList()} 
    else if(list == 'Machine'){return this.renderMachineList()} 
    else if(list == 'Molde'){return this.renderMoldeList()}
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
        <td className='production_normal_row' colSpan='1'><button>graph</button></td>
      </tr>
    )
  }

  goToDate = (e) =>{
    const date1 = e.target.value + 'T01:00:00.000-06:00'
    console.log('gotodate', e.target.value)
    // if(date >= this.state.monday && date <= this.state.sunday){ console.log('misma semana')}else{console.log('otra semana')}
    // item => item.date >= this.state.monday 
    // && item.date <= this.state.sunday

    
    const date = new Date(date1);
   console.log(date)
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
       
    return this.setState({...state})



  }

  changeTo = (e) =>{
    this.setState({render: e.target.name})
  }

  renderProductionHeader() {
    return <div className='production_nav'>
      <h2>Injection Production</h2>
      <button name='Model' onClick={this.changeTo}>Model</button>
      <button name='Machine' onClick={this.changeTo}>Machine</button>
      <button name='Molde' onClick={this.changeTo}>Molde</button>
      <button onClick={this.showState}>state</button>
      <label>Change Week:</label>
      <button onClick={this.Change}>Go Back</button>
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
          <div className='report_chart'>
            Aui
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