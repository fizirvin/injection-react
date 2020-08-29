import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchMoldes, fetchCycles, selectMolde } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Moldes.css'

const header = [
  {h: 'Mold Number', w: '25%'},
  {h: 'Serial Number', w: '15%'},
  {h: 'Cavities', w: '12%'},
  {h: 'Lifecycles', w: '12%'},
  {h: 'Tcycles', w: '12%'},
  {h: '%', w: '12%'},
  {h: <Link to="/molds/add"><button>Add Mold</button></Link>, w: '12%'}
]

const Moldes = ({moldes, cycles, fetchMoldes, fetchCycles, selectMolde}) =>{

  useEffect(() =>{
    if(moldes.length === 0){
      console.log('llamé maquinas moldes')
      fetchMoldes()
    } 
  },[moldes])

  useEffect(() =>{
    if(cycles.length === 0){
      fetchCycles()
    } 
  },[cycles])

  const precise_round = (num, dec) =>{
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  const renderList = () =>{
      return moldes.map( molde => {
      const {_id, moldeNumber, moldeSerial, cavities, lifecycles, tcycles} = molde

      const array = cycles;
      const filter = array.filter( item => item.molde === _id).reduce( (a, b) =>{
        return a + b.cycles || 0
      },0)
      const sum = filter + tcycles
      const percent = precise_round((sum/lifecycles)*100, 2) 
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '25%'}}>{moldeNumber}</TableData>
      <TableData className='table_data' style={{width: '15%'}}>{moldeSerial}</TableData>
      <TableData className='table_data' style={{width: '12%'}}>{cavities}</TableData>
      <TableData className='table_data' style={{width: '12%'}}>{lifecycles}</TableData>
      <TableData className='table_data' style={{width: '12%'}}>{sum}</TableData>
      <TableData className='table_data' style={{width: '12%'}}>{percent}</TableData>
      <TableData className='table_data' style={{width: '12%'}}><Link to={`/molds/update/${_id}`} onClick={()=>selectMolde(molde)}><button>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array, cycles) =>{
      if( array.length === 0 || cycles.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='moldes_body_container'>
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
        <div className='moldes_table_container'>
          <TableHeader header={header} className={'moldes_header_table'}/>
          {renderBodyContainer(moldes, cycles)}
          <RenderItems items={moldes}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    moldes: state.moldes,
    cycles: state.cycles
})

export default connect(mapStateToProps, {fetchMoldes, fetchCycles, selectMolde})(Moldes)