import React  from 'react'
import { connect } from 'react-redux'
import { selectMolde } from './actions'
import { Link } from 'react-router-dom'
import TableData from '../../components/TableData'

const Molde = ({selectMolde, molde, index, sum, percent}) =>{
  
  
  const renderList = () =>{
      const {_id, moldeNumber, moldeSerial, cavities, lifecycles, shot, active, quantity} = molde

    return <tr key={_id}>
      <TableData className='table_data' style={{width: '6%'}}>{index+1}</TableData>
      <TableData className='table_data' style={{width: '20%'}}>{moldeNumber}</TableData>
      <TableData className='table_data' style={{width: '10%'}}>{moldeSerial}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{cavities}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{lifecycles}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{sum}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{percent}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{shot}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{quantity}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{<input type='checkbox' readOnly checked={active}/>}</TableData>
      <TableData className='table_data' style={{width: '8%'}}><Link to={`/molds/update/${_id}`} onClick={()=>selectMolde(molde)}><button>Up</button></Link></TableData>
    </tr>
  }

  return renderList()
}

// const mapStateToProps = state =>({
//     moldeDetail: state.moldeDetail,
// })

export default connect(null, { selectMolde})(Molde)