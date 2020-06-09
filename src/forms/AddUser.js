import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddUser extends Component {
  state= {
      name:'',
      password: '',
      level: ''
  }

    onClose = () =>{
      this.props.close('userMessage')
    }

    onInputChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

   
    onSubmit = e =>{
      e.preventDefault();
      this.props.addUser(this.state);
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
          <h2>Add New User:</h2>
          <form onSubmit={this.onSubmit} autoComplete='off'>
            <table>
          <tbody> 
            <tr>
              <td><label>Name: </label></td>
              <td><input type="text" 
              name='name' 
              value={this.state.name}
              onChange={this.onInputChange} required></input></td>
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
            <td><label>Password: </label></td>
            <td><input type="password"
              name='password'
              autoComplete='new-password'
              minLength='5'
              value={this.state.password}
              onChange={this.onInputChange} required>
                </input></td>
            </tr>
            
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
            New User added correctly <Link to="/users"><button onClick={this.onClose}>Close</button></Link>
          </div>
        </div>,document.querySelector('#modal')
      );
    }
  }
};

export default AddUser;