import React from 'react';
import { Link } from 'react-router-dom';



class Issues extends React.Component {

  renderList() {
    return this.props.issues.map( issue => 
    <tr key={issue._id}>
      <td className="table_data">{ issue.issueName}</td>
      <td className="table_data"><Link to={`/issues/update/${issue._id}`}><button>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Issues List:</h2>
        <table className="table_list issue_table">
        <thead>
          <tr>
            <th className="table_header issue_name">Issue</th>
            <th className="table_header issue_button"><Link to="/issues/add"><button>Add Issue</button></Link></th>
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