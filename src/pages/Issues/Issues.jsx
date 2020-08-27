import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { fetchIssues, selectIssue } from './actions'

import { Link } from 'react-router-dom'
import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Issues.css'

const header = [
  {h: 'Code', w: '15%'},
  {h: 'Issue Name', w: '70%'},
  {h: <Link to="/issues/add"><button>Add Issue</button></Link>, w: '15%'}
]

const Issues = ({ issues, fetchIssues, selectIssue}) =>{

  useEffect(() =>{
    fetchIssues();
    return 
  },[])

  
  const renderList = () =>{
      return issues.map( issue => {
      const {_id, issueCode, issueName } = issue
      return <tr key={_id}>
      <TableData className='table_data' style={{width: '15%'}}>{ issueCode}</TableData>
      <TableData className='table_data' style={{width: '70%'}}>{ issueName}</TableData>
      <TableData className='table_data' style={{width: '15%'}}><Link to={`/issues/update/${_id}`} onClick={()=>selectIssue(issue)}><button className='button_issue'>Update</button></Link></TableData>
    </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
      if( array.length === 0){
        return <div className='spinner_div'><Spinner></Spinner></div>
      } else {
        return (
          <div className='issues_body_container'>
            <table className='body_table'>
              <tbody>
                {renderList()}
              </tbody>
            </table>
          </div>
        )
      }
    }

    return (
      <div className='page_container'>
        <div className='issues_table_container'>
          <TableHeader header={header} className={'issues_header_table'}/>
          {renderBodyContainer(issues)}
          <RenderItems items={issues}/>
        </div>
      </div>
    )
}

const mapStateToProps = state =>({
    issues: state.issues
})

export default connect(mapStateToProps, {fetchIssues, selectIssue})(Issues)