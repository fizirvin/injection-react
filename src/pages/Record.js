import React, { Component } from 'react';
import DayTotalChart from './charts/DayTotalChart'
import Spinner from './components/Spinner'
import { url, opts } from '../actions/config'
import { daytotalQuery } from '../actions/queries'
import './styles/record.css'

class Record extends Component {
  state ={
    loading: false
  }

  getData = async (e) =>{
    
    e.preventDefault();
    opts.body = JSON.stringify(daytotalQuery)
    this.setState({loading: true})
    const res = await fetch(url, opts);
    const data = await res.json();
    
    return this.setState({data: data.data.daytotalrecord, loading: false})
  }

  renderSpinner = () =>{
    if(this.state.loading === true){
      return <div className='spinner_div'><Spinner></Spinner></div>
    }
    else{
      return <DayTotalChart data={this.state.data}></DayTotalChart>
    }
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='record_table_container'>
          
          <div className='record_controls'>
            <form onSubmit={this.getData}>
            <label>Bar Value: </label> 
            <select name="shift" defaultValue="" required>
              <option disabled value="">select</option>
              <option value='day'>day</option>
            </select>
            <label>Chart: </label> 
            <select name="shift" defaultValue="" required>
              <option disabled value="">select</option>
              <option value='day'>Production</option>
            </select>
            <button type='submit'>Get Data</button>
            </form>
          </div>
          {this.renderSpinner()}
        </div>
      </div>
    )
  }
}

export default Record;