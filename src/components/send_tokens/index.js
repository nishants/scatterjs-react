import React from 'react';

const SendTokens = ({onSend}) => (
    <button onClick={() => onSend({
        toAccount :'lioninjungle',
        amount : '1.0000 EOS',
        memo: 'sending tokens for fun'
    })}>Send Tokens</button>
);

export default SendTokens;