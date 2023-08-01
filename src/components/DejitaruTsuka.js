import React,{useState} from 'react'
import ContractDeployedModal from './ContractDeployedModal'

const DejitaruTsuka = () => {
    const [activePopup,setSctivePopup]=useState(false)
    const submitHandler=(e)=>{
  e.preventDefault();
  setSctivePopup(true)
    }
  return (
    <>
        <form onSubmit={submitHandler} className="flex flex-col  lg:py-8 lg:px-20 md:px-10 px-5 py-10">
      <input type="text" placeholder='Enter contract name without space'  className="input-bg"/>
      <label htmlFor="" className="input-bg flex items-center">DejitaruTsuka</label>
      <select name="" id="" className='input-bg'>
        <option value="Pancake SwapV2_BscScan">Pancake SwapV2_BscScan</option>
        <option value="Pancake SwapV2_Ehtereum">Pancake SwapV2_Ehtereum</option>
        <option value="Pancake SwapV2_Testnet">Pancake SwapV2_Testnet</option>
        <option value="Pancake SwapV2_Goerli">Pancake SwapV2_Goerli</option>
      </select>
      <input type="text" placeholder='Enter token name' className="input-bg"/>
      <input type="text" placeholder='Enter token symbol' className="input-bg"/>
      <input type="number" placeholder='Enter token decimals range 1 to 18' min='1' max="18" className="input-bg" />
      <input type="number" placeholder='Enter token total supply (exclude decimal digit)' className="input-bg"/>
      <input type="text" placeholder='Enter wallet private key' className="input-bg"/>
      <p className='my-3'>Varify Contract</p>
      <div className='flex gap-5 items-center'>
      <button type='button' className='select-bg py-2 px-10'>Ture</button>
      <button type='button' className='select-bg py-2 px-10'>False</button>
      </div>
    <select name="" id="" className="input-bg">
        <option value="" >select chain id</option>
        <option value="Fantom Testnet">Fantom Testnet</option>
        <option value="BSC Testnet">BSC Testnet</option>
        <option value="BSC Mainnet">BSC Mainnet</option>
        <option value="Arbitrum One">Arbitrum One</option>
        <option value="Ethereum Mainnet">Ethereum Mainnet</option>
    </select>
    <div className="flex justify-center">
    <button className="submit-btn w-1/2 mx-auto">Submit</button>
    </div>
    </form>
{activePopup&& <ContractDeployedModal setSctivePopup={setSctivePopup}/>}    </>
  )
}

export default DejitaruTsuka
