import React from 'react';
import { Link } from 'react-router-dom';



class Defects extends React.Component {

  renderList() {
    if(this.props.defects.length === 0) {
      return <tr><td>Loading defects...</td></tr>
    } else {
      return this.props.defects.map( defect => 
        <tr key={defect._id}>
          <td className="table_data defectCode">{ defect.defectCode}</td>
          <td className="table_data defectName">{ defect.defectName}</td>
          <td className="table_data defectisInjection">{ defect.isInjection ? 'Yes' : 'No'}</td>
          <td className="table_data defect_update"><Link to={`/defects/update/${defect._id}`}><button className='button_issue'>Update</button></Link></td>
        </tr>)
    }
  }

  render(){
    return (
      <div className="Issues">
        
        <table className="issue_table">
        <thead>
          <tr>
            <th className="table_header defect_code">Code</th>
            <th className="table_header defect_name">Defect</th>
            <th className="table_header defect_isInjection">Inj Area</th>
            <th className="table_header issue_button"><Link to="/defects/add"><button>Add Defect</button></Link></th>
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

export default Defects;