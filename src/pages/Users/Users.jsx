import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchUsers, selectUser } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Users.css'

const header = [
  {h: 'Name', w: '30%'},
  {h: 'Level', w: '15%'},
  {h: 'Active', w: '15%'},
  {h: 'Created', w: '20%'},
  {h: <Link to="/users/add"><button>Add User</button></Link>, w: '20%'}
]

const Users = ({ users, fetchUsers, selectUser }) =>{

  useEffect(() =>{
    if(users.length === 0){
      fetchUsers()
    } 
  },[users])

  
  const renderList = () =>{
    return users.map( user => {
      const {_id, name, level, active, shortCat } = user
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '30%'}} >{name}</TableData>
      <TableData className='table_data' style={{width: '15%'}} >{level}</TableData>
      <TableData className='table_data' style={{width: '15%'}}>{<input type='checkbox' readOnly checked={active}/>}</TableData>
      <TableData className='table_data' style={{width: '20%'}}>{shortCat}</TableData>
      <TableData className='table_data' style={{width: '20%'}}><Link to={`/users/update/${_id}`} onClick={()=>selectUser(user)}><button>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if(array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='users_body_container'>
            <table className='body_table'>
              <tbody>
                {renderList()}
              </tbody>
            </table>
          </div>
        )
      }
    }

    return (
      <div className='page_container'>
        <div className='users_table_container'>
          <TableHeader header={header} className={'users_header_table'}/>
          {renderBodyContainer(users)}
          <RenderItems items={users}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    users: state.users
})

export default connect(mapStateToProps, {fetchUsers, selectUser})(Users)