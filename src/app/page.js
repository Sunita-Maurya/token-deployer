'use client'
import React,{useState} from 'react'
import BigEyes from '@/components/BigEyes'
import DejitaruTsuka from '@/components/DejitaruTsuka'
import Jeju from '@/components/Jeju'
import NeoCypherPunk from '@/components/NeoCypherPunk'
import PepeToken from '@/components/PepeToken'
import Verify from '@/components/Verify'

export default function Home() {
  const [opentVerify,setOpenVerify]=useState(false);
  const [selectedCompoent,setSelectedComponent]=useState('BigEyes')
  const RanderComponent=(component)=>{
    switch(component){
      case 'BigEyes':
        return <BigEyes/>
      case 'DejitaruTsuka':
        return <DejitaruTsuka/>
      case 'Jeju':
        return <Jeju/>
      case 'NeoCypherPunk':
        return <NeoCypherPunk/>
      case 'PepeToken':
        return  <PepeToken/>
      default:
        return null;
    }
    }

  const handleComponentChange =(e)=>{
    setSelectedComponent(e.target.value)
    console.log(e.target.value)
  }


  return (
   <main className='2xl:container 2xl:mx-auto  lg:mx-20 px-5 '>

      <div className=' main-back flex flex-col justify-center items-center h-[100vh]  '>
      <div className="flex md:justify-end justify-center md:w-[60%] w-full gap-3 md:translate-y-8  ">
        {opentVerify?
         <div className="relative mb-2 " >
         <select value={selectedCompoent} onChange={handleComponentChange} className="select-bg text-center px-5 h-12 md:w-44 w-36 outline-none">
           <option value="BigEyes" className="font-['made-tommy']">Big Eyes</option>
           <option value="NeoCypherPunk">Neo Cypher punk</option>
           <option value="DejitaruTsuka">Dejitaru tsuka</option>
           <option value="Jeju">Jeju</option>
           <option value="PepeToken">Pepe token</option>
         </select>
         <div className="h-4 w-[300px] absolute bottom-0 fill-line"></div>
         </div>: <div className='relative mb-2'>
      <button onClick={()=>setOpenVerify(true)} className='select-bg text-center px-5 h-12 md:w-32 w-36 outline-none'>Deploy</button>
      <div className="h-4 w-[300px] absolute bottom-0 fill-line"></div>
      </div>}
       
     
      <div className='relative mb-2'>
      <button onClick={()=>setOpenVerify(false)} className='select-bg text-center px-5 h-12 md:w-32 w-36 outline-none'>Verify</button>
      <div className="h-4 w-[300px] absolute bottom-0 fill-line"></div>
      </div>
      </div>
      <div className="frame-bg  xl:w-[1050px] lg:w-[800px] md:w-[90%] w-[95%]">
     <h1 className=" 2xl:text-[6px] lg:text-[6px] text-[4px] 2xl:mt-10 xl:mt-5 mt-10 md:ml-14 ml-5">
      {opentVerify?selectedCompoent: <span className='mt-20 block'>Verify Contract</span>}
     </h1>
     <div className='lg:py-20 lg:px-14 md:px-5 px-3 py-8'>

     {opentVerify? RanderComponent(selectedCompoent):<Verify/>}
     {/* {opentVerify?:<Verify/>} */}
     </div>
      </div>

    </div>

   </main>
  )
}
