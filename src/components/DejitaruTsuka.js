import React, { useState } from 'react'
import ContractDeployedModal from './ContractDeployedModal'

const DejitaruTsuka = () => {
  const [activePopup,setSctivePopup]=useState(false)
  const [formData,setFormData]=useState({
    contractName:'',
    tokenName:"",
    tokenSymbol:"",
    tokenDecimalsRange:'',
    totalSupply:'',
    privateKey:'',
    selecetedChain:'',

  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))  
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    setSctivePopup(true)
   console.log(formData)
   setFormData({
    contractName:'',
    tokenName:"",
    tokenSymbol:"",
    tokenDecimalsRange:'',
    totalSupply:'',
    privateKey:'',
    selecetedChain:'',
   })
  }
  return (
    <>
    <form onSubmit={submitHandler}  className="flex flex-col ">
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter contract name without space' name="contractName" onChange={handleChange} value={formData.contractName} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter token symbol' name="tokenSymbol" onChange={handleChange} value={formData.tokenSymbol} className="input-bg md:w-[40%] w-full"/>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter token name' name='tokenName' onChange={handleChange} value={formData.tokenName} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter wallet private key' name='privateKey' onChange={handleChange}  value={formData.privateKey} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="number" placeholder='Enter token  supply (exclude decimal digit)' name='totalSupply' onChange={handleChange} value={formData.totalSupply} className="input-bg md:w-[60%] w-full"/>
      <input type="number" placeholder='Enter token decimals range 1 to 18' name="tokenDecimalsRange" min='1' max="18" onChange={handleChange} value={formData.tokenDecimalsRange} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <select name="" id="" className='input-bg  md:w-[60%] w-full'>
        <option value="Pancake SwapV2_BscScan">Pancake SwapV2_BscScan</option>
        <option value="Pancake SwapV2_Ehtereum">Pancake SwapV2_Ehtereum</option>
        <option value="Pancake SwapV2_Testnet">Pancake SwapV2_Testnet</option>
        <option value="Pancake SwapV2_Goerli">Pancake SwapV2_Goerli</option>
      </select>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <div className='md:w-[60%] w-full'>
      <p className='my-3 '>Varify Contract</p>
      <div className='flex gap-5 items-center'>
      <button type='button'  className='select-bg py-2 px-10'>Ture</button>
      <button type='button' className='select-bg py-2 px-10'>False</button>
      </div>
      </div>
      <select className="input-bg md:w-[40%] w-full" name="selectedChain" onChange={handleChange} >
      <option value="" disabled> Select chain id</option>       
       <option value="Fantom Testnet">Fantom Testnet</option>
        <option value="BSC Testnet">BSC Testnet</option>
        <option value="BSC Mainnet">BSC Mainnet</option>
        <option value="Arbitrum One">Arbitrum One</option>
        <option value="Ethereum Mainnet">Ethereum Mainnet</option>
      </select>
      </div>
    <div className="flex justify-center lg:mt-8  mt-5">
    <button className="submit-btn w-[80%] mx-auto 2x:mt-5 xl:mt-0">Submit</button>
    </div>
    </form>
{activePopup&& <ContractDeployedModal setSctivePopup={setSctivePopup}/>}
</>)
}


export default DejitaruTsuka
