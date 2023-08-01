import React, { useState } from 'react'
import ContractDeployedModal from './ContractDeployedModal'

const BigEyes = () => {
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
    <form onSubmit={submitHandler}  className="flex flex-col lg:py-8 lg:px-20 md:px-10 px-5 py-10">
      <input type="text" placeholder='Enter contract name without space' name="contractName" onChange={handleChange} value={formData.contractName} className="input-bg"/>
      <label htmlFor="" className="input-bg flex items-center">Big Eyes</label>
      <input type="text" placeholder='Enter token name' name='tokenName' onChange={handleChange} value={formData.tokenName} className="input-bg"/>
      <input type="text" placeholder='Enter token symbol' name="tokenSymbol" onChange={handleChange} value={formData.tokenSymbol} className="input-bg"/>
      <input type="number" placeholder='Enter token decimals range 1 to 18' name="tokenDecimalsRange" min='1' max="18" onChange={handleChange} value={formData.tokenDecimalsRange} className="input-bg" />
      <input type="number" placeholder='Enter token total supply (exclude decimal digit)' name='totalSupply' onChange={handleChange} value={formData.totalSupply} className="input-bg"/>
      <input type="text" placeholder='Enter wallet private key' name='privateKey' onChange={handleChange}  value={formData.privateKey} className="input-bg"/>
      <p className='my-3'>Varify Contract</p>
      <div className='flex gap-5 items-center'>
      <button type='button'  className='select-bg py-2 px-10'>Ture</button>
      <button type='button' className='select-bg py-2 px-10'>False</button>
      </div>
      <select className="input-bg" name="selectedChain" onChange={handleChange} >
      <option value="" disabled> Select chain id</option>       
       <option value="Fantom Testnet">Fantom Testnet</option>
        <option value="BSC Testnet">BSC Testnet</option>
        <option value="BSC Mainnet">BSC Mainnet</option>
        <option value="Arbitrum One">Arbitrum One</option>
        <option value="Ethereum Mainnet">Ethereum Mainnet</option>
      </select>
    <div className="flex justify-center">
    <button className="submit-btn w-1/2 mx-auto 2x:mt-5 xl:mt-0 mt-5">Submit</button>
    </div>
    </form>
{activePopup&& <ContractDeployedModal setSctivePopup={setSctivePopup}/>}
</>)
}


export default BigEyes