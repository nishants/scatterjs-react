import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

// initialized when connect is inovked
let
    scatter = null,
    userAccount = null,
    userEosConnection = null;

ScatterJS.plugins( new ScatterEOS() );

const network = {
    blockchain:'eos',
    chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host:'jungle.eosmetal.io',
    port:18888,
    protocol:'http'
};

export const connect = appName => (new Promise((resolve, reject)=> {
    ScatterJS.scatter.connect(appName).then(connected => {
        const
            onSuccess = () => {
                scatter = ScatterJS.scatter;
                resolve();
            },
            onError = () => reject({
                message: "Scatter not found. Please install and unlock scatter"
            });

        connected ? onSuccess() : onError();
    });
}));

export const login = ()=> {
    // Can have more required fields like firstname, lastname, address
    const requiredFields = { accounts:[network] };
    return scatter.getIdentity(requiredFields).then(() => {
        userAccount = scatter.identity.accounts.find(x => x.blockchain === 'eos');

        // Set expiration time for eos connection, can have more options
        const eosOptions = { expireInSeconds: 60 };
        userEosConnection = scatter.eos(network, Eos, eosOptions);
        console.log(userAccount);
        return {
            name: userAccount.name,
            authority: userAccount.authority,
            publicKey: userAccount.publicKey
        };
    });
};

export const transact = () => {
    const requiredFields = { accounts:[network] };
    scatter.getIdentity(requiredFields).then(() => {
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        const eosOptions = { expireInSeconds:60 };

        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        const eos = scatter.eos(network, Eos, eosOptions);

        // ----------------------------
        // Now that we have an identity,
        // an EOSIO account, and a reference
        // to an eosjs object we can send a transaction.
        // ----------------------------


        // Never assume the account's permission/authority. Always take it from the returned account.
        const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

        eos.transfer(account.name, 'lioninjungle', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
            // That's it!
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }).catch(error => {
            console.error(error);
        });

    }).catch(error => {
        // The user rejected this request, or doesn't have the appropriate requirements.
        console.error(error);
    });
}

// ScatterJS.scatter.connect(appName).then(connected => {
//
//     // If the user does not have Scatter or it is Locked or Closed this will return false;
//     if(!connected) return false;
//
//     const scatter = ScatterJS.scatter;
//
//     // Now we need to get an identity from the user.
//     // We're also going to require an account that is connected to the network we're using.
//     const requiredFields = { accounts:[network] };
//     scatter.getIdentity(requiredFields).then(() => {
//
//         // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
//         // the user for their account name beforehand. They could still give you a different account.
//         const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
//
//         // You can pass in any additional options you want into the eosjs reference.
//         const eosOptions = { expireInSeconds:60 };
//
//         // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
//         const eos = scatter.eos(network, Eos, eosOptions);
//
//         // ----------------------------
//         // Now that we have an identity,
//         // an EOSIO account, and a reference
//         // to an eosjs object we can send a transaction.
//         // ----------------------------
//
//
//         // Never assume the account's permission/authority. Always take it from the returned account.
//         const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
//
//         eos.transfer(account.name, 'lioninjungle', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
//             // That's it!
//             console.log(`Transaction ID: ${trx.transaction_id}`);
//         }).catch(error => {
//             console.error(error);
//         });
//
//     }).catch(error => {
//         // The user rejected this request, or doesn't have the appropriate requirements.
//         console.error(error);
//     });
// });

export const  loginUserWithScatter =  () => (new Promise(async (resolve, reject) => {
    // console.log(Object.keys(scatter));
    // console.log("scatter",scatter);
    // // console.log(Object.keys(scatter));
    // await scatter.login();
    // return scatter.eos(network, ScatterEOS);
}));