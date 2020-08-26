import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Models.css'

class Models extends Component {
  state ={
    models: this.props.models,
    header: [
      {h: 'Part Number', w: '30%'},
      {h: 'Part Name', w: '35%'},
      {h: 'Family', w: '20%'},
      {h: <Link to="/models/add"><button>Add Model</button></Link>, w: '15%'}
    ]
  }

  renderList() {
    return this.state.models.map( ({_id, partNumber, partName, family}) => 
    <tr key={_id}>
      <TableData className='table_data' style={{width: '30%'}}>{partNumber}</TableData>
      <TableData className='table_data' style={{width: '35%'}}>{partName}</TableData>
      <TableData className='table_data' style={{width: '20%'}}>{family}</TableData>
      <TableData className='table_data' style={{width: '15%'}}><Link to={`/models/update/${_id}`} ><button>Update</button></Link></TableData>
    </tr>)
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='models_body_container'>
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
        <div className='models_table_container'>
          <TableHeader header={this.state.header} className={'models_header_table'}/>
          {this.renderBodyContainer(this.state.models)}
          <RenderItems items={this.state.models}/>
        </div>
      </div>
    )
  }
}

export default Models;