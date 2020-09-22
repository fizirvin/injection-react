import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../styles/toolbar.css'

class Toolbar extends Component {
  state={
    items: 
    ['molds', 'shots', 'calendar','machines', 'material', 'models', 'issues', 'defects', 'programs', 'reports', 'production', 'record', 
    'users', 'employees'],
    title: ['Molds List:', 'Shots', 'Monthly Molds Maintenance', 'Machine List:', 'Raw Material List:', 'Model List:', 
    'Issues List:', 'Defect List:', 'Programs:', 'Production Reports:', 'Production:', 'Record:', 'Users:', 'Employees:' ],
    header:'',
    name: ''
  }

  componentDidMount(){
    return this.setState({name: this.props.name})
  }

  setHeader = (e) =>{
    const header = this.state.title[e.target.name]
    return this.setState({header})
  }

  renderItems = (arr) =>{
    return arr.map( 
      (item, index) => <Link key={index} name={index} onClick={this.setHeader} to={`/${item}`}>{item}</Link>
    )
  }

  findHeader = () =>{
    const header = this.props.location.pathname.slice(1)
    const index = this.state.items.findIndex(item => item === header)
    return index
  }

  renderHeader = () =>{
    if(this.state.header === ''){
      const index = this.findHeader()
      const header = this.state.title[index]
      return header ? header : 'Home'
    }
    else {
      return this.state.header
    }
  }

  logOut = () =>{
    this.props.logoutHandler()
  }


  render(){
    return (
      <div className='Toolbar'>
        <div className='dropdown'>
          <button className='dropbtn'>Injection</button>
          <div className='dropdown-content'>
            {this.renderItems(this.state.items)}
          </div>
        </div>
        <h3 className='header_toolbar'>{this.renderHeader()}</h3>
        <div className='user_container'>
          <div className='dropdown-user-right'>
            <button className='dropbtn-user'>{this.state.name}</button>
              <div className='dropdown-user'>
                <Link to={'/'} onClick={this.logOut}>logout</Link>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Toolbar);