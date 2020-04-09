import React from 'react';
import { Link } from 'react-router-dom';

class Production extends React.Component {

  renderList() {
    return this.props.models.map( model => 
      <tr key={model._id}>
        <td className='production_list_row'>{model.partNumber}</td>
        <td className='production_normal_row'>{this.dayOfYear()}</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
        <td className='production_normal_row'>0</td>
      </tr>
    )
  }

  renderProductionHeader() {
    return <div className='production_nav'>
      <h2>Injection Production</h2>
      <button>Model</button>
      <button>Machine</button>
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

  today(){
    const date = new Date();
    return date
  }

  // var d = new Date();
  // d.setDate(15);

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate()
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

  

  getDateofTable = (number)=>{
    const today = new Date(); 
    const dayOfWeek = today.getDay(); 
    const dayOfMonth = today.getDate(); 
    const difference = dayOfMonth - dayOfWeek;
    const day = difference + number;
    const date= today.setDate(day)
    return this.formatDate(date)
  }

  

  render(){
    return (
      <div className="Production">
        {this.renderProductionHeader()}
        <table className="production_table_list">
          <thead>
            <tr>
              <th className="production_list_header production_model_table">Model</th>
              <th className="production_list_header production_model"><div>Mon</div><div>{this.getDateofTable(1)}</div></th>
              <th className="production_list_header production_model"><div>Tue</div><div>{this.getDateofTable(2)}</div></th>
              <th className="production_list_header production_model"><div>Wed</div><div>{this.getDateofTable(3)}</div></th>
              <th className="production_list_header production_model"><div>Thu</div><div>{this.getDateofTable(4)}</div></th>
              <th className="production_list_header production_model"><div>Fri</div><div>{this.getDateofTable(5)}</div></th>
              <th className="production_list_header production_model"><div>Sat</div><div>{this.getDateofTable(6)}</div></th>
              <th className="production_list_header production_model"><div>Sun  </div><div>{this.getDateofTable(7)}</div></th>
              <th className="production_list_header production_model_total">Total</th>
              <th className="production_list_header production_model_detail"></th>
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

export default Production;