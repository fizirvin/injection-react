import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddMachine extends Component {


    close(){
      console.log('close')
    }

    onSubmit(e){
      e.preventDefault();
      console.log('submit')
    }


  render() {



    return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
          <h2>Add New Machine:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Machine Number: </label></td>
              <td><input type="text"></input></td>
            </tr>
            <tr>
            <td><label>Machine Serial: </label></td>
            <td><input type="text"></input></td>
            </tr>
            <tr>
            <td></td>
            <td><Link to="/Machines"><button>Cancel</button></Link>
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
};

export default AddMachine;