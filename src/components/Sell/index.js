import React from "react";

// Import authentication methods
//import MyAlgoConnect from "@randlabs/myalgo-connect";
//import algosdk from "algosdk"
import { wallet, addresses } from "../Connect/index.js"; 
import { get_algod_client, create_offer_to_sell_nft } from "../../Utils/wallet-signed-offer-sell-nft.js";


export const SellButton = () => {
  // Javascript code here ---->

  //  Click button method
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      document.getElementById("seller-address").value=addresses[0];
      let algodClient = get_algod_client();
      let nftid = parseInt(document.getElementById("nft-id").value);//146027129;
      let price = parseInt(document.getElementById("nft-price").value);//100;
      let seller = addresses[0];
      let escrow = await create_offer_to_sell_nft(
        algodClient,
        wallet,
        seller,
        nftid,
        price
      );
      console.log(`Escrow ${escrow} now holds nft ${nftid} owned by ${seller} selling for ${price} uAlgos`);
    } catch (err) {
      console.error(err);
    }
  };

  // Html stuff ---->
  return (
    <button onClick={(e) => handleClick(e)}>
      <h3>Offer NFT for sale</h3>
    </button>
  );
};
