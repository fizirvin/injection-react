import React, { useEffect, useState}  from 'react'
import { connect } from 'react-redux'

import { hr_server, hr_opts } from '../../config'
import { workersQuery } from './queries.js'
import { fetchInitialReports, selectReport } from './actions'

import { Link } from 'react-router-dom'

import TableData from '../../components/TableData'
import TableHeader from '../../components/TableHeader'
import Pagination from './Pagination.jsx'
import Spinner from '../../components/Spinner'
import './Reports.css'

const header = [
  {h: 'Date', w: '11%'},
  {h: 'Shift', w: '5%'},
  {h: 'Machine', w: '8%'},
  {h: 'Real (pcs)', w: '8%'},
  {h: 'NG (pcs)', w: '8%'},
  {h: 'OK (pcs)', w: '8%'},
  {h: 'Plan (pcs)', w: '8%'},
  {h: 'Work Time (hrs)', w: '10%'},
  {h: 'Downtime (hrs)', w: '10%'},
  {h: 'OEE (%)', w: '8%'},
  {h: 'Purge (g)', w: '8%'},
  {h: <Link to="/reports/add"><button>Add Report</button></Link>, w: '8%'}
]

const Reports = ({ reports, loadingPage, fetchInitialReports, selectReport}) =>{
  const [_id, setId ] = useState('')
  const [ report, setReport ] =useState('')
  // const [production, setProduction ] = useState([])
  // const [ downtimeDetail, setDowntimeDetail ] = useState([])
  // const [ defects, setDefects ] = useState([])
  // const [ resines, setResines ] = useState([])
  // const [ name, setName ] = useState('')
  // const [ createdAt, setCreatedAt ] = useState('')
  // const [ updatedAt, setUpdatedAt ] = useState('')
 
  // const [ comments, setComments ] = useState('')
  // const [ team, setTeam ] = useState('')
  const [ operator, setOperator ] = useState('')
  const [ inspector, setInspector ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect(() =>{
    if(reports.length === 0){
      fetchInitialReports()
    } 
  },[reports])

  const formatDate = (format)=>{
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate()
    const m = date.getMonth()+1
    function M(){
      if(m < 10){
        return '0'+ m
      } else { return m}
    }
    function D(){
      if(d < 10){
        return '0'+ d
      } else { return d}
    }
    const formatD = D();
    const formatM = M();
    formatDate = y + '-'+ formatM + '-'+ formatD
    return formatDate
  }

  const formatRow = (id, style) => {
    const normal = 'report_list';
    const selected = 'report_selected_list'
    const stateId = _id
    if(stateId === id){
      return selected
    } 
    else {
      return normal
    }
  }

  const closeDetail = () =>{
    setId('')
    // setProduction([])
    // setDowntimeDetail([])
    // setCreatedAt('')
    // setUpdatedAt('')
    // setName('')
  }

  const openDetail = async ( id, report) =>{
    console.log(id)
    if(_id === id){ return null}
    else {
      // const getDetail = reports.find( report => report._id === id );
      // const { _id, production, downtimeDetail, defects, resines, userId, comments, workers, createdAt, updatedAt } = await getDetail
      setId(id)
      setReport(report)
      setOperator('')
      setInspector('')
      const { workers } = report
      // setProduction(production)
      // setDowntimeDetail(downtimeDetail)
      // setDefects(defects)
      // setResines(resines)
      // setName(userId.name)
      // setComments(comments || '')
      // setInspector('')
      // setOperator('')
      // setTeam(workers.team || '')
      // setCreatedAt(createdAt)
      // setUpdatedAt( updatedAt || '')
      if(!workers){return }
      else if(workers.operator && workers.inspector){
        setLoading(true)
        workersQuery.variables = { inspectorId: workers.inspector, operatorId: workers.operator }
        hr_opts.body = JSON.stringify(workersQuery)
        const res = await fetch(hr_server, hr_opts);
        const data = await res.json();
        if(data.errors){
          return console.log(data.errors)
        } else {
          const workers = data.data.workers
          const { inspector, operator } = workers
          const inspectorName = await inspector.firstname
          const inspectorLastname = await inspector.lastname
          const operatorName = await operator.firstname
          const operatorLastname = await operator.lastname
          setOperator(`${operatorName} ${operatorLastname}`)
          setInspector(`${inspectorName} ${inspectorLastname}`)
          return setLoading(false)
        }
      }
      else {
        return
      }
    }
  }

  const renderButtonOption = (id, report) =>{
    
    if(_id === id){ return <TableData className={formatRow(id)} style={{width: '8%'}}>
      <button className='button_report_list_blue' onClick={closeDetail}></button>
      <Link className='link-reports' to={`/reports/update/${id}`}>
        <button className='button_report_list_gold'></button>
    </Link></TableData> }
    else{ return <TableData className={formatRow(id)} style={{width: '8%'}}>
      <button name={id} className='button_report_list_tomato' onClick={()=>openDetail(id, report)}></button>
      <Link className='link-reports' to={`/reports/update/${id}`} onClick={()=>selectReport(report)}>
        <button className='button_report_list_gold'></button>
    </Link></TableData> }
  }

  const renderDetailTable = (report) =>{
    const { _id, production, downtimeDetail, defects, resines, userId, comments, workers, createdAt, updatedAt } = report
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
        {renderDetailProduction(production)}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Downtime</th>
          <th className="detail_mins" colSpan="2">Mins</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailDowntime(downtimeDetail)}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Defect</th>
          <th className="detail_mins" colSpan="2">Pcs</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailDefects(defects)}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Purge</th>
          <th className="detail_mins" colSpan="2">g</th>
        </tr>
      </thead>
      <tbody>
      {renderDetailPurge(resines)}
      </tbody>
      
        { comments && <tbody>
          <tr><td className='row_detail_production tbody_author' colSpan="8"></td></tr>
          <tr><td className='row_detail_production' colSpan="8"><p>{`comments: ${comments}`}</p></td></tr></tbody>}
      
      {loading ? <tbody><tr>
        <td className='row_detail_production' colSpan="8"><Spinner/></td></tr></tbody> : <tbody>
        <tr><td className='row_detail_production tbody_author' colSpan="8"></td></tr>
      { workers ? <tr>
        <td className='row_detail_production' colSpan="8">{`Team: ${workers.team }`}</td></tr>:null }
        { inspector && <tr><td className='row_detail_production' colSpan="8">{`Inspector: ${inspector}`}</td></tr> }
        { operator &&  <tr><td className='row_detail_production' colSpan="8">{`Operator: ${operator}`}</td></tr> }
      </tbody>}

      <tbody >
        <tr>
          <td className='row_detail_production tbody_author' colSpan="8">

          </td>
        </tr>
        <tr>
    <td className='row_detail_production' colSpan="8">{`created: ${createdAt}`} {`by: ${userId.name}`}</td>
        </tr>
        <tr>
    <td className='row_detail_production' colSpan="8">{updatedAt? `updated: ${updatedAt}`: null}</td>
        </tr>
      </tbody>
    </table>)
    
  }

  const renderDetailProduction = (production) => {
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

  const renderDetailDowntime = (downtimeDetail) => {
    return downtimeDetail.map( downtime => 
      <tr key={downtime._id}>
        <td  className='row_detail_production' colSpan="6">{ downtime.issueId.issueName}</td>
        <td  className='row_detail_production' colSpan="2">{ downtime.mins}</td>
      </tr>)
  }

  const renderDetailDefects = (defects) => {
    return defects.map( defect => 
      <tr key={defect._id}>
        <td  className='row_detail_production' colSpan="6">{ defect.defect.defectName}</td>
        <td  className='row_detail_production' colSpan="2">{ defect.defectPcs}</td>
      </tr>)
  }

  const renderDetailPurge = (resines) => {
    return resines.map( resine => 
      <tr key={resine._id}>
        <td  className='row_detail_production' colSpan="6">{ resine.resine.description}</td>
        <td  className='row_detail_production' colSpan="2">{ resine.purge}</td>
      </tr>)
  }

  const getResines = (resines) =>{
    const purge = resines.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)
    return purge
  }

  const returnValue = (val) =>{
    const value = parseFloat(val)
    return value
  }
  
  const renderList = ()=> {
    return reports.map( (report) =>{ 
        const {_id, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, 
          TOEE, resines} = report
      return <tr key={_id}>
        <TableData className={formatRow(_id)} style={{width: '11%'}}>{ formatDate(reportDate) }</TableData>
        <TableData className={formatRow(_id)} style={{width: '5%'}}>{ shift }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ machine.machineNumber }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ TReal }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ TNG }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ TOK }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ TPlan }</TableData>
        <TableData className={formatRow(_id)} style={{width: '10%'}}>{TWTime.$numberDecimal}</TableData>
        <TableData className={formatRow(_id)} style={{width: '10%'}}>{ TDTime.$numberDecimal }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ TOEE.$numberDecimal }</TableData>
        <TableData className={formatRow(_id)} style={{width: '8%'}}>{ getResines(resines) }</TableData>
        {renderButtonOption(_id, report)}
      </tr>}
    )
  }

  const renderBodyContainer = (array)=>{
    if( array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='reports_list_body_container'>
          <table className='body_table'>
            <tbody>
              {renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  // const renderDetailTable = () =>{
  //   return <div>hola</div>
  // }

    return (
      <div className='page_container'>
        <div className='programs_table_container'>
          <TableHeader header={header} className={'programs_header_table'}/>
          {renderBodyContainer(reports)}
          {reports.length === 0 ? null :
           loadingPage ? <div className='reports_spinner_div'><Spinner></Spinner></div> : 
          <Pagination/> }
        </div>
        <div className='report_detail'>
            {_id? renderDetailTable(report): null}
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
      reports: state.reports,
      loadingPage: state.loadingPage
})

export default connect(mapStateToProps, {fetchInitialReports, selectReport})(Reports)