import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateMold extends Component {
  state= {
    _id:'',
    moldeNumber:'',
    moldeSerial: '',
    cavities: 0,
  }

  componentDidMount(){
    const getMolde = this.props.moldes.find( molde => molde._id === this.props.match.params.id);
    return this.setState({...getMolde})
  }

  onClose = () =>{
    this.props.close('moldeMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCavitieChange = (e) => {
    const value = parseInt(e.target.value)
    if( isNaN(value) ){ return this.setState({ [e.target.name]: '' }) }
    else if( value === 0 ){ return this.setState({ [e.target.name]: '' }) }
    else { 
      console.log('meti')
      return this.setState({ [e.target.name]: e.target.value });
    }
  };

  cavitieValue = () => {
    const value = parseInt(this.state.cavities)
    if( isNaN(value) ){ return '' }
    else if( value === 0 ){ return ''}
    else { 
      return value
    }
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateMolde(this.state);
  }

  renderForm = () =>{
    return (
      <form onSubmit={this.onSubmit}>
        <table>
          <tbody> 
            <tr>
              <td><label>Mold Number: </label></td>
              <td><input type="text"
                name='moldeNumber' 
                value={this.state.moldeNumber}
                onChange={this.onInputChange} required></input>
              </td>
            </tr>
            <tr>
              <td><label>Mold Serial: </label></td>
              <td><input type="text"
                name='moldeSerial' 
                value={this.state.moldeSerial}
                onChange={this.onInputChange} required></input>
              </td>
            </tr>
            <tr>
              <td><label>Cavities: </label></td>
              <td><input type="number"
                name='cavities' 
                value={this.cavitieValue()}
                onChange={this.onCavitieChange} min="1" required></input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Link to="/molds"><button>Cancel</button></Link>
                {this.renderSubmit()}
              </td>  
            </tr>
          </tbody>
        </table>         
      </form>
    )
  }

  renderSubmit = () =>{
    if(this.state.cavities === ''){return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>}
    else{
      return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
    }
  }

  show = () =>{
    console.log(this.state)
  }

  render() {
    if(this.props.message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            <h2>Update Injection Mold:</h2>
            {this.renderForm()}
          </div>
        </div>,
        document.querySelector('#modal')
      );
    } else if(this.props.message === 'error'){
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