import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateIssue extends Component {
  state= {
    _id:'',
    issueName: ''
  }

  componentDidMount(){
      
    const getIssue = this.props.issues.find( issue => issue._id === this.props.match.params.id);
    
    this.setState({...getIssue})

}
  onClose = () =>{
    this.props.close('issueMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateIssue(this.state);
  }

  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Update Issue:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Issue Name: </label></td>
              <td><input type="text"
              name='issueName' 
              defaultValue={this.state.issueName}
              onChange={this.onInputChange} required></input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/issues"><button>Cancel</button></Link>
            <input type="submit" onSubmit={this.onSubmit} value="Submit"></input></td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  } else if(this.props.message === 'error'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Something goes Wrong, Try again later <Link to="/issues"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Issue updated correctly <Link to="/issues"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default UpdateIssue;