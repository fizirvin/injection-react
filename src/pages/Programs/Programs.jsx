import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchPrograms, selectProgram } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Programs.css'

const header = [
  {h: 'Machine #', w: '17%'},
  {h: 'Mold #', w: '24%'},
  {h: 'Part #', w: '24%'},
  {h: 'Cycle Time (s)', w: '8%'},
  {h: 'Capacity (pcs/hr)', w: '9%'},
  {h: 'Cycles (cyc/hr)', w: '9%'},
  {h: <Link to="/programs/add"><button>Add Program</button></Link>, w: '9%'}
]

const Programs = ({ programs, fetchPrograms, selectProgram }) =>{

  useEffect(() =>{
    if(programs.length === 0){
      fetchPrograms()
    } 
  },[programs])

  
  const renderList = () =>{
      return programs.map( program => {
      const {_id, machineNumber, moldeNumber, partNumber, cycleTime, capacity, cycles} = program
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '17%'}}>{ machineNumber.machineNumber}</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ moldeNumber.moldeNumber}</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ partNumber.partName}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{ cycleTime.$numberDecimal }</TableData>
      <TableData className='table_data' style={{width: '9%'}}>{ capacity}</TableData>
      <TableData className='table_data' style={{width: '9%'}}>{ cycles}</TableData>
      <TableData className='table_data' style={{width: '9%'}}><Link to={`/programs/update/${_id}`} onClick={()=>selectProgram(program)}><button>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if( array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='programs_body_container'>
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
        <div className='programs_table_container'>
          <TableHeader header={header} className={'programs_header_table'}/>
          {renderBodyContainer(programs)}
          <RenderItems items={programs}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    programs: state.programs
})

export default connect(mapStateToProps, {fetchPrograms, selectProgram })(Programs)