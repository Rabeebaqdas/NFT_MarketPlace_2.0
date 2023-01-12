import { useState, useEffect } from 'react'
import { Row, Button } from 'react-bootstrap'

import NftBox2 from './NFTBox2';


export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [load, setLoad] = useState(false);
  const [Bid, setBid] = useState(true);
  const [purchases, setPurchases] = useState([])
  const [chainId,setChainId] = useState()
  


  const getChainId = ()=> {
    const id = Number(window.ethereum.chainId)
    setChainId(id)
    console.log("rabeeb",id)
  }
  


  // const loadPurchasedItems = async () => {
  //   try {
  //     const tokenCount = await nft.tokenCount()
  //     console.log("1")
  //     let purchasedItem = [];
  //     for (let i = 1; i <= tokenCount; i++) {
  //       console.log("1",i)
  //       const ownerof = await nft.ownerOf(i)
  //       if (account.toString().toLowerCase() == ownerof.toString().toLowerCase()) {
        
  //         const uri = await nft.tokenURI(i)
  //         console.log("rabeeb",uri)   
  //         // use uri to fetch the nft metadata stored on ipfs 
  //         const response = await fetch(uri)
  //         const metadata = await response.json()
  //         console.log(metadata)
  //         // get Royality fees 
  //         const royality = await nft.getRoyalityFees(i);
  //         const res = Number(royality.toString()) / 100
  //         // define listed item object
  //         purchasedItem.push({
  //           nft: nft.address,
  //           itemId: i,
  //           marketplace: marketplace.address,
  //           name: metadata.name,
  //           description: metadata.description,
  //           image: metadata.image,
  //           Royality: res
  //         })
  //         setPurchases(purchasedItem)
  //       }
  //     }
  //     setLoading(false)

  //   }

  //   catch (error) {
  //     console.log("Error",error)
  //   }
  // }

  const loadPurchasedItems = async () => {
    try {
      const tokenCount = await nft.tokenCount()
      let purchasedItem = [];
      for (let i = 1; i <= tokenCount; i++) {
        const ownerof = await nft.ownerOf(i)
        if (account.toString().toLowerCase() == ownerof.toString().toLowerCase()) {

          const uri = await nft.tokenURI(i)
          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(uri)
          const metadata = await response.json()
          // get Royality fees 
          const royality = await nft.getRoyalityFees(i);
          const res = Number(royality.toString()) / 100
          // define listed item object
          purchasedItem.push({
            nft: nft.address,
            itemId: i,
            marketplace: marketplace.address,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            Royality: res
          })
          setPurchases(purchasedItem)
        }
      }
      setLoading(false)

    }

    catch (error) {
      console.log(error)
    }
  }







  const getPendingReturns = async () => {
    try {
      const getbid = await marketplace?.getPendingReturns(account);
      console.log("rabeeb",getbid?.toString())
      if(getbid>0){
        setBid(false);
      }   
    } catch (error) {
      console.log(error)
    }
  }


  const withdraw = async (account) => {
    try {
      setLoad(true);
      console.log("rabeeb",account)
      await(await marketplace.withdraw(account)).wait();
      setLoad(false); 
      window.location.reload()
    } catch (error) {
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      setLoad(false); 
      console.log("Error",error);
    }

  }

  useEffect(()=>{
    getChainId()
  },[])

  useEffect(() => {
    loadPurchasedItems();
    getPendingReturns();
  }, [account])


 if(chainId ==5) {
 // if(chainId ==1337) {
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    )
  }
 
  return (

    <div className="flex justify-center">
  {(
  // chainId == "1337"
     chainId == "5"
  ?
  <div>
  <div>
        <Button onClick={() => withdraw(account)} style={{ marginLeft: "1000px", marginTop: "5px" }} disabled={Bid || load}> Withdraw Your Bids </Button>
  </div>
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (

              <NftBox2 item={item} idx = {idx} marketplace ={marketplace} load={load} setLoad={setLoad} nft = {nft} />
            ))}
          </Row>

        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            {/* <Button onClick={()=>withdraw(account)} style={{ marginLeft: "1000px",marginTop: "5px" }}> Return Bids </Button> */}

            <h2>No purchases</h2>
            <div>
            </div>
          </main>
        )}
  </div>
  :
"Please switch to supported network"
  )}
    
  </div>
  );
}