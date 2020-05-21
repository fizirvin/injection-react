import React from 'react';
import { Link } from 'react-router-dom';



class Reports extends React.Component {
  state ={
    _id: '',
    production: [],
    downtimeDetail: [],
    target: ''
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
    const normal = `report_list ${style}`;
    const selected = `report_selected_list ${style}`
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
      const { _id, production, downtimeDetail } = await getDetail
      this.setState({
        _id: _id, 
        production: production,
        downtimeDetail: downtimeDetail,
        target: id
      })
    }
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
          <th className="detail_mold">Mold</th>
          <th className="detail_real">Real</th>
          <th className="detail_ng">NG</th>
          <th className="detail_ok">OK</th>
          <th className="detail_hrs">Hrs</th>
          <th className="detail_oee">OEE</th>
        </tr>
      </thead>
      <tbody>
        {this.renderDetailProduction()}
      </tbody>
      <thead>
        <tr>
          <th className="detail_downtime" colSpan="3">Downtime</th>
          <th className="detail_mins">Mins</th>
          <th className="detail_close_button" colSpan="2"><button onClick={this.closeDetail}>close</button></th>
        </tr>
      </thead>
      <tbody>
      {this.renderDetailDowntime()}
      </tbody>
    </table>)
    }

  }

  renderDetailProduction = () => {
    return this.state.production.map( production => 
      <tr key={production._id}>
        <td  className='row_detail_production'>{production.molde.moldeNumber}</td>
        <td  className='row_detail_production'>{production.real}</td>
        <td  className='row_detail_production'>{production.ng}</td>
        <td  className='row_detail_production'>{production.ok}</td>
        <td  className='row_detail_production'>{production.wtime.$numberDecimal}</td>
        <td  className='row_detail_production'>{production.woee.$numberDecimal}</td>
      </tr>)
  }

  renderDetailDowntime = () => {
    return this.state.downtimeDetail.map( downtime => 
      <tr key={downtime._id}>
        <td  className='row_detail_production' colSpan="3">{ downtime.issueId.issueName}</td>
        <td  className='row_detail_production'>{ downtime.mins}</td>
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
    const reports = this.props.reports
    if(reports.length === 0){
      
      return <tr><td>no reports find, add report</td></tr>
    } else {
      return( 
        this.props.reports.map( report => {
          const { _id, reportDate, shift, machine, TReal, TNG, TOK, TPlan, TWTime, TDTime, 
            TAvailability, TPerformance, TQuality, TOEE, resines } = report 
    
        return <tr key={report._id}>
          <td className={this.formatRow(report._id, 'body_date_table')}>{ this.formatDate(reportDate) }</td>
          <td className={this.formatRow(report._id, 'body_shift_table')}>{ shift }</td>
          <td className={this.formatRow(report._id, 'body_machine_table')}>{ machine.machineNumber }</td>
          <td className={this.formatRow(report._id, 'body_real_table')}>{ TReal }</td>
          <td className={this.formatRow(report._id, 'body_ng_table')}>{ TNG }</td>
          <td className={this.formatRow(report._id, 'body_ok_table')}>{ TOK }</td>
          <td className={this.formatRow(report._id, 'body_plan_table')}>{ TPlan }</td>
          <td className={this.formatRow(report._id, 'body_worktime_table')}>{TWTime.$numberDecimal}</td>
          <td className={this.formatRow(report._id, 'body_downtime_table')}>{ TDTime.$numberDecimal }</td>
          <td className={this.formatRow(report._id, 'body_availability_table')}>{TAvailability.$numberDecimal }</td>
          <td className={this.formatRow(report._id, 'body_performance_table')}>{ TPerformance.$numberDecimal}</td>
          <td className={this.formatRow(report._id, 'body_quality_table')}>{ TQuality.$numberDecimal }</td>
          <td className={this.formatRow(report._id, 'body_toee_table')}>{ TOEE.$numberDecimal }</td>
          <td className={this.formatRow(report._id, 'body_purge')}>{this.getResines(resines) }</td>
          <td className={this.formatRow(report._id, 'body_update_table')}><Link className='link-reports' to={`/reports/update/${_id}`}><button className='button_report_list'>Update</button></Link></td>
        </tr>})
      )
    }
  }



  render(){
    
    return (
      <div className="Reports">
        <h2 className="section_header report_list_title">Injection Production Reports:</h2>
        <div className='reports_container'>
          <div className='container_first_table'>
        <table className="report_list_table">
        <thead>
          <tr>
            <th className="report_list_header date_data">Date</th>
            <th className="report_list_header shift_data">Shift</th>
            <th className="report_list_header machine_data">Machine</th>
            <th className="report_list_header treal_data">Real (pcs)</th>
            <th className="report_list_header ng_data">NG (pcs)</th>
            <th className="report_list_header ok_data">OK (pcs)</th>
            <th className="report_list_header plan_data">Plan (pcs)</th>
            <th className="report_list_header worktime_data">Work Time (hrs)</th>
            <th className="report_list_header downtime_data">Downtime (hrs)</th>
            <th className="report_list_header availability_data">Availability (%)</th>
            <th className="report_list_header performance_data">Performance (%)</th>
            <th className="report_list_header quality_data">Quality (%)</th>
            <th className="report_list_header toee_data">OEE (%)</th>
            <th className="report_list_header purge_data">Purge (g)</th>
            <th className="report_list_header add_data">
              <Link to="/reports/add"><button>Add Report</button></Link>
              </th>
          </tr>
          </thead> 

          </table>
          <div className='body_reports'>
          <table className='body_table_reports'> 
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        </div>
        </div>
        {/* <div className='report_detail'>
          {this.renderDetailTable()}
        </div> */}
        </div>
      </div>
    )
  }
}

export default Reports;