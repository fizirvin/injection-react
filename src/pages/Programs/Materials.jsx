import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchMaterials, selectMaterial } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Materials.css'

const header = [
  {h: 'Part Number', w: '14%'},
  {h: 'Manufacturer', w: '14%'},
  {h: 'Description', w: '24%'},
  {h: 'Acronym', w: '10%'},
  {h: 'Color', w: '8%'},
  {h: 'ID', w: '10%'},
  {h: 'Type', w: '7%'},
  {h: 'Unit', w: '5%'},
  {h: <Link to="/material/add"><button>Add Material</button></Link>, w: '8%'}
]

const Materials = ({ materials, fetchMaterials, selectMaterial }) =>{

  useEffect(() =>{
    fetchMaterials();
    return 
  },[])

  
  const renderList = () =>{
      return materials.map( material => {
      const {_id, number, manufacturer, description, acronym, identification, type, unit, color} = material
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '14%'}}>{ number }</TableData>
      <TableData className='table_data' style={{width: '14%'}}>{ manufacturer }</TableData>
      <TableData className='table_data' style={{width: '24%'}}>{ description }</TableData>
      <TableData className='table_data' style={{width: '10%'}}>{ acronym}</TableData>
      <TableData className='table_data' style={{width: '8%'}}>{ color }</TableData>
      <TableData className='table_data' style={{width: '10%'}}>{ identification }</TableData>
      <TableData className='table_data' style={{width: '7%'}}>{type}</TableData>
      <TableData className='table_data' style={{width: '5%'}}>{ unit }</TableData>
      <TableData className='table_data' style={{width: '8%'}}><Link to={`/material/update/${_id}`} onClick={()=>selectMaterial(material)}><button className='button_issue'>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if( array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='material_body_container'>
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
        <div className='material_table_container'>
          <TableHeader header={header} className={'material_header_table'}/>
          {renderBodyContainer(materials)}
          <RenderItems items={materials}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    materials: state.materials
})

export default connect(mapStateToProps, {fetchMaterials, selectMaterial})(Materials)