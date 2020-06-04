import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import './Moldes.css'

class Moldes extends Component {
  state ={
    moldes: this.props.moldes,
    header: [
      {h: 'Mold Number', w: '45%'},
      {h: 'Serial Number', w: '25%'},
      {h: 'Cavities', w: '15%'},
      {h: <Link to="/molds/add"><button>Add Mold</button></Link>, w: '15%'}
    ]
  }

  renderList() {
    return this.state.moldes.map( ({_id, moldeNumber, moldeSerial, cavities}) =>
      <tr key={_id}>
        <TableData className='table_data' style={{width: '45%'}}>{moldeNumber}</TableData>
        <TableData className='table_data' style={{width: '25%'}}>{moldeSerial}</TableData>
        <TableData className='table_data' style={{width: '15%'}}>{cavities}</TableData>
        <TableData className='table_data' style={{width: '15%'}}><Link to={`/molds/update/${_id}`}><button>Update</button></Link></TableData>
      </tr>
    )
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='moldes_body_container'>
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
        <div className='moldes_table_container'>
          <TableHeader header={this.state.header} className={'moldes_header_table'}/>
          {this.renderBodyContainer(this.state.moldes)}
        </div>
      </div>
    )
  }
}

export default Moldes;