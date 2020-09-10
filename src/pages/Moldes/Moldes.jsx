import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import { fetchMoldes, fetchCycles } from './actions'
import Molde from './Molde'
import { Link, StaticRouter } from 'react-router-dom'
import TableHeader from '../../components/TableHeader'
import RenderItems from '../../components/RenderItems'
import Spinner from '../../components/Spinner'
import './Moldes.css'

const header = [
  {h: '#', w: '6%'},
  {h: 'Mold Number', w: '20%'},
  {h: 'Serial Number', w: '10%'},
  {h: 'Cavities', w: '8%'},
  {h: 'Lifecycles', w: '8%'},
  {h: 'Tcycles', w: '8%'},
  {h: '%', w: '8%'},
  {h: 'Shot', w: '8%'},
  {h: 'Quantity', w: '8%'},
  {h: 'Active', w: '8%'},
  {h: <Link to="/molds/add"><button>Add Mold</button></Link>, w: '8%'}
]

const Moldes = ({moldes, reloadCycles, moldeDetail, closeDetailCleanings, cycles, fetchMoldes, fetchCycles, selectMolde, openDetailCleanings}) =>{

  
  useEffect(() =>{
    if(moldes.length === 0){
      
      fetchMoldes()
    } 
  },[moldes])

  useEffect(() =>{
    if(cycles.length === 0){
      fetchCycles()
    } 
  },[cycles])

  useEffect(() =>{
    if(reloadCycles){
      fetchCycles()
      
    } 
  },[reloadCycles])

  const precise_round = (num, dec) =>{
    const num_sign = num >= 0 ? 1 : -1;
    const value =  (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
    const valid = isNaN(value) ? 0 : parseFloat(value)
    return isFinite(valid) ? valid : 0
  }

  const renderList = () =>{
      return moldes.map( (molde, index) => {
      const {_id, lifecycles, tcycles } = molde

      const array = cycles.filter( item => item.molde === _id)
      const filter = array.reduce( (a, b) =>{
        return a + b.tcycles || 0
      },0)
      const sum = filter + tcycles
      const percent = precise_round((sum/lifecycles)*100, 2) 
      return <Molde key={_id} index={index} sum={sum} percent={percent} molde={molde} cycles={array}/>
     }
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
    cycles: state.cycles,
    reloadCycles: state.reloadCycles
})

export default connect(mapStateToProps, {fetchMoldes, fetchCycles })(Moldes)