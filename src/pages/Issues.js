import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableData from './components/TableData'
import TableHeader from './components/TableHeader'
import RenderItems from './components/RenderItems'
import Spinner from './components/Spinner'
import './Issues.css'

class Issues extends Component {
  state ={
    issues: this.props.issues,
    header: [
      {h: 'Code', w: '15%'},
      {h: 'Issue Name', w: '70%'},
      {h: <Link to="/issues/add"><button>Add Issue</button></Link>, w: '15%'}
    ]
  }

  renderList() {
    return this.state.issues.map( issue => 
    <tr key={issue._id}>
      <TableData className='table_data' style={{width: '15%'}}>{ issue.issueCode}</TableData>
      <TableData className='table_data' style={{width: '70%'}}>{ issue.issueName}</TableData>
      <TableData className='table_data' style={{width: '15%'}}><Link to={`/issues/update/${issue._id}`}><button className='button_issue'>Update</button></Link></TableData>
    </tr>)
  }

  renderBodyContainer(array){
    if( array.length === 0){
      return <div className='spinner_div'><Spinner></Spinner></div>
    } else {
      return (
        <div className='issues_body_container'>
          <table className='body_table'>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      )
    }
  }

  render(){ 
    return (
      <div className='page_container'>
        <div className='issues_table_container'>
          <TableHeader header={this.state.header} className={'issues_header_table'}/>
          {this.renderBodyContainer(this.state.issues)}
          <RenderItems items={this.state.issues}/>
        </div>
      </div>
    )
  }
}

export default Issues;