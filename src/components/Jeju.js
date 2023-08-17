import axios from "axios"
import { useState } from "react"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ClipLoader from "react-spinners/ClipLoader";
import ContractDeployedModal from "./ContractDeployedModal";

const Jeju = () => {
  const [activePopup,setActivePopup]=useState(false)
const [contractName, setContractName] = useState("");
const [templateName, setTemplateName] = useState("JEJU");
const [router,setRouter]= useState("")
const [name, setName] = useState("");
const [symbol, setSymbol] = useState("");
const [privateKey, setPrivatekey] = useState("");
const[selectedValue, setSelectedValue] = useState('');
const [loading, setLoading] = useState(false);
const [LinkUrl,setLinkUrl]=useState("");
const [address,setAddress]= useState();
const [buyOperationsFee,setBuyOperationsFee]=useState('');
const [buyLiquidityFee,setBuyLiquidityFee]=useState('');
const [sellOperationsFee,setSellOperationsFee]=useState('');
const [sellLiquidityFee,setSellLiquidityFee]=useState('');
const [operationsAddress,setOperationsAddress]=useState('');
const [supplyAddress1,setSupplyAddress1]=useState('')
const [supplyAddress2,setSupplyAddress2]=useState('')
const [supplyAddress3,setSupplyAddress3]=useState('')
const [verify,setVerify]=useState(false)

  const handleChangeChainId = (event) => {
    setSelectedValue(event.target.value);
  };

const handleChangeRouter=(event)=>{
    if(event.target.value == 1){
      setRouter("0x10ED43C718714eb63d5aA57B78B54704E256024E");
    }else if(event.target.value == 2){
      setRouter("0xEfF92A263d31888d860bD50809A8D171709b7b1c");
    }else if(event.target.value == 3){
      setRouter("0xD99D1c33F9fC3444f8101754aBC46c52416550D1");
    }else if(event.target.value == 4){
      setRouter("0x13f4EA83D0bd40E75C8222255bc855a974568Dd4");
    }else if(event.target.value == 5){
      setRouter("0x13f4EA83D0bd40E75C8222255bc855a974568Dd4");
    }else if(event.target.value == 6){
      setRouter("0x9a489505a00cE272eAa5e07Dba6491314CaE3796");
    }else if(event.target.value == 7){
      setRouter("0x9a489505a00cE272eAa5e07Dba6491314CaE3796");
    }else if(event.target.value == 8){
      setRouter("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    }else if(event.target.value == 9){
      setRouter("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    }else if(event.target.value == 10){
      setRouter("0x045312C737a6b7a115906Be0aD0ef53A6AA38106");
    }else if(event.target.value == 11){
      setRouter("0x5DE02F06382E24A6f65203c526d0314d86b681dD");
    }
  }
  
 const handleInputChange = (event) => {
    let value = event.target.value;
    // Check if the input value starts with "0x"
    if (!value.startsWith('0x')) {
      // If it doesn't start with "0x", add it to the beginning
      value = `0x${value}`;
    }
    setPrivatekey(value);
  };

let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("DATA enter field");
    setLoading(true)
    let res = await axios.post("https://deployment.debwebdomain.xyz/deploy/jeju", {
      contractName: contractName,
      templateName: templateName,
      router:router,
      name: name,
      symbol: symbol,
      buyOperationsFee:buyOperationsFee,
      buyLiquidityFee:buyLiquidityFee,
      sellOperationsFee:sellOperationsFee,
      sellLiquidityFee:sellLiquidityFee,
      operationsAddress:operationsAddress,
      supplyAddress1:supplyAddress1,
      supplyAddress2:supplyAddress2,
      supplyAddress3:supplyAddress3,
      verify:verify,
      privateKey: privateKey,
      chainId:Number(selectedValue)
    });
    console.log(res.data, "resJson");

    if (res.status === 200) {
      console.log("success");
      toast("Form Submitted Succesfull");
      setActivePopup(true)
      setContractName("");
      // setTemplateName("");
      setRouter("");
      setName("");
      setSymbol("");
      setPrivatekey("");
      setSelectedValue("");
      setBuyOperationsFee('');
      setBuyLiquidityFee('');
      setSellOperationsFee('');
      setSellLiquidityFee('');
      setOperationsAddress('');
      setSupplyAddress1('')
      setSupplyAddress2('')
      setSupplyAddress3('')

      setLoading(false)

       if(res.data){
          let newPageUrl;
          if(selectedValue=="4002"){
            newPageUrl=`https://testnet.ftmscan.com/address/${res.data.address}`;
          }else if(selectedValue == "1"){
            newPageUrl=`https://etherscan.io/address/${res.data.address}`
          }else if(selectedValue == "250"){
            newPageUrl=`https://ftmscan.com/address/${res.data.address}`
          }else if(selectedValue == "56"){
            newPageUrl=`https://bscscan.com/address/${res.data.address}`
          }else if(selectedValue == "42161"){
            newPageUrl=`https://arbiscan.io/address/${res.data.address}`
          }else if(selectedValue == "137"){
            newPageUrl=`https://polygonscan.com/address/${res.data.address}`
          }else if(selectedValue == "97"){
            newPageUrl=`https://testnet.bscscan.com/address/${res.data.address}`
          }
          setLinkUrl(newPageUrl);
          setAddress(res.data.address)
          }else{
              console.log("responce error link");
          }
      // Add any success handling logic here
    } else {
      console.log("form error");
      // Add any error handling logic here
    }
  } catch (err) {
    console.log("error catch find");
    console.log(err);
    setLoading(false);
  }
};

  return (
    <>
    <form onSubmit={handleSubmit}  className="flex flex-col ">
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter contract name without space' name="contractName" onChange={(e)=>setContractName(e.target.value)} value={contractName} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter token symbol' name="symbol" onChange={(e)=>setSymbol(e.target.value)} value={symbol} className="input-bg md:w-[40%] w-full"/>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter token name' name='name' onChange={(e)=>setName(e.target.value)} value={name} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter wallet private key' name='privateKey' onChange={handleInputChange}  value={privateKey} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter buyOperationsFee' name='buyOperationsFee' onChange={(e)=>setBuyOperationsFee(e.target.value)} value={buyOperationsFee} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter buyLiquidityFee' name='buyLiquidityFee' onChange={()=>setBuyLiquidityFee(e.target.value)}  value={buyLiquidityFee} className="input-bg md:w-[40%] w-full" />
      </div> 
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter sellOperationsFee' name='sellOperationsFee' onChange={(e)=>setSellOperationsFee(e.target.value)} value={sellOperationsFee} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter sellLiquidityFee' name='sellLiquidityFee' onChange={()=>setSellLiquidityFee(e.target.value)}  value={sellLiquidityFee} className="input-bg md:w-[40%] w-full" />
      </div> 
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter operationsAddress' name='operationsAddress' onChange={(e)=>setOperationsAddress(e.target.value)} value={operationsAddress} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter supplyAddress1' name='supplyAddress1' onChange={()=>setSupplyAddress1(e.target.value)}  value={supplyAddress1} className="input-bg md:w-[40%] w-full" />
      </div> 
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter supplyAddress2' name='supplyAddress2' onChange={()=>setSupplyAddress2(e.target.value)}  value={supplyAddress2} className="input-bg md:w-[40%] w-full" />
      <input type="text" placeholder='Enter supplyAddress3' name='supplyAddress3' onChange={()=>setSupplyAddres31(e.target.value)}  value={supplyAddress3} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <select name="router" className='input-bg  md:w-[60%] w-full'  onChange={handleChangeRouter}>
        {/* <option disabled selected value="" >Select Router Address</option> */}
         <option value="1">PancakeswapV2_BscScan </option>
         <option value="2">PancakeswapV2_Ethereum </option>
         <option value="3">PancakeswapV2_BscTestnet </option>
         <option value="4">PancakeswapV3_BscScan </option>
         <option value="5">PancakeswapV3_Ethereum </option>
         <option value="6">PancakeswapV3_Goerli </option>
         <option value="7">PancakeswapV3_BscTestnet </option>
         <option value="8">UniswapV2_Ethereum  </option>
         <option value="9">UniswapV2_Goerli </option>
         <option value="10">DarkKnightRouter_FantomMainnet</option>
         <option value="11">Router_FantomTestnet</option>
      </select>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <div className='md:w-[60%] w-full'>
      <p className='my-3 '>Varify Contract</p>
      <select className='input-bg w-44' name="verify" onChange={(e)=>setVerify(e.target.value==="true"?true:false)}>
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
      </div>
      <select className="input-bg md:w-[40%] w-full" name="selectedValue" onChange={handleChangeChainId} >
      {/* <option value="" selected disabled> Select chain id</option>        */}
      <option value="250">Fantom Mainnet</option>
      <option value="4002">Fantom Testnet</option>
        <option value="97">BSC Testnet</option>
        <option value="56">BSC Mainnet</option>
        <option value="42161">Arbitrum One</option>
        <option value="1">Ethereum Mainnet</option>
        <option value="137">Polygon Mainnet</option>
      </select>
      </div>
    <div className="flex justify-center lg:mt-8  mt-5">
    <button type='submit' className="submit-btn w-[80%] mx-auto 2x:mt-5 xl:mt-0">  {
              loading?
               <ClipLoader
                color="white"
                loading={loading}
                className="block mx-auto border-red"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />:"submit"
            }</button>      </div>
    </form>
    <ToastContainer/>
    {activePopup && <ContractDeployedModal address={address} LinkUrl={LinkUrl} setActivePopup={setActivePopup}/>}
    </>
    )
}


export default Jeju
