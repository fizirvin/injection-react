import React from 'react';



class Machines extends React.Component {


  renderList() {
    return this.props.machines.map(machine => <li key={machine._id}>{machine.machineNumber}</li>)
  }

  render(){

    return (
      <div className="Moldes">
         Machines:
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

export default Machines;