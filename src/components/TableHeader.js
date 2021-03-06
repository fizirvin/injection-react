import React, { Component } from 'react';

class TableHeader extends Component {
  renderHeader(){
    return this.props.header.map( ({h, w}, index) =>
      <th key={index} className='table_header' style={{width: w}}>{h}</th>
    )
  }

  render(){
    return (
        <table className={this.props.className}>
            <thead>
                <tr>{this.renderHeader()}</tr>
            </thead>
        </table>
    )
  }
}

export default TableHeader;