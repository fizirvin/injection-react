import React from 'react';
import { Link } from 'react-router-dom';


class Moldes extends React.Component {

  renderList() {
    return this.props.moldes.map( molde => 
    <tr key={molde._id}>
      <td className="table_data molde_number">{molde.moldeNumber}</td>
      <td className="table_data molde_serial">{molde.moldeSerial}</td>
      <td className="table_data molde_table_data"><Link to={`/molds/update/${molde._id}`}><button>Update</button></Link></td>
    </tr>)
    }

  render(){
    return (
      <div className="Moldes">
        <h2 className="section_header">Injection Mold List:</h2>
        <table className="table_list_moldes">
          <thead>
          <tr>
            <th className="table_header">Mold Number</th>
            <th className="table_header">Mold Serial</th>
            <th className="table_header"><Link to="/molds/add"><button>Add Mold</button></Link></th>
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

export default Moldes;