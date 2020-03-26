import React from 'react';



class Models extends React.Component {

  renderList() {
    return this.props.models.map( model => 
    <tr key={model._id}>
      <td className="table_data">{model.partNumber}</td>
      <td className="table_data">Update</td>
    </tr>)
  }

  render(){
    return (
      <div className="Models">
        <h2 className="section_header">Injection Model List:</h2>
        <table className="table_list">
          <tr>
            <th className="table_header">Part Number</th>
            <th className="table_header">add Model</th>
          </tr>
          {this.renderList()}
        </table>
      </div>
    )
  }
}

export default Models;