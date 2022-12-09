const algosdk = require('algosdk');

//smart signature code template as string - generated using: python offer-sell-nft.py template -s -e \n
const offer_to_sell_nft_tmpl="#pragma version 5 \nglobal GroupSize \nint 3 \n== \ngtxn 0 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 1 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 2 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 0 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 1 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 2 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 0 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 1 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 2 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 0 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 0 Receiver \naddr TMPL_SELLER_ADDRESS \n!= \n&& \ngtxn 0 TypeEnum \nint pay \n== \n&& \ngtxn 0 Sender \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 0 Receiver \ngtxn 0 Receiver \n== \n&& \ngtxn 0 Amount \nint TMPL_INIT_FEE \n>= \n&& \ngtxn 0 CloseRemainderTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 TypeEnum \nint axfer \n== \n&& \ngtxn 1 Sender \ngtxn 0 Receiver \n== \n&& \ngtxn 1 AssetReceiver \ngtxn 0 Receiver \n== \n&& \ngtxn 1 AssetAmount \nint 0 \n== \n&& \ngtxn 1 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 1 AssetCloseTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 TypeEnum \nint axfer \n== \n&& \ngtxn 2 Sender \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 2 AssetReceiver \ngtxn 0 Receiver \n== \n&& \ngtxn 2 AssetAmount \nint 1 \n== \n&& \ngtxn 2 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 2 AssetCloseTo \nglobal ZeroAddress \n== \n&& \nbnz main_l6 \nglobal GroupSize \nint 3 \n== \ngtxn 0 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 1 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 2 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 0 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 1 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 2 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 0 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 1 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 2 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 0 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 Sender \naddr TMPL_SELLER_ADDRESS \n!= \n&& \ngtxn 0 TypeEnum \nint axfer \n== \n&& \ngtxn 0 Sender \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 0 AssetReceiver \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 0 AssetAmount \nint 0 \n== \n&& \ngtxn 0 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 0 AssetCloseTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 TypeEnum \nint axfer \n== \n&& \ngtxn 1 Sender \ngtxn 1 Sender \n== \n&& \ngtxn 1 AssetReceiver \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 1 AssetAmount \nint 1 \n== \n&& \ngtxn 1 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 1 AssetCloseTo \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 2 TypeEnum \nint pay \n== \n&& \ngtxn 2 Sender \ngtxn 1 Sender \n== \n&& \ngtxn 2 Receiver \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 2 Amount \nint 0 \n== \n&& \ngtxn 2 CloseRemainderTo \naddr TMPL_SELLER_ADDRESS \n== \n&& \nbnz main_l5 \nglobal GroupSize \nint 4 \n== \ngtxn 0 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 1 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 2 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 3 Fee \nglobal MinTxnFee \n== \n&& \ngtxn 0 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 1 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 2 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 3 AssetSender \nglobal ZeroAddress \n== \n&& \ngtxn 0 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 1 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 2 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 3 Lease \nglobal ZeroAddress \n== \n&& \ngtxn 0 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 3 RekeyTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 Sender \ngtxn 0 Sender \n!= \n&& \ngtxn 2 Sender \naddr TMPL_SELLER_ADDRESS \n!= \n&& \ngtxn 0 TypeEnum \nint pay \n== \n&& \ngtxn 0 Sender \ngtxn 0 Sender \n== \n&& \ngtxn 0 Receiver \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 0 Amount \nint TMPL_ASSET_PRICE \n== \n&& \ngtxn 0 CloseRemainderTo \nglobal ZeroAddress \n== \n&& \ngtxn 1 TypeEnum \nint axfer \n== \n&& \ngtxn 1 Sender \ngtxn 0 Sender \n== \n&& \ngtxn 1 AssetReceiver \ngtxn 0 Sender \n== \n&& \ngtxn 1 AssetAmount \nint 0 \n== \n&& \ngtxn 1 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 1 AssetCloseTo \nglobal ZeroAddress \n== \n&& \ngtxn 2 TypeEnum \nint axfer \n== \n&& \ngtxn 2 Sender \ngtxn 2 Sender \n== \n&& \ngtxn 2 AssetReceiver \ngtxn 0 Sender \n== \n&& \ngtxn 2 AssetAmount \nint 1 \n== \n&& \ngtxn 2 XferAsset \nint TMPL_ASSET_ID \n== \n&& \ngtxn 2 AssetCloseTo \ngtxn 0 Sender \n== \n&& \ngtxn 3 TypeEnum \nint pay \n== \n&& \ngtxn 3 Sender \ngtxn 2 Sender \n== \n&& \ngtxn 3 Receiver \naddr TMPL_SELLER_ADDRESS \n== \n&& \ngtxn 3 Amount \nint 0 \n== \n&& \ngtxn 3 CloseRemainderTo \naddr TMPL_SELLER_ADDRESS \n== \n&& \nbnz main_l4 \nerr \nmain_l4: \nint 1 \nreturn \nmain_l5: \nint 1 \nreturn \nmain_l6: \nint 1 \nreturn";

