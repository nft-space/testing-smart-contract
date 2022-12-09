import React from "react";

// Import authentication methods
//import MyAlgoConnect from "@randlabs/myalgo-connect";
//import algosdk from "algosdk"
import { wallet, addresses } from "../Connect/index.js"; 
import { get_algod_client, accept_offer_to_sell_nft } from "../../Utils/wallet-signed-offer-sell-nft.js";

export const BuyButton = () => {
  // Javascript code here ---->

  //  Click button method
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let algodClient = get_algod_client();
      let nftid = parseInt(document.getElementById("nft-id").value);//146027129;
      let price = parseInt(document.getElementById("nft-price").value);//100;
      let seller = document.getElementById("seller-address").value;
      let buyer = addresses[0];
      let escrow = await accept_offer_to_sell_nft(
        algodClient,
        wallet,
        buyer,
        seller,
        nftid,
        price
      );
      console.log(`Escrow ${escrow} transferred ${nftid} to ${buyer}, ${seller} was paid ${price} uAlgos`);
    } catch (err) {
      console.error(err);
    }
  };

  // Html stuff ---->
  return (
    <button onClick={(e) => handleClick(e)}>
      <h3>Buy NFT</h3>
    </button>
  );
};
