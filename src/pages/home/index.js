import React, { Component } from 'react';
import {connect } from 'react-redux';

import {
    requestLogin,
} from '../../components/scatter/scatter_actions';

import {
    sendTokens,
    getWallet
} from '../../components/scatter/scatter_helper';

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
            },
            userWallet: {}
        };

    };


    loginUser = () => this.props.dispatch(requestLogin());

    sendTokens = () => {
        this.setState({requestedTransaction: true});
        sendTokens({
            toAccount :'lioninjungle',
            amount : '1.0000 EOS',
            memo: 'sending tokens for fun'
        }).then(() => {
            this.setState({requestedTransaction: false});
        }).catch(error => console.log(error.message));
    };

    getWallet = () => {
        getWallet().then(userWallet => {
            this.setState({userWallet})
        }).catch(error => console.error(error));
    };

    render(){
        const { userAccount, loggedIn} = this.props.scatter;

        const {
            userWallet
        } = this.state;

        const {
            loginUser,
            sendTokens,
        } = this;

        return (
            <div id="homepage"><>
                <label>{`Conenected with scatter : `}</label>
                <br/>
                <label><a href="/#" onClick={loginUser}>Log in</a></label>
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
                    <p>{JSON.stringify(userWallet)}</p>
                </>}
                <br/>
                <button onClick={sendTokens}>Send Tokens</button>
            </></div>
        );
    }
}

const mapStateToProps = ({scatter}) => {
    return {
        scatter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
