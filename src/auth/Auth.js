import React, { Component, Fragment } from 'react';
import {BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Login from './Login'
import NotFound from './NotFound'
import { loginQuery } from '../actions/queries';
import { url, opts } from '../actions/config/index';
import App from '../App.js'

class Auth extends Component {
    state ={
        isAuth: false,
        token: null,
        userId: null,
        name: null,
        userMessage: ''
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
          return;
        }
        if (new Date(expiryDate) <= new Date()) {
          this.logoutHandler();
          return;
        }
        const userId = localStorage.getItem('userId');
        const name = localStorage.getItem('name');
        const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({ isAuth: true, token: token, userId: userId, name: name });
        this.setAutoLogout(remainingMilliseconds);
    }
  
    logoutHandler = () => {
        this.props.history.replace('/');
        this.setState({ isAuth: false, token: null, userId: null, name: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    };

    setAutoLogout = milliseconds => {
        setTimeout(() => {
          this.logoutHandler();
        }, milliseconds);
    };

    loginHandler = async ({ name, password })=>{
        loginQuery.variables = { name: name, password: password  }
        opts.body = JSON.stringify(loginQuery)
        const res = await fetch(url, opts);
        const data = await res.json().catch(err => {
            console.log('eseste', err);
            // this.setState({
            //   isAuth: false,
            // });
        });
        if(data.errors){
           
            this.setState({userMessage: data.errors[0].message})
            
        } else{
            this.setState({
                isAuth: true,
                token: data.data.login.token,
                userId: data.data.login.userId,
                name: data.data.login.name,
                userMessage: ''
            });
            localStorage.setItem('token', data.data.login.token);
            localStorage.setItem('userId', data.data.login.userId);
            localStorage.setItem('name', data.data.login.name);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            this.setAutoLogout(remainingMilliseconds);
        }
    }

    renderHome = () =>{
        if(this.state.isAuth){ return (
            <App logoutHandler={this.logoutHandler} userId={this.state.userId} name={this.state.name}/>
        )}
        else{
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={ props => ( <Login {...props} userMessage={this.state.userMessage} loginHandler={this.loginHandler}/> )} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            )
        }
    }

    render(){
        return( 
            <Fragment>
                {this.renderHome()} 
            </Fragment>
        )
    }
}

export default withRouter(Auth);