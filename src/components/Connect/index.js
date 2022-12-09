import React from "react";

// Import authentication methods
import MyAlgoConnect from "@randlabs/myalgo-connect";

export var wallet;
export var addresses;

export const ConnectButton = () => {
  // Connect algo method
  const connectAlgoWallet = async () => {
    const myAlgoWallet = new MyAlgoConnect();
    try {
      const accounts = await myAlgoWallet.connect();
      addresses = accounts.map((account) => account.address);
      wallet = myAlgoWallet;
      document.getElementById("wallet-address").innerText=addresses[0];
      return { addresses: addresses };
    } catch (err) {
      console.error(err);
    }
  };

  //  Click button method
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await connectAlgoWallet();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={(e) => handleClick(e)}>
      <h3>Connect Wallet</h3>
    </button>
  );
};
