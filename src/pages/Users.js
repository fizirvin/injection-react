import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import './Users.css'

class Users extends Component {
  state ={
    users: this.props.users,
    header: [
      {h: 'Name', w: '25%'},
      {h: 'Level', w: '25%'},
      {h: 'Active', w: '15%'},
      {h: 'Created At', w: '20%'},
      {h: <button>Add User</button>, w: '15%'}
    ]
  }

  renderList(){
  return this.state.users.map( ({_id, name, level, active, createdAt}) =>
 
  <tr key={_id}>
    <TableData className='table_data' style={{width: '25%'}} >{name}</TableData>
    <TableData className='table_data' style={{width: '25%'}} >{level}</TableData>
    <TableData className='table_data' style={{width: '15%'}}>{<input type='checkbox' checked={active? 'Yes': 'No'}/>}</TableData>
    <TableData className='table_data' style={{width: '20%'}}>{}</TableData>
    <TableData className='table_data' style={{width: '15%'}}><button>Update</button></TableData>
  </tr>)
  }

  renderBodyContainer(array){
    if(array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='users_body_container'>
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
        <div className='users_table_container'>
          <TableHeader header={this.state.header} className={'users_header_table'}/>
          {this.renderBodyContainer(this.state.users)}
          <RenderItems items={this.state.users}/>
        </div>
      </div>
    )
  }
}

export default Users;