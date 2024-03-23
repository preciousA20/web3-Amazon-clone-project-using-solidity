import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import contractABI from './Dappazon.json'
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null)

  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)

  const [clothing, setClothing] = useState([])
  const [electronics, setElectronics] = useState([])
  const [toys, setToys] = useState([])

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)
  
const loadBlockchainData = async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  setProvider(provider)

  //const network = await provider.getNetwork()
  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const contract = new ethers.Contract(contractAddress, Dappazon, provider) 
  setContract(contract)

  let itemArray = []
  for(let i = 0; i < 9; i++){
    const result = await contract.items(i+1)
    itemArray.push(result)
  }
  const electronics = itemArray.filter((item)=>item.category === "electronics")
  const clothing = itemArray.filter((item)=>item.category === "clothing")
  const toys = itemArray.filter((item)=> item.category === "toys")
  setElectronics(electronics)
  setClothing(clothing)
  setToys(toys)
  //console.log(clothing)
}

const togglePop = (item) =>{
  setItem(item)
  toggle ? setToggle(false) : setToggle(true)
}

useEffect(()=>{
  loadBlockchainData()
},[])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}/>
      <h2>Dappazon Best Seller</h2>
      
      {
        clothing && electronics && toys && (
          <>
          <Section togglePop={togglePop} title={"Clothing and Jewelry"} items={clothing}/>
          <Section togglePop={togglePop} title={"Electronics and Gadgets"} items={electronics}/>
          <Section togglePop={togglePop} title={"Yoys and Gaming"} items={toys}/>
          </>
        )
      }

      {
        toggle && <Product item={item} provider={provider} account={account}  togglePop={togglePop}/>
      }
    </div>
  );
}

export default App;
