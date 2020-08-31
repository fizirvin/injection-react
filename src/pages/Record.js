import React, { Component } from 'react';
import DayTotalChart from './charts/DayTotalChart'
import DayPurgeChart from './charts/DayPurgeChart'
import WeekTotalChart from './charts/WeekTotalChart'
import WeekPurgeChart from './charts/WeekPurgeChart'
import Spinner from '../components/Spinner'
import { url, opts } from '../config'
import { daytotalQuery } from '../actions/queries'
import { weektotalQuery } from '../actions/queries'
import { daypurgeQuery } from '../actions/queries'
import { weekpurgeQuery } from '../actions/queries'
import '../styles/record.css'

class Record extends Component {
  state ={
    loading: false
  }

  getData = async (e) =>{
    e.preventDefault();
    if(!this.state.bar){ return null }
    else if (this.state.bar === 'day' && this.state.chart === 'production'){
      opts.body = JSON.stringify(daytotalQuery)
      this.setState({loading: true})
      const res = await fetch(url, opts);
      const data = await res.json();
      return this.setState({data: data.data.daytotalrecord, loading: false, graph: 'day'})
    }
    else if (this.state.bar === 'day' && this.state.chart === 'purge'){
      opts.body = JSON.stringify(daypurgeQuery)
      this.setState({loading: true})
      const res = await fetch(url, opts);
      const data = await res.json();
      return this.setState({data: data.data.daytotalpurge, loading: false, graph: 'day-purge'})
    }
    else if (this.state.bar === 'week' && this.state.chart === 'production') {
      opts.body = JSON.stringify(weektotalQuery)
      this.setState({loading: true})
      const res = await fetch(url, opts);
      const data = await res.json();
      return this.setState({data: data.data.weektotalrecord, loading: false, graph: 'week'})
    }
    else if (this.state.bar === 'week' && this.state.chart === 'purge') {
      opts.body = JSON.stringify(weekpurgeQuery)
      this.setState({loading: true})
      const res = await fetch(url, opts);
      const data = await res.json();
      return this.setState({data: data.data.weektotalpurge, loading: false, graph: 'week-purge'})
    }
  }

  renderSpinner = () =>{
    if(this.state.loading === true){
      return <div className='spinner_div'><Spinner></Spinner></div>
    }
    else{
      if(this.state.data){
        if(this.state.graph === 'day'){ return <DayTotalChart data={this.state.data}></DayTotalChart> }
        if(this.state.graph === 'day-purge' ){ return <DayPurgeChart data={this.state.data}></DayPurgeChart> }
        else if ( this.state.graph === 'week'){ return <WeekTotalChart data={this.state.data}></WeekTotalChart> }
        else if ( this.state.graph === 'week-purge'){ return <WeekPurgeChart data={this.state.data}></WeekPurgeChart> }
      } else{
        return null
      }
    }
  }

  onchangeBar = (e) =>{
    return this.setState({[e.target.name]: e.target.value})
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='record_table_container'>
          
          <div className='record_controls'>
            <form onSubmit={this.getData}>
            <label>Bar value: </label> 
            <select name="bar" defaultValue="" onChange={this.onchangeBar} required>
              <option disabled value="">select</option>
              <option value='day'>day</option>
              <option value='week'>week</option>
            </select>
            <label>Chart: </label> 
            <select name="chart" defaultValue="" onChange={this.onchangeBar} required>
              <option disabled value="">select</option>
              <option value='production'>Production</option>
              <option value='purge'>Purge</option>
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