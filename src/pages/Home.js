import React from 'react';
import BarChart from './charts/BarCharts'


class Graphic extends React.Component {
  state = {
    data: [],
    data2: [
      {
        "date": "04/06/2020",
        "day": "Monday",
        "high": 1200,
        "avg": 44,
        "low": 0,
        "ng": 250
      },
      {
        "date": "04/07/2020",
        "day": "Tuesday",
        "high": 4500,
        "avg": 38,
        "low": 0,
        "ng": 300
      },
      {
        "date": "04/08/2020",
        "day": "Wednesday",
        "high": 300,
        "avg": 41,
        "low": 0,
        "ng": 250
      },
      {
        "date": "04/09/2020",
        "day": "Thrusday",
        "high": 2500,
        "avg": 44,
        "low": 0,
        "ng": 250
      },
      {
        "date": "04/10/2020",
        "day": "Friday",
        "high": 3000,
        "avg": 44,
        "low": 0,
        "ng": 250
      },
      {
        "date": "04/11/2020",
        "day": "Saturday",
        "high": 3000,
        "avg": 44,
        "low": 0,
        "ng": 250
      },
      {
        "date": "04/12/2020",
        "day": "Sunday",
        "high": 250,
        "avg": 30,
        "low": 0,
        "ng": 250
      }]
  }

  componentDidMount(){
    const data = this.state.data2.map(item => {
      const date = new Date(item.date)
      const data = {
        date: date,
        high: item.high,
        avg: item.avg,
        low: item.low,
        ng: item.ng 
      }
      return data
    })
    console.log(data)
    return this.setState({data})
  }

  renderChart = () =>{
    if(this.state.data.length === 0){ return <div>wait</div>}
    else {
      return <BarChart data={this.state.data}></BarChart>
    }
  }

  render(){
    return (
      <div className="Home">
        <div className='Hola'>Hola</div>
        <div className='gra'>
      {this.renderChart()}
      </div>
      </div>
    )
  }
}

export default Graphic;