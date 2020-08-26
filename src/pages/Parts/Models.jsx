import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchModels, selectModel } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Models.css'

const header = [
  {h: 'Part Number', w: '30%'},
  {h: 'Part Name', w: '35%'},
  {h: 'Family', w: '20%'},
  {h: <Link to="/models/add"><button>Add Model</button></Link>, w: '15%'}
]

const Models = ({models, fetchModels, selectModel}) =>{

  useEffect(() =>{
    fetchModels();
    return 
  },[])

  const renderList = () =>{
      return models.map( model => {
      const {_id, partNumber, partName, family} = model
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '30%'}}>{partNumber}</TableData>
      <TableData className='table_data' style={{width: '35%'}}>{partName}</TableData>
      <TableData className='table_data' style={{width: '20%'}}>{family}</TableData>
      <TableData className='table_data' style={{width: '15%'}}><Link to={`/models/update/${_id}`} onClick={()=>selectModel(model)}><button>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if( array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='models_body_container'>
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
        <div className='models_table_container'>
          <TableHeader header={header} className={'models_header_table'}/>
          {renderBodyContainer(models)}
          <RenderItems items={models}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    models: state.models
})

export default connect(mapStateToProps, {fetchModels, selectModel})(Models)