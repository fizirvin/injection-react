import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateDefect extends Component {
  state= {
    _id:'',
    defectName: '',
    defectCode: '',
    isInjection: ''
  }

  componentDidMount(){
      
    const getDefect = this.props.defects.find( defect => defect._id === this.props.match.params.id);
    
    this.setState({...getDefect})

}
  onClose = () =>{
    this.props.close('defectMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateDefect(this.state);
  }

  onIsInjection = e =>{
    const value = e.target.value
    let bool;
    if(value === 'true'){
      bool = true
    } else {bool = false}
    this.setState({isInjection: bool})
  }


  render() {


  if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Update Defect:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody>
            <tr>
              <td><label>Defect Code: </label></td>
              <td><input type="text"
              name='defectCode' 
              defaultValue={this.state.defectCode}
              onChange={this.onInputChange} required></input></td>
            </tr> 
            <tr>
              <td><label>Defect Name: </label></td>
              <td><input type="text"
              name='defectName' 
              defaultValue={this.state.defectName}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
              <td><label>Injection Area Defect?: </label></td>
              <td>
                <input type="radio" id="true" name="isInjection" onChange={this.onIsInjection} value={true}  checked={this.state.isInjection === true } required></input>
                <label htmlFor="true">Yes</label>
                <input type="radio" id="false" name="isInjection" onChange={this.onIsInjection} value={false} checked={this.state.isInjection === false } required></input>
                <label htmlFor="false">No</label>
              </td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/defects"><button>Cancel</button></Link>
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
          Something goes Wrong, Try again later <Link to="/defects"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  } else if(this.props.message === 'sucess'){
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="modal-content">
          Defect updated correctly <Link to="/defects"><button onClick={this.onClose}>Close</button></Link>
        </div>
      </div>,document.querySelector('#modal')
    );
  }
  }
};

export default UpdateDefect;