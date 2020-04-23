import React from 'react';
import { Link } from 'react-router-dom';



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

    
    
    return this.setState({...state})

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
       
   
    const week = []
    return this.setState({...state, week})
    
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
       

    
    const week = []
    return this.setState({...state, week})
    
  }

  filterTotalProduction = (id) =>{
    const array = [...this.props.reports]
    const filter = array.filter( 
      item => item.reportDate >= this.state.monday 
      && item.date <= this.state.sunday)
      .filter( item => item.machine._id === id)
    const reduce = filter.reduce( (a, b) =>{
      return a + b.ok || 0
    },0)

    return reduce
  }

  showReports = () =>{
    console.log(this.props.reports)
  }

  renderHeaderTable(){
    return (
      <table>
        <thead>
          <tr>
            <th>Machine</th>
            <th>Week DT</th>
            <th>Graphic</th>
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
                <td><button>Go Back</button><button>Go Forward</button></td>
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

  renderList() {
    return this.props.issues.map( issue => 
    <tr key={issue._id}>
      <td className="table_data issueName">{ issue.issueName}</td>
      <td className="table_data issue_update"><Link to={`/issues/update/${issue._id}`}><button className='button_issue'>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Downtime">
          {this.renderHeader()}
        downtime graphic... highest indicator
        <div className='downtime_container'>
          {this.renderHeaderTable()}
        </div>
      </div>
    )
  }
}

export default Downtime;