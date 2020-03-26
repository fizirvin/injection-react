import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class AddModel extends Component {


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
          <h2>Add New Model:</h2>
          <form onSubmit={this.onSubmit}>
            <table>
          <tbody> 
            <tr>
              <td><label>Part Number: </label></td>
              <td><input type="text"></input></td>
            </tr>
            
            <tr>
            <td></td>
            <td><Link to="/Models"><button>Cancel</button></Link>
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

export default AddModel;