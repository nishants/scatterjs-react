import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Card, Col, Row, Button } from 'antd';

import {
    requestLogin,
    fetchWallet,
    logout,
    sendTokens
} from '../../scatter/scatter_actions';

import UserWallet from "../../components/user_wallet";
import SendTokens from "../../components/send_tokens";
import UserAccount from "../../components/user_account";

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
            shouldFetchWallet = props.scatter.loggedIn && !(hasWalletOrError || props.scatter.fetchingWallet);

        shouldFetchWallet && props.dispatch(fetchWallet());
        return null;
    }

    sendTokens = ({toAccount,amount,memo}) => {
        this.props.dispatch(sendTokens({toAccount,amount,memo}))
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
                <Row>
                    <Col span={24}>
                        <Card style={{margin: "10px"}} bordered={true}>
                            {loggedIn ? <Button htmlType="button" onClick={logOutUser}>Log out</Button> : <Button htmlType="button" onClick={loginUser}>Log in</Button>}
                        </Card>
                    </Col>
                </Row>

                {loggedIn && <>
                    <Row>
                        <Col span={24}>
                            <Card title="Account" style={{margin: "10px"}} bordered={true}>
                                <UserAccount userAccount={userAccount}/>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Wallet" style={{margin: "10px"}} bordered={true}>
                                {userWallet ? <UserWallet wallet={userWallet}/> : <div> Loading wallet </div>}
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
