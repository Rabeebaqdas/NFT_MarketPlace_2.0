import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home.js'
import Create from './MintNFT.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './My NFTs.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import './App.css';
const { ethereum } = window;


function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  window.ethereum && ethereum.on("accountsChanged", async (account) => {
    setAccount(account[0]);
    window.location.reload()
  })

  const changeNetwork = async () => {
    try {
      setLoading(true)
      if (!ethereum) throw new Error("No crypto wallet found");
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
        // chainId: "0x539"
          chainId: "0x5"
        }]
      });
      await web3Handler();
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err.message);
    }
  };
  window.ethereum && ethereum.on("chainChanged", async () => {
    window.location.reload();
  });

  const checkIsWalletConnected = async () => {  
    try {
      if (!ethereum) return alert("please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
        console.log("Account", accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
        loadContracts(signer)
      } else {
        console.log("No account Found");
      }
    } catch (err) {

      throw new Error("No ethereum Object");
    }
  }

  useEffect(() => {
    checkIsWalletConnected();
  }, [])



  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum && window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum &&  window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={changeNetwork} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />

              {/* <Route path="/Price" element={
                <Price  />
              } /> */}

            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;