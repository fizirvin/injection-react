import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import './Defect.css'

class Defects extends Component {
  state ={
    defects: this.props.defects,
    header: [
      {h: 'Code', w: '10%'},
      {h: 'Defect', w: '70%'},
      {h: 'Inj Area', w: '10%'},
      {h: <Link to="/defects/add"><button>Add Defect</button></Link>, w: '10%'}
    ]
  }

  renderList() {
    return this.state.defects.map( ({_id, defectCode, defectName, isInjection}) => 
      <tr key={_id}>
        <TableData className='table_data' style={{width: '10%'}}>{ defectCode}</TableData>
        <TableData className='table_data' style={{width: '70%'}}>{ defectName}</TableData>
        <TableData className='table_data' style={{width: '10%'}}>{ isInjection ? 'Yes' : 'No'}</TableData>
        <TableData className='table_data' style={{width: '10%'}}><Link to={`/defects/update/${_id}`}><button className='button_issue'>Update</button></Link></TableData>
      </tr>
    )
  }
  
  renderBodyContainer(array){
    if( array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='defects_body_container'>
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
      <div className='defects_container'>
        <div className='defects_table_container'>
          <TableHeader header={this.state.header} className={'defects_header_table'}/>
          {this.renderBodyContainer(this.state.defects)}
        </div>
      </div>
    )
  }
}

export default Defects;