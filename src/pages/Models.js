import React from 'react';
import { Link } from 'react-router-dom';

class Models extends React.Component {

  renderList() {
    return this.props.models.map( model => 
    <tr key={model._id}>
      <td className="table_data">{model.partNumber}</td>
      <td className="table_data">{model.partName}</td>
      <td className="table_data">{model.family}</td>
      <td className="table_data"><Link to={`/models/update/${model._id}`}><button>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Models">
        <h2 className="section_header">Injection Model List:</h2>
        <table className="table_list partnumber_table">
          <thead>
          <tr>
            <th className="table_header partnumber_header">Part Number</th>
            <th className="table_header partname_hader">Part Name</th>
            <th className="table_header family_header">Family</th>
            <th className="table_header addpart_hader"><Link to="/models/add"><button>Add Model</button></Link></th>
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

export default Models;