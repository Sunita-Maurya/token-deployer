import React,{useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ClipLoader from "react-spinners/ClipLoader";
import ContractDeployedModal from './ContractDeployedModal';

const PepeToken = () => {
const [activePopup,setActivePopup]=useState('');
const [contractName, setContractName] = useState("");
const [templateName, setTemplateName] = useState("PepeToken");
const [name, setName] = useState("");
const [symbol, setSymbol] = useState("");
const [totalSupply,setTotalSupply]= useState("")
const [privateKey, setPrivatekey] = useState("");
const [selectedValue, setSelectedValue] = useState('');
const [loading, setLoading] = useState(false);
const [verify, setVerify] = useState(false);
const [LinkUrl,setLinkUrl]=useState("");
const [address,setAddress]= useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  

 const handlePrivateKey = (event) => {
    let value = event.target.value;
    // Check if the input value starts with "0x"
    if (!value.startsWith('0x')) {
      // If it doesn't start with "0x", add it to the beginning
      value = `0x${value}`;
    }
    setPrivatekey(value);
  };

let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("DATA enter field");
    setLoading(true)
    let res = await axios.post("https://token.ciphercore.io/deploy/pepetoken", {
      contractName: contractName,
      templateName: templateName,
      name: name,
      symbol: symbol,
      totalSupply:totalSupply,
      verify:verify,
      privateKey: privateKey,
      chainId:Number(selectedValue)
    });
    console.log(res.data, "resJson");

    if (res.status === 200) {
      console.log("success");
      toast("Form Submitted Succesfull");
      setActivePopup(true);
      setContractName("");
      // setTemplateName("");
      setName("");
      setSymbol("");
      setTotalSupply("");
      setPrivatekey("");
      setSelectedValue("");
      setLoading(false)
      // Add any success handling logic here
        if(res.data){
          let newPageUrl;
          if(selectedValue=="4002"){
            newPageUrl=`https://testnet.ftmscan.com/address/${res.data.contractAddress}`;
          }else if(selectedValue == "1"){
            newPageUrl=`https://etherscan.io/address/${res.data.contractAddress}`
          }else if(selectedValue == "250"){
            newPageUrl=`https://ftmscan.com/address/${res.data.contractAddress}`
          }else if(selectedValue == "56"){
            newPageUrl=`https://bscscan.com/address/${res.data.contractAddress}`
          }else if(selectedValue == "42161"){
            newPageUrl=`https://arbiscan.io/address/${res.data.contractAddress}`
          }else if(selectedValue == "137"){
            newPageUrl=`https://polygonscan.com/address/${res.data.contractAddress}`
          }else if(selectedValue == "97"){
            newPageUrl=`https://testnet.bscscan.com/address/${res.data.contractAddress}`
          }
          setLinkUrl(newPageUrl);
          setAddress(res.data.contractAddress)
          }else{
        console.log("responce error link");
      }

    } else {
      console.log("form error");
      // Add any error handling logic here
    }
  } catch (err) {
    toast.error("something went wrong")
    console.log(err);
    setLoading(false)

  }
};
  return (
    <>
    <form onSubmit={handleSubmit}  className="flex flex-col ">
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter contract name without space' name="contractName" onChange={(e)=>setContractName(e.target.value)} value={contractName} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter token symbol' name="symbol" onChange={(e)=>setSymbol(e.target.value)} value={symbol} className="input-bg md:w-[40%] w-full"/>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="text" placeholder='Enter token name' name='name' onChange={(e)=>setName(e.target.value)} value={name} className="input-bg md:w-[60%] w-full"/>
      <input type="text" placeholder='Enter wallet private key' name='privateKey' onChange={handlePrivateKey}  value={privateKey} className="input-bg md:w-[40%] w-full" />
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <input type="number" placeholder='Enter token  supply (exclude decimal digit)' name='totalSupply' onChange={(e)=>setTotalSupply(e.target.value)} value={totalSupply} className="input-bg md:w-[60%] w-full"/>
      </div>
      <div className='flex md:gap-5 md:flex-row  flex-col'>
      <div className='md:w-[60%] w-full'>
      <p className='my-3 '>Varify Contract</p>
      <select className='input-bg w-44' name="verify" onChange={(e)=>setVerify(e.target.value==="true"?true:false)}>
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
      </div>
      <select className="input-bg md:w-[40%] w-full" name="selectedValue" onChange={(e)=>setSelectedValue(e.target.value)} >
      <option value="" disabled> Select chain id</option>       
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
    <button type='submit' className="submit-btn w-[80%] mx-auto 2x:mt-5 xl:mt-0">  {
        loading?
         <ClipLoader
          color="white"
          loading={loading}
          className="block mx-auto border-red"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
      />:"submit"
            }</button>    </div>
    </form>
    <ToastContainer/>
    {activePopup && <ContractDeployedModal address={address} LinkUrl={LinkUrl} setActivePopup={setActivePopup}/>}</>)
}
export default PepeToken
