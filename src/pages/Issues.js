import React from 'react';
import { Link } from 'react-router-dom';



class Issues extends React.Component {

  renderList() {
    return this.props.issues.map( issue => 
    <tr key={issue._id}>
      <td className="table_data issueCode">{ issue.issueCode}</td>
      <td className="table_data issueName">{ issue.issueName}</td>
      <td className="table_data issue_update"><Link to={`/issues/update/${issue._id}`}><button className='button_issue'>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Issues List:</h2>
        <table className="issue_table">
        <thead>
          <tr>
            <th className="table_header issue_code">Code</th>
            <th className="table_header issue_name">Issue</th>
            <th className="table_header issue_button"><Link to="/issues/add"><button>Add Issue</button></Link></th>
          </tr>
          </thead>
          </table>
          <div className='body_issues'> 
          <table className='body_list_issues'>
            
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default Issues;