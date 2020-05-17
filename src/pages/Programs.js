import React from 'react';
import { Link } from 'react-router-dom';



class Programs extends React.Component {

  renderList() {
    return this.props.programs.map( program => 
    <tr key={program._id}>
      <td className="table_data machineNumber">{ program.machineNumber.machineNumber}</td>
      <td className="table_data moldeNumber">{ program.moldeNumber.moldeNumber}</td>
      <td className="table_data partNumber">{ program.partNumber.partName}</td>
      <td className="table_data cycles">{ program.cycles}</td>
      <td className="table_data capacity">{ program.capacity}</td>
      <td className="table_data add_program"><Link to={`/programs/update/${program._id}`}><button>Update</button></Link></td>
    </tr>)
  }


  render(){
    return (
      <div className="Programs">
        <h2 className="section_header">Injection Programs List:</h2>
        <table className="table_programs">
        <thead>
          <tr>
            <th className="table_header machineNumber_header">Machine Number</th>
            <th className="table_header moldeNumber_header">Mold Number</th>
            <th className="table_header partNumber_header">Part Number</th>
            <th className="table_header cycles_header">Cycles (hr)</th>
            <th className="table_header capacity_header">Capacity (pcs/hr)</th>
            <th className="table_header add_program_header"><Link to="/programs/add"><button>Add Program</button></Link></th>
          </tr>
          </thead>
          </table>
          <div className='body_programs_table'>
          <table className='body_programs'> 
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default Programs;