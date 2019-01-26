import React, { Component } from 'react';

import {
    connect,
    transact
} from '../../utils/ScatterUtils';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            eosSettings: null
        }
    }

    loginUser = () => {
        connect('React-Scatter').then(() => {
            console.log("scatter intialized");
            transact();
        });
    };

    render(){
        return (
            <div id="homepage">
                <a href="#" onClick={this.loginUser}>Login</a>
            </div>
        );
    }
}

export default Home;
