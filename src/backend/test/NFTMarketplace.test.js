const { expect } = require("chai");
const { ethers } = require("hardhat");

//describe for deploy the smart contract
describe("This Is MarketPlace", function () {

  let Marketplace;
  let Market;
  let NFT;
  let NFTContracts;
  


  it ("All Smart Contract Deploy here :", async function(){
    
    [per1,per2,per3,per4] = await ethers.getSigners()


  NFTContracts = await hre.ethers.getContractFactory("NFT");
  NFT = await NFTContracts.deploy();
  
  console.log(
    "NFTContracts",NFT.address
  ); 

  Marketplace = await hre.ethers.getContractFactory("Marketplace");
  Market = await Marketplace.deploy(1);
  console.log(
    "Market",Market.address
  );

  }),

//here we calll Mint function for create a token
it("call Mint Function Of Erc721 :", async function(){
  let mintToken = await NFT.mint("0x00");
  balance = await NFT.balanceOf(per1.address);
  console.log("after Mint NFT Balance Cheek : ",balance.toString());
});

// it("call Mint Function Of Erc721 :", async function(){
//     let mintToken = await NFT.mint("0x00");
//     balance = await NFT.balanceOf(per1.address);
//     console.log("after Mint NFT Balance Cheek : ",balance.toString());
// });

it("call Approve For All Function Of Erc721 :", async function(){
    let Approve = await NFT.setApprovalForAll(Market.address,true);
});
  

//Now make setSalePrice of the NFT
// it ("now call create Market sale :", async function(){
//   let create = await Market.makeItem(NFT.address,1,10); 
//   let getPrice = await NFT.ownerOf(1);
//   console.log("After setPrice Get values :",getPrice.toString()); 
//   console.log("this is sender address",per1.address);
//   console.log("this is sender address",Market.address);
// });

// it ("now call create Market sale :", async function(){
//     let create = await Market.makeItem(NFT.address,2,10); 
//     let getPrice = await NFT.ownerOf(1);
//     console.log("After setPrice Get values :",getPrice.toString()); 
//     console.log("this is sender address",per1.address);
//     console.log("this is sender address",Market.address);
// });
 

// it ("balace of per2 before purchase NFT :", async function(){
//     balance = await NFT.balanceOf(per2.address);
//     console.log("Before puchase nft balance", balance); 
// });


//Buy Function Call SuperRareBaazar
// it ("This is buy function call: ", async function(){
//     let itmes = await Market.connect(per2).purchaseItem(1, {value:10});
//     balance = await NFT.balanceOf(per2.address);
//     console.log("After puchase nft balance", balance);   
// });

it ("This is Auction function call: ", async function(){
    //let Approve = await NFT.connect(per2).setApprovalForAll(Market.address,true);
    let itmes = await Market.createAuction(NFT.address, 1, 8, 30);
    balance = await NFT.balanceOf(per1.address);
    console.log("After puchase nft balance", balance);   
});

   
it("this is getLastTime funtion from auction: ", async function (){
  let itmes = await Market.getLastTime(1);
  console.log("%%%%%%%%%%%", itmes);   
});


it("this is bid funtion call per2 side: ", async function (){

  let bid = await Market.connect(per2).bid(1,{value:10})

})

it("this is bid funtion call per3 side: ", async function (){

  let bid = await Market.connect(per3).bid(1,{value:11})

})
it("this is getLastTime funtion from auction: ", async function (){
  let itmes = await Market.getLastTime(1);
  console.log("%%%%%%%%%%%", itmes);   
});

it("this is bid funtion call per2 side: ", async function (){

  let bid = await Market.connect(per2).bid(1,{value:2})

})

it("this is conclude option function call :", async function (){
  await network.provider.send("evm_increaseTime", [3600])
  await network.provider.send("evm_mine")
  let consludeAuction = await Market.connect(per2).concludeAuction(1,per2.address,)
})  
it("this is balance of function &&& :", async function (){
  balance = await NFT.balanceOf(per2.address);
  console.log("After puchase nft balance", balance);  
})

it("this is biding balance :", async function (){
  balance = await Market.getPendingReturns(per3.address);
  console.log("this is biding balance", balance.toString());  
})

it("this is biding balance :", async function (){
  balance = await Market.getPendingReturns(per2.address);
  console.log("this is biding balance", balance.toString());  
})

it("this is biding balance :", async function (){
  balance = await Market.connect(per3).withdraw(per3.address);
  balances = await Market.getPendingReturns(per3.address);
  console.log("this is biding balance", balances.toString()); 
})

// it("this is buy funtion from auction: ", async function (){
//   let itmes = await Market.purchaseItem(3, {value:10});
//   balance = await NFT.balanceOf(per1.address);
//   console.log("After puchase nft balance", balance);   
//   });



});  