import React, { Component } from 'react';
import '../pages/styles/login.css'


class Login extends Component {
  state = {
    name: '',
    password: ''
  }
  
login = e =>{
  e.preventDefault()
  return this.props.loginHandler(this.state)
}
onInputName = e=>{
  return this.setState({name: e.target.value})
}

onInputPassword = (e) =>{
  return this.setState({password: e.target.value})
}

  render(){
    return (
      <div className="Login">
        <div className='login_container'>
          <form className='login_form' autoComplete='off' onSubmit={this.login}>
            <table>
              <tbody>
                <tr><td><input type='text' value={this.state.name} onChange={this.onInputName} required className='login_input' placeholder="name" autoComplete='off'></input></td></tr>
                <tr><td><input type='password' value={this.state.password} onChange={this.onInputPassword} required className='login_input' placeholder="password" autoComplete='new-password'></input></td></tr>
              </tbody>
            </table>
            <button className='login_button' type='submit'>login</button>
          </form>
          
        </div>
      </div>
    )
  }
}

export default Login;