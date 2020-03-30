import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateMold extends Component {
  state= {
    _id:'',
    moldeNumber:'',
    moldeSerial: ''
  }

  componentDidMount(){
      
    const getMolde = this.props.moldes.find( molde => molde._id === this.props.match.params.id);
    
    this.setState({...getMolde})

}

  onClose = () =>{
    this.props.close('moldeMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateMolde(this.state);
  }


  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Update Injection Mold:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Mold Number: </label></td>
              <td><input type="text"
                name='moldeNumber' 
                defaultValue={this.state.moldeNumber}
                onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td><label>Mold Serial: </label></td>
            <td><input type="text"
              name='moldeSerial' 
              defaultValue={this.state.moldeSerial}
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
          Injection Mold updated correctly <Link to="/molds"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default UpdateMold;