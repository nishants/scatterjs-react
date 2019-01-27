import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Card, Col, Row } from 'antd';

import {
    requestLogin,
    getWallet,
    logout
} from '../../scatter/scatter_actions';

import {
    sendTokens,
} from '../../scatter/scatter_helper';

import UserWallet from "../../components/user_wallet";
import SendTokens from "../../components/send_tokens";

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

    static getDerivedStateFromProps(props){
        const
            hasWalletOrError = props.scatter.userWallet || props.scatter.walletError,
            fetchWallet = props.scatter.loggedIn && !(hasWalletOrError || props.scatter.fetchingWallet);

        fetchWallet && props.dispatch(getWallet());
        return null;
    }

    sendTokens = ({toAccount,amount,memo}) => {
        this.setState({requestedTransaction: true});
        sendTokens({toAccount,amount,memo}).then(() => {
            this.setState({requestedTransaction: false});
        }).catch(error => console.log(error.message));
    };

    logOutUser = ()=> this.props.dispatch(logout());

    render(){
        const { userAccount, loggedIn, userWallet} = this.props.scatter;

        const {
            loginUser,
            sendTokens,
            logOutUser
        } = this;

        return (
            <div id="homepage"><>
                <label>{`Conenected with scatter : `}</label>
                <br/>
                {loggedIn || <label><a href="/#" onClick={loginUser}>Log in</a></label>}
                <br/>
                {loggedIn && <>
                    <label><a href="/#" onClick={logOutUser}>Log out</a></label>
                    <div>
                        <label>Account name : </label>
                        <span>{userAccount.name}</span>
                    </div>
                    <div>
                        <label>Public key : </label>
                        <span>[{userAccount.keyType}] {userAccount.publicKey} </span>
                    </div>

                    <Row>
                        <Col span={12}>
                            <Card title="Wallet" style={{margin: "10px"}} bordered={true}>
                                <UserWallet wallet={userWallet}/>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Transfer tokens" bordered={true} style={{margin: "10px"}}>
                                <SendTokens onSend={sendTokens}/>
                            </Card>
                        </Col>
                    </Row>

                </>}
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
