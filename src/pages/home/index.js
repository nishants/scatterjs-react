import React, { Component } from 'react';

import {
    connect,
    transact
} from '../../utils/ScatterUtils';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            requestedAuth: false,
            loggedIn: false,
            requestedTransaction: false
        }
    }

    logout = () => {
        this.setState({loggedIn: false});
    };

    login = () => {
        this.setState({requestedAuth: true});
        connect('React-Scatter').then(() => {
            this.setState({
                requestedAuth: false,
                loggedIn: true
            });
        }).catch(error => alert(error.message));
    };

    sendTokens = () => {
        this.setState({requestedTransaction: true});
        transact().then(() => {
            this.setState({requestedTransaction: false});
        });
    };

    render(){
        const {
            requestedAuth,
            loggedIn
        } = this.state;

        return (
            <div id="homepage">
                {loggedIn || <a href="#" onClick={this.login}>Login</a>}
                {loggedIn && <>
                    <label>{`Logged in as user : `}</label>
                    <label><a href="#" onClick={this.logout}>Log out</a></label>
                    <button onClick={this.sendTokens}>Send money</button>
                </>}

                <p>

                </p>
            </div>
        );
    }
}

export default Home;
