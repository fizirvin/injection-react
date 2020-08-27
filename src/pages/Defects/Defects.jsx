import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchDefects, selectDefect } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Defects.css'


const header = [
  {h: <div className='head_field'>Code</div>, w: '10%'},
  {h: <div className='head_field'>Defect</div>, w: '70%'},
  {h: <div className='head_field'>Inj Area</div>, w: '10%'},
  {h: <Link to="/defects/add"><button>Add Defect</button></Link>, w: '10%'}
]

const Defects = ({ defects, fetchDefects, selectDefect }) =>{

  useEffect(() =>{
    fetchDefects();
    return 
  },[])

  // const sortDefects = () =>{
  //   const sort = defects.sort((a, b) => (a.defectCode > b.defectCode ) ? 1 : -1 )
  //   return this.setState({defects: sort })
  // }

  // const sortName = () =>{
  //   const sort = defects.sort((a, b) => (a.defectName > b.defectName ) ? 1 : -1 )
  //   return this.setState({defects: sort })
  // }

  // const sortArea = () =>{
  //   const sort = defects.sort((a, b) => (a.isInjection > b.isInjection ) ? -1 : 1 )
  //   return this.setState({defects: sort })
  // }
  
  const renderList = () =>{
      return defects.map( defect => {
      const { _id, defectCode, defectName, isInjection } = defect
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '10%'}}>{ defectCode}</TableData>
      <TableData className='table_data' style={{width: '70%'}}>{ defectName}</TableData>
      <TableData className='table_data' style={{width: '10%'}}>{<input type='checkbox' readOnly checked={isInjection}/>}</TableData>
      <TableData className='table_data' style={{width: '10%'}}><Link to={`/defects/update/${_id}`} onClick={()=>selectDefect(defect)} ><button className='button_issue'>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if( array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='defects_body_container'>
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
        <div className='defects_table_container'>
          <TableHeader header={header} className={'defects_header_table'}/>
          {renderBodyContainer(defects)}
          <RenderItems items={defects}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    defects: state.defects
})

export default connect(mapStateToProps, {fetchDefects, selectDefect})(Defects)