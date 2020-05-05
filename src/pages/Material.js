import React from 'react';
import { Link } from 'react-router-dom';



class Material extends React.Component {

  renderList() {
    return this.props.material.map( material => 
    <tr key={material._id}>
      <td className="table_data material_number">{ material.number}</td>
      <td className="table_data material_description">{ material.description}</td>
      <td className="table_data material_type">{ material.type}</td>
      <td className="table_data material_unit">{ material.unit}</td>
      <td className="table_data material_update"><Link to={`/material/update/${material._id}`}><button className='button_issue'>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Raw Material List:</h2>
        <table className="issue_table">
        <thead>
          <tr>
            <th className="table_header material_number">Part Number</th>
            <th className="table_header material_description">Description</th>
            <th className="table_header material_type">Type</th>
            <th className="table_header material_unit">Unit</th>
            <th className="table_header material_button"><Link to="/material/add"><button>Add Material</button></Link></th>
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

export default Material;