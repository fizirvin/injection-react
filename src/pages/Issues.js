import React from 'react';
import { Link } from 'react-router-dom';



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
        <thead>
          <tr>
            <th className="table_header">Issue</th>
            <th className="table_header"><Link to="/Issues/Add"><button>Add Issue</button></Link></th>
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

export default Issues;