import React from 'react';
import { Link } from 'react-router-dom';



class Programs extends React.Component {

  renderList() {
    return this.props.programs.map( program => 
    <tr key={program._id}>
      <td className="table_data">{ program.machineNumber.machineNumber}</td>
      <td className="table_data">{ program.moldeNumber.moldeNumber}</td>
      <td className="table_data">{ program.partNumber.partNumber}</td>
      <td className="table_data">{ program.cycles}</td>
      <td className="table_data">{ program.capacity}</td>
      <td className="table_data"><Link to={`/programs/update/${program._id}`}><button>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Issues">
        <h2 className="section_header">Injection Programs List:</h2>
        <table className="table_list table_programs">
        <thead>
          <tr>
            <th className="table_header">Machine Number</th>
            <th className="table_header">Mold Number</th>
            <th className="table_header">Part Number</th>
            <th className="table_header">Cycles (hr)</th>
            <th className="table_header">Capacity (pcs/hr)</th>
            <th className="table_header"><Link to="/programs/add"><button>Add Program</button></Link></th>
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

export default Programs;