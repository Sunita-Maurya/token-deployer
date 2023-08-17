import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Verify = () => {
    const [contractAddress,setContractAddress]=useState('');
const submitHandler= async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post('https://deployer.ciphercore.io/verify',{
        contractAddress:contractAddress})
      if(res.status==200){
        toast.success("Verify Contract success")
        setContractAddress('')
      }else{
        toast.error("Verify Contract success")
      }
    }catch(error){
      console.log(error);
    }
    console.log("hjkl")
    console.log(contractAddress)
}


  return (
 <div className='md:h-[350px] h-[300px] '>
    <form onSubmit={submitHandler}>
    <input required type="text" name="contractAddress" value={contractAddress} placeholder='Enter Contract Address' onChange={(e)=>setContractAddress(e.target.value)} className='input-bg w-full'/>
    <div className='flex justify-end  items-center'>
    <button type="submit" className='select-bg px-10 py-3 mt-5 transition-all active:scale-95 hover:bg-[#393838]'>Verify</button>
    </div>
    </form>
 </div>
  )
}

export default Verify
