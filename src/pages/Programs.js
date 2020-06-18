import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Programs.css'

class Programs extends Component {
  state ={
    programs: this.props.programs,
    header: [
      {h: 'Machine #', w: '17%'},
      {h: 'Mold #', w: '24%'},
      {h: 'Part #', w: '24%'},
      {h: 'Cycle Time (s)', w: '8%'},
      {h: 'Capacity (pcs/hr)', w: '9%'},
      {h: 'Cycles (cyc/hr)', w: '9%'},
      {h: <Link to="/programs/add"><button>Add Program</button></Link>, w: '9%'}
    ]
  }

  renderList() {
    return this.state.programs.map( ({_id, machineNumber, moldeNumber, partNumber, cycleTime, capacity, cycles}) => 
    <tr key={_id}>
      <TableData className='table_data' style={{width: '17%'}}>{ machineNumber.machineNumber}</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ moldeNumber.moldeNumber}</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ partNumber.partName}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{ cycleTime.$numberDecimal }</TableData>
      <TableData className='table_data' style={{width: '9%'}}>{ capacity}</TableData>
      <TableData className='table_data' style={{width: '9%'}}>{ cycles}</TableData>
      <TableData className='table_data' style={{width: '9%'}}><Link to={`/programs/update/${_id}`}><button>Update</button></Link></TableData>
    </tr>)
  }


  renderBodyContainer(array){
    if( array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='programs_body_container'>
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
        <div className='programs_table_container'>
          <TableHeader header={this.state.header} className={'programs_header_table'}/>
          {this.renderBodyContainer(this.state.programs)}
          <RenderItems items={this.state.programs}/>
        </div>
      </div>
    )
  }
}

export default Programs;