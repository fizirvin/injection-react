import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Users.css'

class Users extends Component {
  state ={
    users: this.props.users,
    header: [
      {h: 'Name', w: '30%'},
      {h: 'Level', w: '15%'},
      {h: 'Active', w: '15%'},
      {h: 'Created', w: '20%'},
      {h: <Link to="/users/add"><button>Add User</button></Link>, w: '20%'}
    ]
  }

  renderList(){
  return this.state.users.map( ({_id, name, level, active, shortCat, fullCat }) =>
  
  <tr key={_id}>
    <TableData className='table_data' style={{width: '30%'}} >{name}</TableData>
    <TableData className='table_data' style={{width: '15%'}} >{level}</TableData>
    <TableData className='table_data' style={{width: '15%'}}>{<input type='checkbox' readOnly checked={active}/>}</TableData>
    <TableData className='table_data' style={{width: '20%'}}>{shortCat}</TableData>
    <TableData className='table_data' style={{width: '20%'}}><Link to={`/users/update/${_id}`}><button>Update</button></Link></TableData>
  </tr>)
  }

  renderBodyContainer(array){
    if(array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
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