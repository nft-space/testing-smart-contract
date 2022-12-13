# Hello World

To allow you, the reader, to see the smart contract code in action on TESTNET a small React 'Hello World' test project is provided.

## Installing the project

To install this you will need **nodejs** installed with **npm** (see https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Then `git clone` this project. Navigate to the root folder and `npm install` followed by `npm start` which will start the React server.

You can then browse to `http://localhost:3000/`

You will need a MyAlgo wallet which - if you don't already have one - you can create at https://wallet.myalgo.com, You will need some TESTNET algos as 'gas' for the network which you can get at https://testnet.algoexplorer.io/dispenser, 
and also a dummy asset which you can also create on testnet at https://app.algodesk.io/#/login after logging in with your wallet.

## Using the test project

The project is simply to demonstrate using the smart contract to offer an asset for sale, revoke the offer and accept the offer by buying the asset.  

To see the smart contract in action simply click the 'connect' button which will pop-up a MyAlgo window to invite you to connect your wallet (you might have to enable pop-ups for the site in your browser).  

Press F12 to bring up your browser development tools and watch the console output.

To offer your test NFT for sale enter your dummy NFT's id in the 'NFT ID' text box, and a price in the next text box, and click on 'Offer NFT for sale', this will again pop up a MyAlgo wallet window to allow you to check the transactions for signing. When you sign these your NFT will be placed in an escrow account, the escrows account's address is output in the console. You can navigate to this address using https://testnet.algoexplorer.io/ and verify that your NFT is indeed an asset owned by the escrow account.  

You can revoke the offer by then clicking on 'Revoke sale', this will ask you to sign a transaction returning the NFT to your account. You can check this by again using https://testnet.algoexplorer.io/ and entering your account's address.

If you offer the NFT for sale again (by clicking on 'Offer NFT for sale'), you can then buy it back from the escrow by clicking on 'Buy NFT'. This will effectively pay yourself and return the NFT to your account, this is again just to demonstrate the smart contract in action.  

Alternatively, you can connect a different account by clicking 'Connect' and choosing a different account if you have one in your wallet, and then buy the NFT with that other account (as long as the seller's address, asking price and NFT ID are as they were when you clicked 'Offer NFT for sale' then you will reference the correct smart contract).

After signing the transactions the smart contract executes and examines all the transactions in the group and verifies that they comply to its rules, this ensures that once your NFT is offered for sale only you can revoke it, and it can only be bought by paying you the asking price. No-one can therefore steal your NFT or buy it for less than you asked for, and until someone buys it you can always revoke the sale. If a purchase fails for any reason the NFT will remain in the escrow account. 

Note that the smart contract generates a different escrow for each combination of seller, asking price, and nft-id.

# Smart Contract
Algorand Smart Contract (ASC1) provides both smart contracts and smart signatures. Please refer to Algorand's documentation (https://developer.algorand.org/docs/) for detailed information on interacting with smart contracts and issuing transactions to the blockchain. This tutorial is for guidance on using the smart signatures described below and doesn't go into detail on the mechanics of the Algorand SDKs or APIs.  

You may refer to `\src\Utils\wallet-signed-offer-sell-nft.js` which includes the code outlined below and is used by the Hello World test app to effectuate all blockchain code, this can be used directly in your own projects if required.


## TEAL code

The smart contract code itself is available as `template.teal` in the root folder of the project. This is templated TEAL code which needs 'de-templating' by replacing the `TMPL_` indentifiers with the appropriate values uniquely identifying the contract.  

This can be done for example by reading the code into a string and doing a string replacement for each template value, for example in JavaScript:

```
const smart_sig_teal = "..."; // <-- read teal into this string or copy it in (remembering to convert newlines) 

let seller_address = "..."; // <-- put seller's address here
let asset_id = 123456789; // <-- put correct asset id here
let asset_price = 10000000; // <-- price here
let init_fee = 202000 //<-- enough retained algos and gas for escrow to operate 

let temp = smart_sig_teal.replaceAll("TMPL_SELLER_ADDRESS", seller_address);
 temp = temp.replaceAll("TMPL_ASSET_ID", asset_id);
 temp = temp.replaceAll("TMPL_ASSET_PRICE", asset_price);
 temp = temp.replaceAll("TMPL_INIT_FEE", init_fee);

// temp is now ready for compilation
```

## Compiling TEAL code

To compile the TEAL code for use in smart signing it needs to be turned into a logic signature

```
const algosdk = require('algosdk');
const results = await algod_client.compile(temp).do();
const program = new Uint8Array(Buffer.from(results.result , "base64"));
const lsig = new algosdk.LogicSigAccount(program);

// lsig can now be used to sign transactions
```

## Smart Contract Logic

This section explains the smart contract logic.  

The smart contract TEAL code verifies that the transactions sent to the blockchain are one of 3 sets: 3 transactions constituting an offer of sale, or 3 transactions revoking the offer or 4 transactions buying the NFT for the asking price.

### Offer for sale
If the set of transactions is an offer for sale then the smart contract checks that the following are true: there must be exactly 3 transactions in the group such that:

#### Transaction 1
The escrow is not the seller account.  
The transaction type is a payment type.  
The escrow account is the receiver of the payment.  
The amount of algos placed in escrow is sufficient.  
No funds are closed to any other account.

#### Transaction 2
The transaction type is an asset transfer.  
From the escrow to itself.  
Exactly 0 assets. (thus opting into the asset)  
The asset id is correct. 
No assets are closed to any other account.

#### Transaction 3
The transaction type is an asset transfer.  
From the sellers account to the escrow. 
Exactly one asset.  
The asset id is correct. 
No assets are closed to any other account. 

### Revoking offer
If the set of transactions is the revoking of the offer for sale then the smart contract checks that the following are true: there must be exactly 3 transactions in the group such that:

#### Transaction 1
The escrow is not the seller account. 
The transaction type is an asset transfer. 
From the seller to the seller.  
Exactly 0 assets. (thus opting the seller into the asset) 
The asset id is correct. 
No assets are closed to any other account. 

#### Transaction 2
The transaction type is an asset transfer. 
From the escrow to the seller.  
Exactly 1 asset. 
The asset id is correct. 
Assets are closed to the seller. 

#### Transaction 3
The transaction type is a payment type.  
The escrow account is the sender of the payment.  
The seller account is the receiver of the payment.  
The amount of algos sent is 0 but...  
All funds are closed to the seller (thus effectively reimbursing them). 

### Buying the NFT
If the set of transactions is the acceptance of the offer for sale then the smart contract checks that the following are true: there must be exactly 4 transactions in the group such that:

#### Transaction 1
The transaction type is a payment type.  
The buyer and seller are distinct from the escrow 
The buyer's account is the transaction issuer 
the buyer's account is the sender of the payment.   
The seller account is the receiver of the payment.  
The amount sent is the asking price. 
No funds are closed to any other account.

#### Transaction 2
The transaction type is an asset transfer. 
From the buyer to the buyer.  
Of exactly 0 assets.   
Of the correct asset id. 
No assets are closed to any other account. 

#### Transaction 3
The transaction type is an asset transfer. 
From the escrow to the buyer.  
Of exactly 1 assets.   
Of the correct asset id. 
Assets are closed to the buyer.

#### Transaction 4
The transaction type is a payment type.  
The escrow account is the sender of the payment.  
The seller account is the receiver of the payment.  
The amount of algos sent is 0 but...  
All funds are closed to the seller (thus effectively reimbursing them). 

## Connecting a MyAlgo wallet

Assuming you have a connected MyAlgo wallet object (https://github.com/randlabs/myalgo-connect#Documentation) you can create and sign transactions required to invoke the smart contract to offer an NFT for sale:

```
import MyAlgoConnect from "@randlabs/myalgo-connect";
const myAlgoWallet = new MyAlgoConnect();
var addresses;
try {
  const accounts = await myAlgoWallet.connect();
  addresses = accounts.map((account) => account.address);
} catch (err) {
  console.error(err);
}

// myAlgoWallet can be used to sign transactions now


```

## Algod client

You also need a connection to the Algorand blockchain. You can get your Purestake API key following this [tutorial](https://developer.algorand.org/tutorials/getting-started-purestake-api-service/)

```
// Setup HTTP client w/guest key provided by PureStake
const token = { 'X-API-key': 'EMgRQXIAN67gCYG9lGQB5aQJmokDqZqc2JM7zsgO' }; // <-- your api key here
const server = "https://testnet-algorand.api.purestake.io/ps2"; // <-- testnet or mainnet
const port = "";
let algod_client = new algosdk.Algodv2(token, server, port);

// algod_client can now be used to submit transactions etc.
```

## Offering an NFT for sale

To offer an NFT for sale with the smart contract you need to create 3 transactions, one signed by the smart contract and the other 2 by the seller's wallet.

```
// escrow address can be obtained from the lsig
let escrow_address = lsig.address();

// get transaction parameter defaults 
let params = await algod_client.getTransactionParams().do();

// one transaction populating the escrow with funds and gas - from the seller's account
let tx1 = algosdk.makePaymentTxnWithSuggestedParams(seller_address, escrow_address, init_fee, undefined, undefined, params);

// one transaction for the escrow to opt into the asset
let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, escrow_address, undefined, undefined, 0, undefined, asset_id, params);

// one transaction  to send the asset to the escrow from the seller
let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(seller_address, escrow_address, undefined, undefined, 1, undefined, asset_id, params);

// group the transactions
let txns = [tx1, tx2, tx3];
let txgroup = algosdk.assignGroupID(txns);
```

These transactions are ready to sign:

```
// sign the transaction from the escrow with the lsig
let signed_tx2 = algosdk.signLogicSigTransactionObject(tx2, lsig);    

// sign the transactions from the seller with the seller's wallet
let [signed_tx1, signed_tx3] = (await myAlgoWallet.signTransaction([tx1.toByte(), tx3.toByte()]));

```

The transactions are now ready to submit to the blockchain:

```
// create array of signed transactions
let signed = [];
signed.push(signed_tx1.blob); 
signed.push(signed_tx2.blob);
signed.push(signed_tx3.blob);

// submit group of transactions to the blockchain
let tx = (await algod_client.sendRawTransaction(signed).do());
console.log("Transaction : " + tx.txId);

// Wait for transaction to be confirmed
let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

//Get the completed Transaction
console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
```
 
 ## Revoking an NFT sale offer
 
 To undo/revoke the offer of sale (before anyone buys it) you need 3 transactions: one opting the seller into the asset, one passing the asset from the escrow back to the seller and one refunding the seller any holding algos placed in the escrow.
 
 ```
// escrow address can be obtained from the lsig
let escrow_address = lsig.address();

// get transaction parameter defaults 
let params = await algod_client.getTransactionParams().do();

// opt in seller to asset
let tx1 = algosdk.makeAssetTransferTxnWithSuggestedParams(seller_address, seller_address, undefined, undefined, 0, undefined, asset_id, params);

// transfer asset from escrow to seller
let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, seller_address, seller_address, undefined, 1, undefined, asset_id, params);

// return residual funds to seller from escrow
let tx3 = algosdk.makePaymentTxnWithSuggestedParams(escrow_address, seller_address, 0, seller_address, undefined, params);

// group the transactions
let txns = [tx1, tx2, tx3];
let txgroup = algosdk.assignGroupID(txns);
```

These transactions are ready to sign:

```
// smart signature signs the ones originating from the escrow
let signed_tx2 = algosdk.signLogicSigTransactionObject(tx2, lsig);
let signed_tx3 = algosdk.signLogicSigTransactionObject(tx3, lsig);

// wallet signs the opt-in transaction 
let signed_tx1 = (await myAlgoWallet.signTransaction(tx1.toByte()));
```

The transactions are now ready to submit to the blockchain:

```
let signed = [];
signed.push(signed_tx1.blob); 
signed.push(signed_tx2.blob);
signed.push(signed_tx3.blob);

// submit group of transactions to the blockchain
let tx = (await algod_client.sendRawTransaction(signed).do());
console.log("Transaction : " + tx.txId);

// Wait for transaction to be confirmed
let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

//Get the completed Transaction
console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
```

## Buying an NFT

To buy an NFT offered up for sale, 4 transactions are required: buyer pays seller, buyer opts into the asset, escrow transfers asset to the buyer and finally escrow refunds any remaining funds to the seller:

```
// escrow address can be obtained from the lsig
let escrow_address = lsig.address();

// get transaction parameter defaults 
let params = await algod_client.getTransactionParams().do();

// buyer pays seller
let tx1 = algosdk.makePaymentTxnWithSuggestedParams(buyer_address, seller_address, asset_price, undefined, undefined, params);

// buyer opts into asset
let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(buyer_address, buyer_address, undefined, undefined, 0, undefined, asset_id, params);

// escrow passes asset to buyer
let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, buyer_address, buyer_address, undefined, 1, undefined, asset_id, params);

// escrow refunds residual funds to seller
let tx4 = algosdk.makePaymentTxnWithSuggestedParams(escrow_address, seller_address, 0, seller_address, undefined, params);

// group the transactions
let txns = [tx1, tx2, tx3, tx4];
let txgroup = algosdk.assignGroupID(txns);
```

These transactions are ready to sign:

```
// escrow transcations signed by lsig
let signed_tx3 = algosdk.signLogicSigTransactionObject(tx3, lsig);
let signed_tx4 = algosdk.signLogicSigTransactionObject(tx4, lsig);

// sign 2 transactions at once with the wallet
let [signed_tx1, signed_tx2] = await myAlgoWallet.signTransaction([tx1.toByte(), tx2.toByte()]);
```

The transactions are now ready to submit to the blockchain:

```
let signed = [];
signed.push(signed_tx1.blob); 
signed.push(signed_tx2.blob);
signed.push(signed_tx3.blob);
signed.push(signed_tx4.blob);

// submit group of transactions to the blockchain
let tx = (await algod_client.sendRawTransaction(signed).do());
console.log("Transaction : " + tx.txId);

// Wait for transaction to be confirmed
let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

//Get the completed Transaction
console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
```

You have now exercised all 3 operations accepted by the smart signature.
