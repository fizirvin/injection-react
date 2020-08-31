import React, { Component, Fragment } from 'react';
import {BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';

import detect from 'detect.js'

import Login from './Login'
import NotFound from './NotFound'
import NotSupported from './NotSupported'

import loginQuery from './queries';

import { url, opts } from '../config/index';

import App from '../App.js'

import reducers from '../reducers'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const store = createStore(reducers, applyMiddleware(thunk))
const w = parseInt(document.documentElement.clientWidth)

// const mob = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)



const mob = detect.parse(navigator.userAgent)
const detectDevice = () =>{
    return mob.device.type === 'Mobile' || mob.device.family === 'iPhone' || mob.os.family === 'Linux' || mob.os.family === "iOS" || mob.os.family === 'Android' || w < 700 ?  true: false
}

const isMobile = detectDevice()

class Auth extends Component {
    state ={
        isAuth: false,
        token: null,
        userId: null,
        name: null,
        userMessage: '',
        loading: false
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
        this.setState({loading: true})
        const res = await fetch(url, opts);
        const data = await res.json().catch(err => {
            console.log('eseste', err);
            // this.setState({
            //   isAuth: false,
            // });
        });
        if(data.errors){
           
            this.setState({userMessage: data.errors[0].message, loading: false})
            
        } else{
            this.setState({
                isAuth: true,
                token: data.data.login.token,
                userId: data.data.login.userId,
                name: data.data.login.name,
                userMessage: '',
                loading: false
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
            <Provider store={store}>
                <App logoutHandler={this.logoutHandler} userId={this.state.userId} name={this.state.name}/>
            </Provider>
        )}
        else{
            if(isMobile){ return <NotSupported></NotSupported> }
            else{
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={ props => ( <Login {...props} userMessage={this.state.userMessage} loading={this.state.loading} loginHandler={this.loginHandler}/> )} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            )
            }
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