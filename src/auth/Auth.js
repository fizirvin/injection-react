import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, withRouter } from 'react-router-dom';
import Login from './Login'
import NotFound from './NotFound'
import { loginQuery } from '../actions/queries';
import { url, opts } from '../actions/config/index';
import App from '../App.js'

class Auth extends Component {
    state ={
        isAuth: false,
        token: null,
        userId: null
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
        const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({ isAuth: true, token: token, userId: userId });
        this.setAutoLogout(remainingMilliseconds);
    }
  
    logoutHandler = () => {
        this.props.history.replace('/');
        this.setState({ isAuth: false, token: null, userId: null });
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
            console.log(err);
            // this.setState({
            //   isAuth: false,
            // });
        });
        if(data.errors){
            console.log(data.errors)
            this.setState({userMessage: 'error'})
        } else{
            this.setState({
                isAuth: true,
                token: data.data.login.token,
                userId: data.data.login.userId
            });
            localStorage.setItem('token', data.data.login.token);
            localStorage.setItem('userId', data.data.login.userId);
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
            <App logoutHandler={this.logoutHandler}/>
        )}
        else{
            return (
                <BrowserRouter>
                    <Route path="/" exact component={ props => ( <Login {...props} loginHandler={this.loginHandler}/> )} />
                    <Route component={NotFound} />
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