import React, {Component} from 'react';

class SendTokens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toAccount : '',
            amount    : '',
            memo      : ''
         };
    }

    inputChangeHandler = (e) => {
        console.log(e.target);
        this.setState({[e.target.name]: e.target.value})
    };

    submitForm = (e) => {
        e.preventDefault();
        const {toAccount, amount, memo} = this.state;
        this.props.onSend({toAccount, amount, memo});
    };

    render(){
        const {toAccount, amount, memo} = this.state;
        const {submitForm} = this;
        return (
            <form onSubmit={submitForm}>
                <input name="toAccount" value={toAccount} placeholder="toAccount" onChange={this.inputChangeHandler}/>
                <input type="number" name="amount" placeholder="amount"value={amount} onChange={this.inputChangeHandler}/>
                <input name="memo" value={memo} placeholder="memo" onChange={this.inputChangeHandler}/>
                <button >Send Tokens</button>
            </form>
        );
    }

}

export default SendTokens;