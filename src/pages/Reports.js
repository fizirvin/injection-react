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
        <td  className='row_detail_production'>{production.time.$numberDecimal}</td>
        <td  className='row_detail_production'>{production.oee.$numberDecimal}</td>
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

  renderList() {
    const reports = this.props.reports
    if(reports.length === 0){
      
      return <tr><td>no reports find, add report</td></tr>
    } else {
      return(this.props.reports.map( report => 
        <tr key={report._id}>
          <td className={this.formatRow(report._id, 'body_date_table')}>{ this.formatDate(report.reportDate)}</td>
          <td className={this.formatRow(report._id, 'body_shift_table')}>{ report.shift}</td>
          <td className={this.formatRow(report._id, 'body_machine_table')}>{ report.machine.machineNumber}</td>
          <td className={this.formatRow(report._id, 'body_real_table')}>{ report.totalReal}</td>
          <td className={this.formatRow(report._id, 'body_ng_table')}>{ report.totalNG}</td>
          <td className={this.formatRow(report._id, 'body_ok_table')}>{ report.totalOK}</td>
          <td className={this.formatRow(report._id, 'body_capacity_table')}>{ report.totalCapacity}</td>
          <td className={this.formatRow(report._id, 'body_efficiency_table')}>{ report.efficiency.$numberDecimal}</td>
          <td className={this.formatRow(report._id, 'body_downtime_table')}>{ report.downtime}</td>
          <td className={this.formatRow(report._id, 'body_purge')}>{this.getResines(report.resines)}</td>
          <td className={this.formatRow(report._id, 'body_update_table')}><Link to={`/reports/update/${report._id}`}><button className='button_report_list'>Update</button></Link>
          <button className='button_report_list' name={report._id} onClick={this.openDetail}>Detail</button></td>
        </tr>))
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
            <th className="report_list_header capacity_data">Capacity (pcs)</th>
            <th className="report_list_header oee_data">OEE (%)</th>
            <th className="report_list_header downtime_data">Downtime (mins)</th>
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
        <div className='report_detail'>
          {this.renderDetailTable()}
        </div>
        </div>
      </div>
    )
  }
}

export default Reports;