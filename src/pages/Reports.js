import React from 'react';
import { Link } from 'react-router-dom';



class Reports extends React.Component {

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate()
    const m = date.getMonth()+1
    formatDate = y + '-' + m +'-'+ d
    return formatDate
  }
  renderList() {
    return this.props.reports.map( report => 
    <tr key={report._id}>
      <td className="report_list">{ this.formatDate(report.reportDate)}</td>
      <td className="report_list">{ report.shift}</td>
      <td className="report_list">{ report.machine.machineNumber}</td>
      <td className="report_list">{ report.totalReal}</td>
      <td className="report_list">{ report.totalNG}</td>
      <td className="report_list">{ report.totalOK}</td>
      <td className="report_list">{ report.totalCapacity}</td>
      <td className="report_list">{ report.efficiency.$numberDecimal}</td>
      <td className="report_list">{ report.downtime}</td>
      <td className="report_list"><Link to="/reports/add"><button>Update</button></Link></td>
    </tr>)
  }



  render(){
    
    return (
      <div className="Reports">
        <h2 className="section_header report_list_title">Injection Production Reports:</h2>
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
            <th className="report_list_header add_data"><Link to="/reports/add"><button>Add Report</button></Link></th>
          </tr>
          </thead> 
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Reports;