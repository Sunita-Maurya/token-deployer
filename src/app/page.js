'use client'
import React,{useState} from 'react'
import BigEyes from '@/components/BigEyes'
import DejitaruTsuka from '@/components/DejitaruTsuka'
import Jeju from '@/components/Jeju'
import NeoCypherPunk from '@/components/NeoCypherPunk'
import PepeToken from '@/components/PepeToken'

export default function Home() {
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
   <main className=''>
        {/* <img src="/images/up-left-bg.png" alt="bg"  className='absolute top-0'/> */}

      <div className='relative main-back flex flex-col  justify-center items-center'>
      <div className="flex justify-end md:w-[60%] w-full mr-5  translate-y-10">
        <div className="relative mb-2 ">
      <select value={selectedCompoent} onChange={handleComponentChange} className="select-bg text-center px-5 h-12 w-44 outline-none">
        <option value="BigEyes" className="font-['made-tommy']">Big Eyes</option>
        <option value="NeoCypherPunk">Neo Cypher punk</option>
        <option value="DejitaruTsuka">Dejitaru tsuka</option>
        <option value="Jeju">Jeju</option>
        <option value="PepeToken">Pepe token</option>
      </select>
      <div className="h-4 w-[300px] absolute bottom-0 fill-line  "></div>
      </div>
      </div>
      <div className="frame-bg  2xl:w-[70%] xl:w-[70%] w-[95%] ">
     <h1 className=" 2xl:text-[8px] lg:text-[6px] text-[4px] 2xl:mt-10 xl:mt-5 mt-10 md:ml-20 ml-5">
      {selectedCompoent}
     </h1>
     {RanderComponent(selectedCompoent)}
      </div>
    </div>
    {/* <img src="/images/bottom-right-bg.png" alt="bg"  className='absolute bottom-0 right-0 '/> */}

   </main>
  )
}
