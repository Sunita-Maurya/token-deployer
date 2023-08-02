import React, { useState,useEffect } from 'react'
import ContractDeployedModal from './ContractDeployedModal'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import Link from 'next/link';

import { BigNumber } from 'bignumber.js';

const BigEyes = () => {
  const [activePopup,setSctivePopup]=useState(false)
  const [contractName, setContractName] = useState("");
  const [templateName, setTemplateName] = useState("BigEyes");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [privateKey, setPrivatekey] = useState("");
  const [addTotalSupplyWei,setAddTotalSupplyWei]= useState();
  const[chainId, setChainId] = useState('');
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("green");
  const [LinkUrl,setLinkUrl]=useState("");
  const [address,setAddress]= useState();


  const handlePrivateKeyChange = (event) => {
    let value = event.target.value;
    if (!value.startsWith('0x')) {
      value = `0x${value}`;
      setPrivatekey(value);
    }else{
      setPrivatekey(value);
    }
  };
  useEffect(()=>{
    if(decimals && totalSupply !==null){
       const total = totalSupply * Math.pow(10, decimals);
       const number = new BigNumber(total);
       const realNumber = number.toFixed(); 
        setAddTotalSupplyWei(realNumber);
    }
    },[decimals,totalSupply])
 

  const  submitHandler=async(e)=>{
    e.preventDefault();

    try{
      setLoading(true)
    let res= await  axios.post('https://deployment.debwebdomain.xyz/deploy/bigeyes',{  
        contractName: contractName,
        templateName:templateName,
        name: name,
        symbol: symbol,
        decimals: decimals,
        totalSupply: addTotalSupplyWei,
        privateKey: privateKey,
        chainId:Number(chainId)})
        console.log('res',res)
        if(res.status===200){
          toast("Form Submitted Succesfull",res.data);
           setSctivePopup(true)
           setLoading(false)
           console.log("success",res.data.address);
           if(res.data.address){
            let newPageUrl;
            if(chainId=="4002"){
              newPageUrl=`https://testnet.ftmscan.com/address/${res.data.address}`;
            }else if(chainId == "1"){
              newPageUrl=`https://etherscan.io/address/${res.data.address}`
            }else if(chainId == "250"){
              newPageUrl=`https://ftmscan.com/address/${res.data.address}`
            }else if(chainId == "56"){
              newPageUrl=`https://bscscan.com/address/${res.data.address}`
            }else if(chainId == "42161"){
              newPageUrl=`https://arbiscan.io/address/${res.data.address}`
            }else if(chainId == "137"){
              newPageUrl=`https://polygonscan.com/address/${res.data.address}`
            }else if(chainId == "97"){
              newPageUrl=`https://testnet.bscscan.com/address/${res.data.address}`
            }
            setLinkUrl(newPageUrl);
            setAddress(res.data.address)
            }else{
          console.log("responce error link");
        }
        }
         }catch (err) {
           console.log("error catch find");
           console.log(err);
         }
  }

  return (
    <>
    <form onSubmit={submitHandler}  className="flex flex-col ">
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter contract name without space' name="contractName" onChange={(e)=>setContractName(e.target.value)} value={contractName} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter token symbol' name="symbol" onChange={(e)=>setSymbol(e.target.value)} value={symbol} className="input-bg md:w-[40%] w-full"/>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter token name' name='name' onChange={(e)=>setName(e.target.value)} value={name} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter wallet private key' name='privateKey' onChange={handlePrivateKeyChange}  value={privateKey.substring(2)} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="number" placeholder='Enter token  supply (exclude decimal digit)' name='totalSupply' onChange={(e)=>setTotalSupply(e.target.value)} value={totalSupply} className="input-bg md:w-[60%] w-full"/>
      <input type="number" placeholder='Enter token decimals range 1 to 18' name="decimals" min='1' max="18" onChange={(e)=>setDecimals(e.target.value)} value={decimals} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <div className='md:w-[60%] w-full'>
      <p className='my-2 '>Varify Contract</p>
      <select className='input-bg w-44' name="verify">
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
      </div>
      <select className="input-bg md:w-[40%] w-full" name="chainId" onChange={(e)=>setChainId(e.target.value)} >
      <option value="" > Select chain id</option>       
        <option value="4002">Fantom Testnet</option>
        <option value="250">Fantom Mainnet</option>
        <option value="97">BSC Testnet</option>
        <option value="56">BSC Mainnet</option>
        <option value="42161">Arbitrum One</option>
        <option value="1">Ethereum Mainnet</option>
        <option value="137">Polygon Mainnet</option>
      </select>
      </div>
    <div className="flex justify-center lg:mt-8  mt-5">
    <button className="submit-btn w-[80%] mx-auto 2x:mt-5 xl:mt-0">
      {
              loading?
               <ClipLoader
                color="white"
                loading={loading}
                className="block mx-auto border-red"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />:"submit"
            }
    </button>
    </div>
    </form>
    <ToastContainer/>
    {activePopup && <ContractDeployedModal address={address} LinkUrl={LinkUrl} setSctivePopup={setSctivePopup}/>}
  </>
)
}


export default BigEyes
