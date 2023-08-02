import React,{useState} from 'react'
import Link from 'next/link'
const ContractDeployedModal = ({setSctivePopup}) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(address); // Copy the selected chain to the clipboard
        setTimeout(() => {
          setCopied(false);
        }, 1000); // Reset the "copied" state after 2 seconds
      };
    
    const address='0x34252643576246';
  return (
    <div className='absolute inset-0 backdrop-blur-md flex justify-center items-center'>
        <div className='frame p-10 text-center'>
      <h2 className='text-2xl mb-5'>Contract Deployed at</h2>
        <div className='relative flex items-center justify-center gap-2'><img src="/images/copy.png" alt="copy" className='transition-all cursor-pointer active:scale-95 hover:scale-105' onClick={handleCopy}  /><Link  href=""> {address}</Link>
        {copied && <p className='absolute left-20 -bottom-8 opacity-[0.7]'>Copied</p>}

        </div>

        <div className='flex md:flex-row flex-col gap-5 items-center mt-8'>
      <button onClick={()=>setSctivePopup(false)} className='select-bg py-2 px-10'>Close</button>
      <button className='select-bg py-2 px-10'>Open Link</button>
      </div>
      </div>
    </div>
  )
}

export default ContractDeployedModal
