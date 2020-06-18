import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Machines.css'

class Machines extends Component {
  state ={
    machines: this.props.machines,
    header: [
      {h: 'Machine Number', w: '25%'},
      {h: 'Machine Serial', w: '30%'},
      {h: 'Closing Force (t)', w: '15%'},
      {h: 'Spindle D (mm)', w: '15%'},
      {h: <Link to="/machines/add"><button>Add Machine</button></Link>, w: '15%'}
    ]
  }

  renderList(){
  return this.state.machines.map( ({_id, machineNumber, machineSerial, closingForce, spindleDiameter}) => 
  <tr key={_id}>
    <TableData className='table_data' style={{width: '25%'}} >{machineNumber}</TableData>
    <TableData className='table_data' style={{width: '30%'}} >{machineSerial}</TableData>
    <TableData className='table_data' style={{width: '15%'}}>{closingForce}</TableData>
    <TableData className='table_data' style={{width: '15%'}}>{spindleDiameter}</TableData>
    <TableData className='table_data' style={{width: '15%'}}><Link to={`/machines/update/${_id}`}><button>Update</button></Link></TableData>
  </tr>)
  }

  renderBodyContainer(array){
    if(array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='machines_body_container'>
          <table className='body_table'>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='machines_table_container'>
          <TableHeader header={this.state.header} className={'machines_header_table'}/>
          {this.renderBodyContainer(this.state.machines)}
          <RenderItems items={this.state.machines}/>
        </div>
      </div>
    )
  }
}

export default Machines;