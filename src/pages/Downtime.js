import React from 'react';
import { Link } from 'react-router-dom';



class Downtime extends React.Component {

  renderList() {
    return this.props.issues.map( issue => 
    <tr key={issue._id}>
      <td className="table_data issueName">{ issue.issueName}</td>
      <td className="table_data issue_update"><Link to={`/issues/update/${issue._id}`}><button className='button_issue'>Update</button></Link></td>
    </tr>)
  }

  render(){
    return (
      <div className="Downtime">
        <div className='downtime_header'>
          <h2>Injection Downtime</h2>
          <div className='downtime_controlls'>
            <table>
              <tbody>
                <tr>
                  <td>Filter By:</td>
                  <td><button>Filter 1</button><button>Filter 2</button><button>Filter 3</button></td>
                </tr>
                <tr>
                  <td>Change Week:</td>
                  <td><button>Go Back</button><button>Go Forward</button></td>
                </tr>
                <tr>
                  <td>Go to Date:</td>
                  <td><input type='date'></input></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        downtime graphic... highest indicator
      </div>
    )
  }
}

export default Downtime;