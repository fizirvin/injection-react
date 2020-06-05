import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import './Material.css'

class Material extends Component {
  state ={
    material: this.props.material,
    header: [
      {h: 'Part Number', w: '14%'},
      {h: 'Manufacturer', w: '14%'},
      {h: 'Description', w: '24%'},
      {h: 'Acronym', w: '14%'},
      {h: 'ID', w: '14%'},
      {h: 'Type', w: '7%'},
      {h: 'Unit', w: '5%'},
      {h: <Link to="/material/add"><button>Add Material</button></Link>, w: '8%'}
    ]
  }

  renderList() {
    return this.state.material.map( ({_id, number, manufacturer, description, acronym, identification, type, unit}) => 
    <tr key={_id}>
      <TableData className='table_data' style={{width: '14%'}}>{ number }</TableData>
      <TableData className='table_data' style={{width: '14%'}}>{ manufacturer }</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ description }</TableData>
      <TableData className='table_data' style={{width: '14%'}}>{ acronym}</TableData>
      <TableData className='table_data' style={{width: '14%'}}>{ identification }</TableData>
      <TableData className='table_data' style={{width: '7%'}}>{type}</TableData>
      <TableData className='table_data' style={{width: '5%'}}>{ unit }</TableData>
      <TableData className='table_data' style={{width: '8%'}}><Link to={`/material/update/${_id}`}><button className='button_issue'>Update</button></Link></TableData>
    </tr>)
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='material_body_container'>
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
        <div className='material_table_container'>
          <TableHeader header={this.state.header} className={'material_header_table'}/>
          {this.renderBodyContainer(this.state.material)}
          <RenderItems items={this.state.material}/>
        </div>
      </div>
    )
  }
}

export default Material;