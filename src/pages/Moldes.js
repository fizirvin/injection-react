import React from 'react';



class Moldes extends React.Component {

  renderList() {
    return this.props.moldes.map( molde => 
    <tr key={molde._id}>
      <td className="table_data">{molde.moldeNumber}</td>
      <td className="table_data">{molde.moldeSerial}</td>
      <td className="table_data">Update</td>
    </tr>)
    }

  render(){
    return (
      <div className="Moldes">
        <h2 className="section_header">Injection Mold List:</h2>
        <table className="table_list">
          <tr>
            <th className="table_header">Mold Number</th>
            <th className="table_header">Mold Serial</th>
            <th className="table_header">add Mold</th>
          </tr>
          {this.renderList()}
        </table>
      </div>
    )
  }
}

export default Moldes;