import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateModel extends Component {
  state= {
    _id:'',
    partNumber: ''
  }

  componentDidMount(){
      
    const getModel = this.props.models.find( model => model._id === this.props.match.params.id);
    
    this.setState({...getModel})

}

  onClose = () =>{
    this.props.close('modelMessage')
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
    e.preventDefault();
    this.props.updateModel(this.state);
  }


  render() {


    if(this.props.message === 'new'){
    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Update Model:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Part Number: </label></td>
              <td><input type="text"
                name='partNumber' 
                defaultValue={this.state.partNumber}
                onChange={this.onInputChange} required></input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/models"><button>Cancel</button></Link>
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
            Something goes Wrong, Try again later <Link to="/models"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if(this.props.message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            Model updated correctly <Link to="/models"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
  }
};

export default UpdateModel;