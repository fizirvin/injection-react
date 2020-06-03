import React from 'react';
import { Link } from 'react-router-dom';


class Machines extends React.Component {

  renderList() {
  return this.props.machines.map(machine => 
  <tr key={machine._id}>
    <td className="table_data machine_number">{machine.machineNumber}</td>
    <td className="table_data machine_Serial">{machine.machineSerial}</td>
    <td className="table_data machine_force">{machine.closingForce}</td>
    <td className="table_data machine_diameter">{machine.spindleDiameter}</td>
    <td className="table_data machine_update"><Link to={`/machines/update/${machine._id}`}><button>Update</button></Link></td>
  </tr>)
  }

  render(){

    return (
      <div className="Moldes">
        
        <table className="table_list machine_table">
        <thead> 
            <tr>
              <th className="table_header header_num">Machine Number</th>
              <th className="table_header header_serial">Machine Serial</th>
              <th className="table_header header_force">Closing Force (t)</th>
              <th className="table_header header_diameter">Spindle D (mm)</th>
              <th className="table_header header_addmachine"><Link to="/machines/add"><button>Add Machine</button></Link></th>
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

export default Machines;