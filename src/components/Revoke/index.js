import React from "react";

// Import authentication methods
//import MyAlgoConnect from "@randlabs/myalgo-connect";
//import algosdk from "algosdk"
import { wallet, addresses } from "../Connect/index.js"; 
import { get_algod_client, revoke_offer_to_sell_nft } from "../../Utils/wallet-signed-offer-sell-nft.js";

export const RevokeButton = () => {
  // Javascript code here ---->

  //  Click button method
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let algodClient = get_algod_client();
      let nftid = parseInt(document.getElementById("nft-id").value);//146027129;
      let price = parseInt(document.getElementById("nft-price").value);//100;
      let seller = addresses[0];
      let escrow = await revoke_offer_to_sell_nft(
        algodClient,
        wallet,
        seller,
        nftid,
        price
      );
      console.log(`Escrow ${escrow} returned nft ${nftid} to ${seller}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Html stuff ---->
  return (
    <button onClick={(e) => handleClick(e)}>
      <h3>Revoke sale</h3>
    </button>
  );
};
