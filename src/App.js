import { ConnectButton } from "./components/Connect";
import { SellButton } from "./components/Sell";
import { RevokeButton } from "./components/Revoke";
import { BuyButton } from "./components/Buy";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <br />
      <br />      
      <ConnectButton />
      <br />
      <br />
      <label>
        Wallet address: 
      </label>
      <label id="wallet-address">
      </label>
      <br />
      <br />      
      <label>
        NFT ID:
        <input type="text" name="nftid" id="nft-id" />
      </label>
      <br />
      <br />
      <label>
        Asking price (uAlgos):
        <input type="text" name="price" id="nft-price" defaultValue="100"/>
      </label>      
      <br />
      <br />      
      <SellButton />
      <br />
      <br />
      <RevokeButton />
      <br />
      <br />
      <BuyButton />  
      <br />
      <br />      
      <label>
        Seller's address:
        <input type="text" name="seller" id="seller-address" defaultValue="" />
      </label>    
    </div>
  );
}

export default App;
