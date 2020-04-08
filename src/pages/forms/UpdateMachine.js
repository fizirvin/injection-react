import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateMachine extends Component {
  
  state= {
      _id: '',
      machineNumber: '',
      machineSerial:''
  }

  
    
    
    
    componentDidMount(){
      
        const getMachine = this.props.machines.find( machine => machine._id === this.props.match.params.id);
        
        this.setState({...getMachine})
    
    }
  

    onClose = () =>{
      this.props.close('machineMessage')
    }

    onInputChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e =>{
      e.preventDefault();
      this.props.updateMachine(this.state);
    }

    

  render() {
    
    if(this.props.message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
        <div className="modal-content">
          <h2>Update Machine:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td><input type="text" 
              name='machineNumber' 
              defaultValue={this.state.machineNumber}
              onChange={this.onInputChange} required></input></td>
            </tr>
            <tr>
            <td><label>Machine Serial: </label></td>
            <td><input type="text"
              name='machineSerial'
              defaultValue={this.state.machineSerial}
              onChange={this.onInputChange} required>
                </input></td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/machines"><button>Cancel</button></Link>
            <input type="submit" onSubmit={this.onSubmit} value="Submit"></input></td>
            </tr>



          </tbody>
          </table>         
          </form>
           

        </div>
      
        </div>,
        document.querySelector('#modal')
      );
    } 
    else if(this.props.message === 'error'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Something goes Wrong, Try again later <Link to="/machines"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if(this.props.message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Machine updated correctly <Link to="/machines"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
     
  }
};

export default UpdateMachine;