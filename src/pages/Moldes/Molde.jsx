import React, { useState, Fragment}  from 'react'
import { connect } from 'react-redux'
import { selectMolde, openDetailCleanings, closeDetailCleanings } from './actions'
import MoldeDetail from './MoldeDetail'
import { Link } from 'react-router-dom'
import TableData from '../../components/TableData'

const Molde = ({cycles, moldeDetail, closeDetailCleanings, selectMolde, openDetailCleanings, molde, index, sum, percent}) =>{
  const [showCleans, setShowCleans ] = useState(false)


  const onOpen = () =>{
    openDetailCleanings(molde, sum)
    setShowCleans(true)
  }

  const onClose = () =>{
    closeDetailCleanings()
    setShowCleans(false)
  }

  const renderList = () =>{
      const {_id, moldeNumber, moldeSerial, cavities, lifecycles, shot, active, quantity} = molde

    return <Fragment><tr key={_id}>
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
      <TableData className='table_data' style={{width: '8%'}}><Link to={`/molds/update/${_id}`} onClick={()=>selectMolde(molde)}><button>Up</button></Link>
      {renderOpenButton()}
      </TableData>
      </tr>
      {showCleans && <MoldeDetail cycles={cycles}></MoldeDetail>}
    </Fragment>
  }

  const renderOpenButton = () =>{
    if(!moldeDetail){ return <button onClick={onOpen}>Cl</button> }
    else {return molde._id === moldeDetail._id ? <button className='closeButton-detail' onClick={onClose}>Cl</button> : <button onClick={onOpen}>Cl</button> }
  }



  return renderList()
}

const mapStateToProps = state =>({
    moldeDetail: state.moldeDetail,
})

export default connect(mapStateToProps, { closeDetailCleanings, openDetailCleanings, selectMolde})(Molde)