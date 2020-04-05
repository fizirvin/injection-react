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
      <td className="table_data">{ this.formatDate(report.reportDate)}</td>
      <td className="table_data">{ report.shift}</td>
      <td className="table_data">{ report.machine.machineNumber}</td>
      <td className="table_data">{ report.totalOK}</td>
      <td className="table_data">{ report.totalNG}</td>
      <td className="table_data">{ report.downtime}</td>
      <td className="table_data">{ report.efficiency.$numberDecimal}</td>
      <td className="table_data">Update</td>
    </tr>)
  }



  render(){
    
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Production Reports:</h2>
        <table className="table_list table_programs">
        <thead>
          <tr>
            <th className="table_header">Date</th>
            <th className="table_header">Shift</th>
            <th className="table_header">Machine</th>
            <th className="table_header">Total OK</th>
            <th className="table_header">Total NG</th>
            <th className="table_header">Downtime</th>
            <th className="table_header">Efficiency</th>
            <th className="table_header"><Link to="/reports/add"><button>Add Report</button></Link></th>
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