/*const get_algod_client = () => {
    // Setup HTTP client w/guest key provided by PureStake
    let algod_address = 'https://testnet-algorand.api.purestake.io/ps2';
    let algod_token = "";
    let headers = {
        "X-API-Key": "B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab",
    };
    let port = '';
    let algodclient = new algosdk.Algodv2(algod_token, algod_address, port, headers);
    return algodclient;
}*/

/*
    Returns an algosdk.Algodv2 conencted object to testnet
*/
const get_algod_client = () => {
    // Setup HTTP client w/guest key provided by PureStake
    const token = { 'X-API-key': 'EMgRQXIAN67gCYG9lGQB5aQJmokDqZqc2JM7zsgO' };
    const server = "https://testnet-algorand.api.purestake.io/ps2";
    const port = "";
    let algodclient = new algosdk.Algodv2(token, server, port);
    return algodclient;
}

/*
    Returns smart signature code corresponding to arguments passed

    *   seller_address: (string) seller's algorand public address 
    *   asset_id:       (int) asset index of NFT
    *   asset_price:    (int) asking price for the asset in uAlgos
    *   init_fee:       (int) network fees plus minimum holding amount to allow escrow to operate
*/
const get_offer_to_sell_nft_smart_sig = (
    seller_address,
    asset_id,
    asset_price,
    init_fee
) => {

    // create smart sign from template
    let temp = offer_to_sell_nft_tmpl.replaceAll("TMPL_SELLER_ADDRESS", seller_address);
    temp = temp.replaceAll("TMPL_ASSET_ID", asset_id);
    temp = temp.replaceAll("TMPL_ASSET_PRICE", asset_price);
    temp = temp.replaceAll("TMPL_INIT_FEE", init_fee);
    return temp;
};

/*
    Returns compiled smart signature code corresponding to arguments passed

    *   seller_address: (string) seller's algorand public address 
    *   asset_id:       (int) asset index of NFT
    *   asset_price:    (int) asking price for the asset in uAlgos
    *   init_fee:       (int) network fees plus minimum holding amount to allow escrow to operate
*/
const offer_to_sell_nft_smart_sig = async (
    algod_client,
    seller_address,
    asset_id,
    asset_price,
    init_fee
) => {

    // create smart sig from template
    let temp = get_offer_to_sell_nft_smart_sig(seller_address, asset_id, asset_price, init_fee);

    // Compile teal
    const results = await algod_client.compile(temp).do();

    const program = new Uint8Array(Buffer.from(results.result , "base64"));
    const lsig = new algosdk.LogicSigAccount(program);
    results.lsig=lsig;

    return results;
};

/*
    Returns lsig of smart signature code corresponding to arguments passed

    *   seller_address: (string) seller's algorand public address 
    *   asset_id:       (int) asset index of NFT
    *   asset_price:    (int) asking price for the asset in uAlgos
    *   init_fee:       (int) network fees plus minimum holding amount to allow escrow to operate
*/
const get_offer_to_sell_nft_lsig = async (
    algod_client,
    seller_address,
    asset_id,
    asset_price,
    init_fee
) => {
    let ret = await offer_to_sell_nft_smart_sig(algod_client, seller_address, asset_id, asset_price, init_fee);
    return ret.lsig;
}

const encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64');
}
const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString('ascii');
}
const base64ToUInt8Array = (data) => {
    return Buffer.from(data, 'base64');
}

