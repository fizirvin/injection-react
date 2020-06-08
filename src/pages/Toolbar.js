import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './styles/toolbar.css'

class Toolbar extends Component {
  state={
    items: 
    ['molds', 'machines', 'material', 'models', 'issues', 'defects', 'programs', 'reports', 'production', 'users'],
    title: ['Molds List:', 'Machine List:', 'Raw Material List:', 'Model List:', 
    'Issues List:', 'Defect List:', 'Programs:', 'Production Reports:', 'Production:', 'Users:' ],
    header:''
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
      </div>
    )
  }
}

export default withRouter(Toolbar);