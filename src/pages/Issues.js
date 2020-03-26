import React from 'react';



class Issues extends React.Component {

  renderList() {
    return this.props.issues.map( issue => 
    <tr key={issue._id}>
      <td className="table_data">{ issue.issueName}</td>
      <td className="table_data">Update</td>
    </tr>)
  }

  render(){
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Issues List:</h2>
        <table className="table_list">
          <tr>
            <th className="table_header">Issue</th>
            <th className="table_header">add Issue</th>
          </tr>
          {this.renderList()}
        </table>
      </div>
    )
  }
}

export default Issues;