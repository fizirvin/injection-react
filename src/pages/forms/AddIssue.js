import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddIssue extends Component {
  state= {
    issueName: ''
  }

  onClose = () =>{
    this.props.close('issueMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.addIssue(this.state);
  }

  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Issue:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Issue Name: </label></td>
              <td><input type="text"
              name='issueName' 
              value={this.state.issueName}
              onChange={this.onInputChange}></input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/Issues"><button>Cancel</button></Link>
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
          Something goes Wrong, Try again later <Link to="/Issues"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Issue added correctly <Link to="/Issues"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddIssue;