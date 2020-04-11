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
    sunday: ''
  }

  async componentDidMount(){
    const date = new Date();
    const today = this.formatDate(date)+'T00:00:00.000-06:00'

    const state = {
    today: today,  
    monday: this.getFirstDateofTable(1),
    tuesday: this.getFirstDateofTable(2),
    wednesday: this.getFirstDateofTable(3),
    thursday: this.getFirstDateofTable(4),
    friday: this.getFirstDateofTable(5),
    saturday: this.getFirstDateofTable(6),
    sunday: this.getFirstDateofTable(7),
    }
   
    return this.setState({...state})
  }

  Change = async () =>{
    const date = new Date(this.state.today)
   
    const pastWeek = date.getDate()-7;
    date.setDate(pastWeek);
    const changeToday= this.formatDate(date)+'T00:00:00.000-06:00'
    const monday = this.getDateofTable(1)


    const state = {
      today: changeToday,  
      monday: monday,
      tuesday: this.getDateofTable(2),
      wednesday: this.getDateofTable(3),
      thursday: this.getDateofTable(4),
      friday: this.getDateofTable(5),
      saturday: this.getDateofTable(6),
      sunday: this.getDateofTable(7),
    }
     
    return this.setState({...state})
    
  }

  showState = () => {
    console.log(this.state)
    
  }

  filterProduction = (date, id) => {
    const array = [...this.props.reportsDate]
    const filter = array.filter( item => item.date === date).filter( item => item.part === id)

    return filter
  }

  reduceOk = (date, id) =>{
    const reduce = this.filterProduction(date, id).reduce( (a, b) =>{
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

  filterTotalProduction = (id) =>{
    const array = [...this.props.reportsDate]
    const filter = array.filter( item => item.part === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  

  renderList() {
    return this.props.models.map( model => 
      <tr key={model._id}>
        <td className='production_list_row' colSpan='3'>{model.partNumber}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.monday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceNG(this.state.monday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.tuesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.wednesday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.thursday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.friday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.saturday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.reduceOk(this.state.sunday, model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'>{this.filterTotalProduction(model._id)}</td>
        <td className='production_normal_row' colSpan='1'></td>
        <td className='production_normal_row' colSpan='1'><button>graph</button></td>
      </tr>
    )
  }

  renderProductionHeader() {
    return <div className='production_nav'>
      <h2>Injection Production</h2>
      <button>Model</button>
      <button>Machine</button>
      <button onClick={this.showState}>state</button>
      <button onClick={this.Change}>change</button>
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

  getFirstDateofTable = (number)=>{
    
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const dayOfMonth = today.getDate();
    const difference = dayOfMonth - dayOfWeek;
    const day = difference + number;
    const date= today.setDate(day)
    return this.formatDate(date)
  }

  getDateofTable = (number)=>{
    
    const today = new Date(this.state.today);
    const dayOfWeek = today.getDay(); 
    const dayOfMonth = today.getDate();
    const difference = dayOfMonth - dayOfWeek;
    const day = difference + number;
    const date= today.setDate(day)
    return this.formatDate(date)
  }

  renderContent = () => {
    if(!this.state.today) { 
      return null
    } else {
      return (
        <div className="Production">
          {this.renderProductionHeader()}
          <table className="production_table_list">
            <thead>
              <tr>
                <th className="production_list_header production_model_table" colSpan='3'>Model</th>
                <th className="production_list_header production_model" colSpan='2'>
                  <div>Mon</div><div>{this.state.monday}</div><div>OK   NG</div>
                </th>
                <th className="production_list_header production_model" colSpan='2'><div>Tue</div><div>{this.state.tuesday}</div></th>
                <th className="production_list_header production_model" colSpan='2'><div>Wed</div><div>{this.state.wednesday}</div></th>
                <th className="production_list_header production_model" colSpan='2'><div>Thu</div><div>{this.state.thursday}</div></th>
                <th className="production_list_header production_model" colSpan='2'><div>Fri</div><div>{this.state.friday}</div></th>
                <th className="production_list_header production_model" colSpan='2'><div>Sat</div><div>{this.state.saturday}</div></th>
                <th className="production_list_header production_model" colSpan='2'><div>Sun  </div><div>{this.state.sunday}</div></th>
                <th className="production_list_header production_model_total" colSpan='2'>Total</th>
                <th className="production_list_header production_model_detail" colSpan='1'>Graph</th>
              </tr>
            </thead> 
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  

  render(){
    return this.renderContent()
  }
}

export default Production;