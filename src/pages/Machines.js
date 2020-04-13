import React from 'react';
import { Link } from 'react-router-dom';


class Machines extends React.Component {

  renderList() {
  return this.props.machines.map(machine => 
  <tr key={machine._id}>
    <td className="table_data machine_number">{machine.machineNumber}</td>
    <td className="table_data machine_Serial">{machine.machineSerial}</td>
    <td className="table_data machine_update"><Link to={`/machines/update/${machine._id}`}><button>Update</button></Link></td>
  </tr>)
  }

  render(){

    return (
      <div className="Moldes">
        <h2 className="section_header">Injection Machine List:</h2>
        <table className="table_list">
        <thead> 
            <tr>
              <th className="table_header">Machine Number</th>
              <th className="table_header">Machine Serial</th>
              <th className="table_header"><Link to="/machines/add"><button>Add Machine</button></Link></th>
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