/*
    Creates and submits signed transactions to the blockchain to offer an NFT for sale.

    The NFT is placed in escrow for acceptance by a buyer. To revoke the offer (prior to sale),
    use revoke_wallet_signed_offer_to_sell_nft.

    Arguments:

    *   algod_client: (object) valid connected algod client object, use get_algod_client() to get a testnet connection
    *   seller_pk: (string) seller's algorand secret key for the account identified by seller_address
    *   seller_address: (string) seller's algorand public address 
    *   asset_id: (int) asset index of NFT
    *   asset_price: (int) asking price for the asset in uAlgos
    *   init_fee: (int) network fees plus minimum holding amount to allow escrow to operate
    
    Returns: escrow address
*/
const create_offer_to_sell_nft = async (
    algod_client,
    seller_pk,
    seller_address,
    asset_id,
    asset_price,
    init_fee=202000
) => {

    let lsig = await get_offer_to_sell_nft_lsig(algod_client, seller_address, asset_id, asset_price, init_fee);
    let escrow_address = lsig.address();
    
    console.log("Escrow address = " + escrow_address);

    let params = await algod_client.getTransactionParams().do();

    let tx1 = algosdk.makePaymentTxnWithSuggestedParams(seller_address, escrow_address, init_fee, undefined, undefined, params);
    let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, escrow_address, undefined, undefined, 0, undefined, asset_id, params);
    let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(seller_address, escrow_address, undefined, undefined, 1, undefined, asset_id, params);

    let txns = [tx1, tx2, tx3];
    let txgroup = algosdk.assignGroupID(txns);

    // assume seller_pk_or_wallet is a encode64-ed string representing the seller's secret key
    let seller_sk = base64ToUInt8Array(seller_pk);
    let signed_tx1 = algosdk.signTransaction(tx1, seller_sk);
    let signed_tx2 = algosdk.signLogicSigTransactionObject(tx2, lsig);
    let signed_tx3 = algosdk.signTransaction(tx3, seller_sk);

    let signed = [];
    signed.push(signed_tx1.blob); // <-- must specify blob rather than whole map for algod v2 ... this isn't documented in algosdk!!!
    signed.push(signed_tx2.blob);
    signed.push(signed_tx3.blob);

    let tx = (await algod_client.sendRawTransaction(signed).do());
    console.log("Transaction : " + tx.txId);
    
    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

    return escrow_address;
}

/*
    Creates and submits signed transactions to the blockchain to revoke an offer of NFT sale.

    The NFT is transferred back from escrow to the seller.

    Arguments:

    *   algod_client: (object) valid connected algod client object, use get_algod_client() to get a testnet connection
    *   seller_pk: (string) seller's algorand secret key for the account identified by seller_address
    *   seller_address: (string) seller's algorand public address 
    *   asset_id: (int) asset index of NFT
    *   asset_price: (int) asking price for the asset in uAlgos
    *   init_fee: (int) network fees plus minimum holding amount to allow escrow to operate
*/
const revoke_offer_to_sell_nft = async (
    algod_client,
    seller_pk,
    seller_address,
    asset_id,
    asset_price,
    init_fee=202000
) => {

    //sks must be UInt8Array type - seller_pk provided as Base64 encoded string
    let seller_sk = base64ToUInt8Array(seller_pk);

    let lsig = await get_offer_to_sell_nft_lsig(algod_client, seller_address, asset_id, asset_price, init_fee);
    let escrow_address = lsig.address();
    
    console.log("Escrow address = " + escrow_address);

    let params = await algod_client.getTransactionParams().do();

    let tx1 = algosdk.makeAssetTransferTxnWithSuggestedParams(seller_address, seller_address, undefined, undefined, 0, undefined, asset_id, params);
    let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, seller_address, seller_address, undefined, 1, undefined, asset_id, params);
    let tx3 = algosdk.makePaymentTxnWithSuggestedParams(escrow_address, seller_address, 0, seller_address, undefined, params);

    let txns = [tx1, tx2, tx3];
    let txgroup = algosdk.assignGroupID(txns);

    let signed_tx2 = algosdk.signLogicSigTransactionObject(tx2, lsig);
    let signed_tx3 = algosdk.signLogicSigTransactionObject(tx3, lsig);

    let signed_tx1 = algosdk.signTransaction(tx1, seller_sk);

    let signed = [];
    signed.push(signed_tx1.blob); // <-- must specify blob rather than whole map for algod v2 ... this isn't documented in algosdk!!!
    signed.push(signed_tx2.blob);
    signed.push(signed_tx3.blob);

    let tx = (await algod_client.sendRawTransaction(signed).do());
    console.log("Transaction : " + tx.txId);
    
    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
}

