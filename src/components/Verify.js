import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

const Verify = () => {
    const [contractAddress,setContractAddress]=useState('');
    const [loading, setLoading] = useState(false);

const submitHandler= async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const res=await axios.post('https://token.ciphercore.io/verify',{
        contractAddress:contractAddress})
      if(res.status==200){
        toast.success("Verify Contract success")
        setContractAddress('')
        setLoading(false)
      }else{
        toast.error("Verify Contract success")
      }
    }catch(error){
      toast.error("something went wrong")
      console.log(error);
      setLoading(false)
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
    {/* {
              loading?
               <ClipLoader
                color="white"
                loading={loading}
                className="block mx-auto border-red"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />:"Verify"
            } */}
    </div>
    </form>
 </div>
  )
}

export default Verify
