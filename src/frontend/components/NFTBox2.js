import { ethers } from 'ethers'
import React, { useState } from 'react'
import { Modal, ModalHeader, Form, ModalBody } from "reactstrap"
import { Row, Col, Card, Button } from 'react-bootstrap'
import {useNavigate} from "react-router-dom";

const NftBox2 = ({ item, idx, marketplace, nft, load, setLoad }) => {
    const [price, setPrice] = useState(null)
    const [Time, setTime] = useState(null)
    const [modal, setmodal] = useState(false)
    const [Auction, setAuction] = useState(false)
    const navigate = useNavigate();
    
  const SellItem = async (item) => {
    try {
      setLoad(true);
      await (await nft.setApprovalForAll(item.marketplace, true)).wait()
      const listingPrice = ethers.utils.parseEther(price)
      const nftId = item.itemId.toString();
      await(await marketplace.makeItem(item.nft, item.itemId, listingPrice)).wait()
      setmodal(false);
      setLoad(false);
     navigate('/');
    } catch (error) {
      setLoad(false);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      console.log(error)
    }

  }

console.log("rabeeb",marketplace)
  const createAuction = async (item) => {
    try {
      setLoad(true);
      await (await nft.setApprovalForAll(item.marketplace, true)).wait()
      const listingPrice = ethers.utils.parseEther(price)
      const nftId = item.itemId.toString();
      const auctionTime = Time;
      await (await marketplace.createAuction(item.nft, nftId, listingPrice, auctionTime)).wait()
      setAuction(false)  
      setmodal(false);  
      setLoad(false);
      navigate('/');
    } catch (error) {
      setLoad(false);
      if(error.code == "ACTION_REJECTED"){
        alert("You have rejected your transaction")
      }else {
        alert("SomeThing went Wrong")
      }
      console.log(error)
    }
  }

  function getData(val) {
    setPrice(val.target.value)
  }
  function getTime(val) {
    setTime(val.target.value)
  }



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
                      {`Royality Fees ${item.Royality.toString()} %`}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  
                    <div className='d-grid'>
                      <Button onClick={() => setmodal(true)} variant="primary" size="lg">
                        Sell
                      </Button>
                    </div>
                    <br></br>
                    <div className='d-grid'>
                      <Button onClick={() => setAuction(true)} variant="primary" size="lg" >
                        
                        SetAuction
                      </Button>
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
                Set Price
              </ModalHeader>
              <ModalBody>
                <Form >
                  <Row>
                    <div>
                      <input
                        required type="number"
                        className='form-control'
                        placeholder='Enter Price'
                        onChange={getData}></input>
                    </div>
                    <div>
                      <Button onClick={() => SellItem(item)} style={{ marginLeft: "200px", marginTop: "10px" }} disabled={load}> Submit </Button>
                    </div>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>

            <Modal
              size='lg'
              isOpen={Auction}
              toggle={() => setAuction(!Auction)}>
              <ModalHeader
                toggle={() => setAuction(!Auction)}>
                Set Auction
              </ModalHeader>
              <ModalBody>
                <Form >
                  <Row>
                    <div>
                      <input
                        required type="number"
                        className='form-control'
                        placeholder='Enter Price'
                        onChange={getData}></input>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <input
                        required type="number"
                        className='form-control'
                        placeholder='Enter Time'
                        onChange={getTime}></input>
                    </div>
                    <div>
                      <Button onClick={() => createAuction(item)} style={{ marginLeft: "200px", marginTop: "10px" }} disabled={load}> Submit </Button>
                    </div>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>

    </>


  )
}

export default NftBox2