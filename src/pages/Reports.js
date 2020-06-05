import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import './Reports.css'

class Reports extends Component {
  state ={
    _id: '',
    production: [],
    downtimeDetail: [],
    target: '',
    reports: this.props.reports,
    header: [
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

  }

  formatDate(format){
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

  formatRow = (id, style) => {
    const normal = 'report_list';
    const selected = 'report_selected_list'
    const stateId = this.state._id
    if(stateId === id){
      return selected
    } 
    else {
      return normal
    }
  }

  closeDetail = () =>{
    const state ={
      _id: '',
      production: [],
      downtimeDetail: [],
      target: ''
    }
    this.setState({
      _id: state._id, 
      production: state.production, 
      downtimeDetail: state.downtimeDetail,
      target: ''
     })
    
  }

  openDetail = async ( e ) =>{
    const id = e.target.name

    if(this.state._id === id){ return null}
    else {
      const getDetail = this.props.reports.find( report => report._id === e.target.name );
      const { _id, production, downtimeDetail, defects, resines } = await getDetail
      this.setState({
        _id: _id, 
        production: production,
        downtimeDetail: downtimeDetail,
        defects: defects,
        resines: resines, 
        target: id
      })
    }
  }

  renderButtonOption = (id) =>{
    if(this.state._id === id){ return <TableData className={this.formatRow(id)} style={{width: '8%'}}>
      <button className='button_report_list_blue' onClick={this.closeDetail}></button>
      <Link className='link-reports' to={`/reports/update/${id}`}>
        <button className='button_report_list_gold'></button>
    </Link></TableData> }
    else{ return <TableData className={this.formatRow(id)} style={{width: '8%'}}>
      <button name={id} className='button_report_list_tomato' onClick={this.openDetail}></button>
      <Link className='link-reports' to={`/reports/update/${id}`}>
        <button className='button_report_list_gold'></button>
    </Link></TableData> }
  }

  renderDetailTable = () =>{
    const id = this.state._id;
    if(id === ''){
      return null
    }
    else{
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
        {this.renderDetailProduction()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Downtime</th>
          <th className="detail_mins" colSpan="2">Mins</th>
        </tr>
      </thead>
      <tbody>
      {this.renderDetailDowntime()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Defect</th>
          <th className="detail_mins" colSpan="2">Pcs</th>
        </tr>
      </thead>
      <tbody>
      {this.renderDetailDefects()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="6">Purge</th>
          <th className="detail_mins" colSpan="2">g</th>
        </tr>
      </thead>
      <tbody>
      {this.renderDetailPurge()}
      </tbody>
    </table>)
    }
  }

  renderDetailProduction = () => {
    return this.state.production.map( production => 
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

  renderDetailDowntime = () => {
    return this.state.downtimeDetail.map( downtime => 
      <tr key={downtime._id}>
        <td  className='row_detail_production' colSpan="6">{ downtime.issueId.issueName}</td>
        <td  className='row_detail_production' colSpan="2">{ downtime.mins}</td>
      </tr>)
  }

  renderDetailDefects = () => {
    return this.state.defects.map( defect => 
      <tr key={defect._id}>
        <td  className='row_detail_production' colSpan="6">{ defect.defect.defectName}</td>
        <td  className='row_detail_production' colSpan="2">{ defect.defectPcs}</td>
      </tr>)
  }

  renderDetailPurge = () => {
    return this.state.resines.map( resine => 
      <tr key={resine._id}>
        <td  className='row_detail_production' colSpan="6">{ resine.resine.description}</td>
        <td  className='row_detail_production' colSpan="2">{ resine.purge}</td>
      </tr>)
  }

  getResines = (resines) =>{
    const purge = resines.reduce( (a, b) =>{
      return a + b.purge || 0
    },0)
    return purge
  }

  returnValue = (val) =>{
    const value = parseFloat(val)
    return value
  }

  renderList() {
    return this.state.reports.map( ({_id, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, 
      TOEE, resines}) => 
      <tr key={_id}>
        <TableData className={this.formatRow(_id)} style={{width: '11%'}}>{ this.formatDate(reportDate) }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '5%'}}>{ shift }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ machine.machineNumber }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ TReal }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ TNG }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ TOK }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ TPlan }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '10%'}}>{TWTime.$numberDecimal}</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '10%'}}>{ TDTime.$numberDecimal }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{ TOEE.$numberDecimal }</TableData>
        <TableData className={this.formatRow(_id)} style={{width: '8%'}}>{this.getResines(resines) }</TableData>
        {this.renderButtonOption(_id)}
      </tr>
    )
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div>...loading</div>
    } else {
      return (
        <div className='programs_body_container'>
          <table className='body_table'>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='programs_table_container'>
          <TableHeader header={this.state.header} className={'programs_header_table'}/>
          {this.renderBodyContainer(this.state.reports)}
          <RenderItems items={this.state.reports}/>
        </div>
        <div className='report_detail'>
            {this.renderDetailTable()}
        </div>
      </div>
    )
  }
}

export default Reports;