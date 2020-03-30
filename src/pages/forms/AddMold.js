import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddMold extends Component {
  state= {
    moldeNumber:'',
    moldeSerial: ''
  }

  onClose = () =>{
    this.props.close('moldeMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.addMolde(this.state);
  }


  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Injection Mold:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Mold Number: </label></td>
              <td><input type="text"
                name='moldeNumber' 
                value={this.state.moldeNumber}
                onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td><label>Mold Serial: </label></td>
            <td><input type="text"
              name='moldeSerial' 
              value={this.state.moldeSerial }
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/molds"><button>Cancel</button></Link>
            <input type="submit" onSubmit={this.onSubmit} value="Submit"></input></td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
      </div>,
      document.querySelector('#modal')
    );
  }else if(this.props.message === 'error'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Something goes Wrong, Try again later <Link to="/molds"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          New Injection Mold added correctly <Link to="/molds"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default AddMold;