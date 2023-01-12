import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, Form, ModalBody } from "reactstrap"
import { Row, Col, Card, Button } from 'react-bootstrap'
import Countdown from 'react-countdown'
import {useNavigate} from "react-router-dom";

const NftBox = ({ item, idx, marketplace, account, loading, setLoading }) => {
  const [modal, setmodal] = useState(false)
  const [price, setPrice] = useState(null)
  const [Time, setTime] = useState(0)
  const [bid, setbid] = useState(0)
  const [bidder, setbidder] = useState(null)
  
  const [NowTime, setNowTime] = useState(0)

  const navigate = useNavigate();




  const getLastTime = async () => {
    try {
      const time = await marketplace.getLastTime(item.itemId.toString())
      const temp = Number(time.toString())
      const nowDate = Math.floor((new Date()).getTime() / 1000);
      setTime(temp)
      setNowTime(nowDate)
    } catch (error) {
      console.log(error);
    }
  }

  const getHigestBid = async () => {
    try {

      let bid = await marketplace.getHighestBid(item.itemId);
      setbid(ethers.utils.formatEther(bid))
      console.log("this is bid", bid.toString());

    } catch (error) {
      console.log(error);
    }
  }

  const getHigestBidder = async () => {
    try {
      let bidder = await marketplace.getHighestBidder(item.itemId);
      setbidder(bidder)
      console.log("this is bid", bidder.toString());
    } catch (error) {
      console.log(error);
    }

  }

  const CancelListing = async () => {
    try {
      setLoading(true)
     await (await marketplace.cancelListing(item.itemId)).wait();
      setLoading(false);
      navigate('/my-purchases');
    } catch (error) {
      setLoading(false);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      console.log(error);
    }


  }

  const concludeAuction = async () => {
    try {
      setLoading(true);
    await (await marketplace.concludeAuction(item.itemId, account)).wait();
      setLoading(false);
      navigate('/my-purchases')
    } catch (error) {
      setLoading(false);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      console.log(error);
    }

  }

  const cancelAuction = async () => {
    try {
      setLoading(true);
    await (await marketplace.cancellAuction(item.itemId, account)).wait();
      setLoading(false);
      navigate('/my-purchases')
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }


  const buyMarketItem = async (item) => {
    try {
      setLoading(true)
      console.log("this is item id ", item.itemId.toString())
      await (await marketplace.purchaseItem(item.itemId.toString(), { value: item.totalPrice })).wait()
      setLoading(false);
      navigate('/my-purchases')
    } catch (error) {
      console.log(error);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      setLoading(false);
    }
  }


  const placeBid = async () => {
    try {
      setLoading(true);
      const bidding = ethers.utils.parseEther(price)
      await (await marketplace.bid(item.itemId, { value: bidding })).wait()
      setmodal(false);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      console.log(error);
    }

  }

  function getData(val) {
    setPrice(val.target.value)
  }


  console.log("MOdal ", item)

  useEffect(() => {
    getLastTime();
    getHigestBid();
    getHigestBidder();
  },[bidder,bid]);


  return (
    <>
      <Col lg={4} key={idx} className="overflow-hidden">
        <Card>
          <Card.Img variant="top" src={item.image} />
          <Card.Body color="secondary">
            <Card.Title>{item.name}</Card.Title>
            <hr />
            <Card.Text>
              {item.description}
            </Card.Text>

            <hr />
            <Card.Text>
              {`Owned By :  ${item?.seller?.slice(0, 5)}...${item?.seller?.slice(item?.seller.length - 4)}`}
            </Card.Text>
            <hr />
           {item.time > 0
            ?
            <Card.Text>
              {`Initial Price : ${ethers?.utils?.formatEther(item?.totalPrice?.toString())} ETH`} 
            </Card.Text>
            :
            <Card.Text>
            {`Price : ${ethers?.utils?.formatEther(item?.totalPrice?.toString())} ETH`} 
          </Card.Text>
            }

            <div> 
            <Card.Text>
              {`Royality Fees : ${item.Royality.toString()} %`}
            </Card.Text>
 
            { item.time > 0 ?         
             <div> <Card.Text>
              {`Highest Bid : ${bid} ETH`}
            </Card.Text>
            <Card.Text>
              {`Highest Bidder : ${bidder?.slice(0, 5)}...${bidder?.slice(bidder.length - 4)}`}
            </Card.Text>
            </div>
            : 
           <></> }
            </div>
      
 
          </Card.Body>
          <Card.Footer>
            <div className='d-grid'>
              {item.time > 0
                ?
                NowTime < Time
                  ? 
                  account.toString().toLowerCase() === item.seller.toString().toLowerCase()
                  ?
                  <div className='d-grid'>
                    <Countdown date={Time * 1000} />
                    <hr />
                    <Button variant="primary" size="lg" disabled={true} > Auction is in progress </Button> 
                    </div>
                    :
                    <div className='d-grid'>
                
                        <Countdown date={Time * 1000} />
                          <hr />
                     <Button onClick={() => setmodal(true)} variant="primary" size="lg" disabled={loading} > Place Bid </Button>
                        </div>
                  :
                  bid>0 && bidder?.toString().toLowerCase() === account?.toString().toLowerCase()
                  ? 
                  <div className='d-grid'>
                    <Button onClick={() => concludeAuction()} variant="primary" size="lg" disabled={loading} > GET NFT </Button> 
                  </div>
                   : 
                 account.toString().toLowerCase() !== item.seller.toString().toLowerCase()
                 ? <div className='d-grid'>
                 <Button variant="primary" size="lg" disabled={true} > Auction has Ended </Button> 
               </div>
               
               :bid>0 ?
                  <div className='d-grid'>
                   <Button variant="primary" size="lg" disabled={true} > Auction has Ended </Button> 
                 </div>
                :
                <div className='d-grid'>
                <Button onClick={() => cancelAuction()} variant="primary" size="lg" disabled={loading} > Take your NFT </Button> 
              </div>
                  
                : account.toString().toLowerCase() === item.seller.toString().toLowerCase()
                  ? <Button onClick={() => CancelListing(item)} variant="primary" size="lg" disabled={loading}>
                    Cancel Listing
                  </Button>
                  : <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg" disabled={loading}>
                    Buy NFT
                  </Button>
              }

            </div>
          </Card.Footer>
        </Card>
      </Col>


      <Modal
        size='lg'
        isOpen={modal}
        toggle={() => setmodal(!modal)}>
        <ModalHeader
          toggle={() => setmodal(!modal)}>
          Place Bid
        </ModalHeader>
        <ModalBody>
          <Form >
            <Row>
              <div>
                <input
                  required type="number"
                  className='form-control'
                  placeholder='Enter Bid'
                  onChange={getData}></input>
              </div>
              <div>

                <Button onClick={() => placeBid(item.itemId)} style={{ marginLeft: "200px", marginTop: "10px" }} disabled = {loading} > Submit </Button>
              </div>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

    </>


  )
}

export default NftBox