/*
    Creates and submits signed transactions to the blockchain to accept an offer of NFT sale.

    The NFT is transferred from escrow to the buyer and funds transferred from the buyer to the seller.

    Arguments:

    *   algod_client: (object) valid connected algod client object, use get_algod_client() to get a testnet connection
    *   buyer_pk: (string) buyer's algorand secret key for the account identified by buyer_address
    *   buyer_address: (string) buyer's algorand public address 
    *   seller_address: (string) seller's algorand public address 
    *   asset_id: (int) asset index of NFT
    *   asset_price: (int) asking price for the asset in uAlgos
    *   init_fee: (int) network fees plus minimum holding amount to allow escrow to operate
*/
const accept_offer_to_sell_nft = async (
    algod_client,
    buyer_pk,
    buyer_address,
    seller_address,
    asset_id,
    asset_price,
    init_fee=202000
) => {

    //sks must be UInt8Array type - seller_pk provided as Base64 encoded string
    let buyer_sk = base64ToUInt8Array(buyer_pk);

    let lsig = await get_offer_to_sell_nft_lsig(algod_client, seller_address, asset_id, asset_price, init_fee);
    let escrow_address = lsig.address();
    
    console.log("Escrow address = " + escrow_address);

    let params = await algod_client.getTransactionParams().do();

    let tx1 = algosdk.makePaymentTxnWithSuggestedParams(buyer_address, seller_address, asset_price, undefined, undefined, params);
    let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(buyer_address, buyer_address, undefined, undefined, 0, undefined, asset_id, params);
    let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(escrow_address, buyer_address, buyer_address, undefined, 1, undefined, asset_id, params);
    let tx4 = algosdk.makePaymentTxnWithSuggestedParams(escrow_address, seller_address, 0, seller_address, undefined, params);

    let txns = [tx1, tx2, tx3, tx4];
    let txgroup = algosdk.assignGroupID(txns);

    let signed_tx3 = algosdk.signLogicSigTransactionObject(tx3, lsig);
    let signed_tx4 = algosdk.signLogicSigTransactionObject(tx4, lsig);

    let signed_tx1 = algosdk.signTransaction(tx1, buyer_sk);
    let signed_tx2 = algosdk.signTransaction(tx2, buyer_sk);    


    let signed = [];
    signed.push(signed_tx1.blob); // <-- must specify blob rather than whole map for algod v2 ... this isn't documented in algosdk!!!
    signed.push(signed_tx2.blob);
    signed.push(signed_tx3.blob);
    signed.push(signed_tx4.blob);

    let tx = (await algod_client.sendRawTransaction(signed).do());
    console.log("Transaction : " + tx.txId);
    
    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(algod_client, tx.txId, 4);

    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
}

/*
const test = (algod_client, wallet) => {
    if(!algod_client)
        algod_client = get_algod_client();
    accept_wallet_signed_offer_to_sell_nft(algod_client, wallet).then(() => {
    //create_wallet_signed_offer_to_sell_nft(algod_client, wallet).then(() => {
    //revoke_offer_to_sell_nft(algod_client).then(() => {
    //revoke_wallet_signed_offer_to_sell_nft(algod_client, wallet).then(() => {
    //accept_offer_to_sell_nft(algod_client).then(() => {
    }).catch(e => {
        const error = e.body && e.body.message ? e.body.message : e;
        console.log(error);
    });
}*/

exports.get_algod_client = get_algod_client;
exports.create_offer_to_sell_nft = create_offer_to_sell_nft; // <-- list nft for sale
exports.revoke_offer_to_sell_nft = revoke_offer_to_sell_nft; // <-- un-list nft for sale
exports.accept_offer_to_sell_nft = accept_offer_to_sell_nft; // <-- buy listed nft