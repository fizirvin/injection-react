import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'

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
    </tr>)
  }

  render(){
    return (
      <div className="Moldes" >
        <div className='moldes_container'>
          <div className='table_container'>
            <TableHeader header={this.state.header}/>
            <div className='moldes_body_container'>
              <table className='moldes_body_table'>
                <tbody>
                  {this.renderList()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Moldes;