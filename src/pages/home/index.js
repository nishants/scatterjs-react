import React, { Component } from 'react';

import {
    connect,
    login,
    transact
} from '../../utils/ScatterUtils';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            scatterConnected: false,
            requestedAuth: false,
            connectingScatter: false,
            requestedTransaction: false,
            connectedNetworkName: null,

            // account details
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            }
        };
    }

    logout = () => {
        // this.setState({loggedIn: false});
    };

    connectWithScatter = () => {
        this.setState({connectingScatter: true});
        connect('React-Scatter').then(() => {
            this.setState({
                connectingScatter: false,
                scatterConnected: true
            });
        }).catch(error => alert(error.message));
    };

    loginUser = () => {
        this.setState({requestedAuth: true});
        login().then(({name, publicKey, authority}) => {
            this.setState({
                requestedAuth: false,
                loggedIn: true,
                userAccount: {name, publicKey, keyType: authority,}
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
            connectingScatter,
            scatterConnected,

            loggedIn,
            userAccount
        } = this.state;

        const {
            connectWithScatter,
            loginUser,
            sendTokens,
            logout
        } = this;

        return (
            <div id="homepage">
                {scatterConnected || <a href="#" onClick={connectWithScatter}>Connect to scatter</a>}
                {scatterConnected && <>
                    <label>{`Conenected with scatter : `}</label>
                    <br/>
                    <label><a href="#" onClick={loginUser}>Log in</a></label>
                    <br/>
                    {loggedIn && <>
                        <div>
                            <label>Account name : </label>
                            <span>{userAccount.name}</span>
                        </div>
                        <div>
                            <label>Public key : </label>
                            <span>[{userAccount.keyType}] {userAccount.publicKey} </span>
                        </div>
                    </>}
                    <br/>
                    <button onClick={sendTokens}>Send Tokens</button>
                </>}

                <p>

                </p>
            </div>
        );
    }
}

export default Home;
