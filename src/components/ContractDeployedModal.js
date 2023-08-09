import React,{useState} from 'react'
import Link from 'next/link'
const ContractDeployedModal = ({setActivePopup,address,LinkUrl}) => {
  console.log(address,LinkUrl)
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(address); 
        setTimeout(() => {
          setCopied(false);
        }, 1000); 
      };
    
  return (
    <div className='absolute inset-0 bg-[#00000088] backdrop-blur-md flex justify-center items-center'>
        <div className='frame1 p-10 text-center'>
      <h2 className='text-2xl mb-5'>Contract Deployed at</h2>
        <div className='relative flex items-center justify-center gap-2'><img src="/images/copy.png" alt="copy" className='transition-all cursor-pointer active:scale-95 hover:scale-105' onClick={handleCopy}  /><Link  href=""> {address}</Link>
        {copied && <p className='absolute left-20 -bottom-8 opacity-[0.7]'>Copied</p>}
        </div>
        <div className='flex md:flex-row flex-col gap-5 items-center justify-center mt-8'>
      <button onClick={()=>setActivePopup(false)} className='select-bg py-2 px-10'>Close</button>
      <Link href={LinkUrl} target='blank'>
      <button className='select-bg py-2 px-10'>Open Link</button>
      </Link>
      </div>
      </div>
    </div>
  )
}
export default ContractDeployedModal
