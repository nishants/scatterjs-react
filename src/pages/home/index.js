import React, { Component } from 'react';
import {connect } from 'react-redux';

import {
    connectScatter
} from '../../components/scatter/scatter_actions';

import {
    login,
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

    logout = () => {
        // this.setState({loggedIn: false});
    };

    componentDidMount() {
        // this.connectWithScatter().then(this.loginUser);
    }

    connectWithScatter = () => {
        this.props.dispatch(connectScatter());

        // this.setState({connectingScatter: true});
        // return connect('React-Scatter').then(() => {
        //     this.setState({
        //         connectingScatter: false,
        //         scatterConnected: true
        //     });
        // }).catch(error => alert(error.message));
    };

    loginUser = () => {
        this.setState({requestedAuth: true});
        login().then(({name, publicKey, authority}) => {
            this.setState({
                requestedAuth: false,
                loggedIn: true,
                userAccount: {name, publicKey, keyType: authority,}
            });
            this.getWallet();
        }).catch(error => alert(error.message));
    };

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
        const {connected: scatterConnected, userAccount, loggedIn} = this.props.scatter;

        const {
            connectingScatter,
            userWallet
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
                        <p>{JSON.stringify(userWallet)}</p>
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

const mapStateToProps = ({scatter}) => {
    return {
        scatter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
