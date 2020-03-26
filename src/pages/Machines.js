import React from 'react';



class Machines extends React.Component {


  renderList() {
  return this.props.machines.map(machine => 
  <tr key={machine._id}>
    <td className="table_data">{machine.machineNumber}</td>
    <td className="table_data">{machine.machineSerial}</td>
    <td className="table_data">Update</td>
  </tr>)
  }

  render(){

    return (
      <div className="Moldes">
        <h2 className="section_header">Injection Machine List:</h2>
        <table className="table_list">
          <tr>
            <th className="table_header">Machine Number</th>
            <th className="table_header">Machine Serial</th>
            <th className="table_header">add Machine</th>
          </tr>
          {this.renderList()}
        </table>
      </div>
    )
  }
}

export default Machines;