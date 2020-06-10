import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class UpdateUser extends Component {
  state= {
      name:'',
      active: '',
      level: ''
  }

  componentDidMount(){
      
    const getUser = this.props.users.find( user => user._id === this.props.match.params.id);
    
    this.setState({...getUser})

}

    onClose = () =>{
      this.props.close('userMessage')
    }

    onInputChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    onActiveChange = e => this.setState({active: !this.state.active})
    
    showState = () =>{
      return console.log(this.state)
    }
   
    onSubmit = e =>{
      e.preventDefault();
      this.props.updateUser(this.state);
    }

    renderSubmit = () =>{
      if(this.state.name === '' | this.state.password === '' | this.state.level === ''){return <input type="submit" onSubmit={this.onSubmit} value="Submit" disabled></input>}
      else{
        return <input type="submit" onSubmit={this.onSubmit} value="Submit"></input>
      }
    }

    setAccess = (level) =>{
      if( level === "1" ){ return 'Full access'}
      else if( level === "2"){ return 'Write reports only'} 
      else if( level === "3"){ return 'View reports only'} 
      else{ return null}
    }

    
  render() {


    if(this.props.message === 'new'){
      return ReactDOM.createPortal(
        <div className="Modal">
        <div className="modal-content">
          <h2>Update User:</h2>
          <form onSubmit={this.onSubmit} autoComplete='off'>
            <table>
          <tbody> 
            <tr>
              <td><label>Name: </label></td>
              <td><input type="text" 
              name='name' 
              value={this.state.name}
              onChange={this.onInputChange} disabled></input></td>
            </tr>
            <tr>
              <td><label>Level: </label></td>
              <td>
                <select onChange={this.onInputChange} name="level" value={this.state.level} required>
                  <option disabled value="">select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select> {this.setAccess(this.state.level)}
              </td>
            </tr>
            <tr>
              <td><label>Active: </label></td>
              <td><input type="checkbox" 
              name='active' 
              checked={this.state.active}
              onChange={this.onActiveChange}></input></td>
            </tr>
            <tr>
              <td><label>Created: </label></td>
              <td>{this.state.fullCat}</td>
            </tr>
            {/* <tr>
              <td><label>Updated: </label></td>
              <td>{this.state.fullUat}</td>
            </tr> */}
            <tr>
            <td></td>
            <td><Link to="/users"><button>Cancel</button></Link>
            {this.renderSubmit()}</td>
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
            Something goes Wrong, Try again later <Link to="/users"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    } else if(this.props.message === 'sucess'){
      return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
            User updated correctly <Link to="/users"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
  }
};

export default UpdateUser;