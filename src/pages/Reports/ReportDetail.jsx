import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from '../../components/Spinner'


const ReportDetail = ({machines, fetchMachines, selectMachine}) =>{


  const renderDetailProduction = () => {
    return production.map( production => 
      <tr key={production._id}>
        <td  className='row_detail_production'>{production.molde.moldeNumber} {production.partNumber.partName}</td>
        <td  className='row_detail_production'>{production.real}</td>
        <td  className='row_detail_production'>{production.ng}</td>
        <td  className='row_detail_production'>{production.ok}</td>
        <td  className='row_detail_production'>{production.plan}</td>
        <td  className='row_detail_production'>{production.wtime.$numberDecimal}</td>
        <td  className='row_detail_production'>{production.dtime.$numberDecimal}</td>
        <td  className='row_detail_production'>{production.oee.$numberDecimal}</td>
      </tr>)
  }

  const renderDetailDowntime = () => {
    return downtimeDetail.map( downtime => 
      <tr key={downtime._id}>
        <td  className='row_detail_production' colSpan="6">{ downtime.issueId.issueName}</td>
        <td  className='row_detail_production' colSpan="2">{ downtime.mins}</td>
      </tr>)
  }

  const renderDetailDefects = () => {
    return defects.map( defect => 
      <tr key={defect._id}>
        <td  className='row_detail_production' colSpan="6">{ defect.defect.defectName}</td>
        <td  className='row_detail_production' colSpan="2">{ defect.defectPcs}</td>
      </tr>)
  }

  const renderDetailPurge = () => {
    return resines.map( resine => 
      <tr key={resine._id}>
        <td  className='row_detail_production' colSpan="6">{ resine.resine.description}</td>
        <td  className='row_detail_production' colSpan="2">{ resine.purge}</td>
      </tr>)
  }

    return(<table className='detail_table'>
      <thead>
        <tr>
          <th className="detail_mold">Mold - Part Name</th>
          <th className="detail_real">Real</th>
          <th className="detail_ng">NG</th>
          <th className="detail_ok">OK</th>
          <th className="detail_plan">Plan</th>
          <th className="detail_hrs">WT</th>
          <th className="detail_dtime">DT</th>
          <th className="detail_oee">OEE</th>
        </tr>
      </thead>
      <tbody>
        {renderDetailProduction()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Downtime</th>
          <th className="detail_mins" colSpan="2">Mins</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailDowntime()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Defect</th>
          <th className="detail_mins" colSpan="2">Pcs</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailDefects()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Purge</th>
          <th className="detail_mins" colSpan="2">g</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailPurge()}
      </tbody>
      
        { comments && <tbody>
          <tr><td className='row_detail_production tbody_author' colSpan="8"></td></tr>
          <tr><td className='row_detail_production' colSpan="8"><p>{`comments: ${comments}`}</p></td></tr></tbody>}
      
      {loading ? <tbody><tr>
        <td className='row_detail_production' colSpan="8"><Spinner/></td></tr></tbody> : <tbody>
        <tr><td className='row_detail_production tbody_author' colSpan="8"></td></tr>
      { team && <tr>
        <td className='row_detail_production' colSpan="8">{`Team: ${team}`}</td></tr> }
        { inspector && <tr><td className='row_detail_production' colSpan="8">{`Inspector: ${inspector}`}</td></tr> }
        { operator &&  <tr><td className='row_detail_production' colSpan="8">{`Operator: ${operator}`}</td></tr> }
      </tbody>}

      <tbody >
        <tr>
          <td className='row_detail_production tbody_author' colSpan="8">

          </td>
        </tr>
        <tr>
    <td className='row_detail_production' colSpan="8">{`created: ${createdAt}`} {`by: ${name}`}</td>
        </tr>
        <tr>
    <td className='row_detail_production' colSpan="8">{updatedAt? `updated: ${updatedAt}`: null}</td>
        </tr>
      </tbody>
    </table>)
}

const mapStateToProps = state =>({
    machines: state.machines
})

export default connect(mapStateToProps, {fetchMachines, selectMachine})(ReportDetail)