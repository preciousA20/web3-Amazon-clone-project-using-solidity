import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
    
    const connectHandler = async()=>{
        if(!account){
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts"})
            const account = ethers.utils.getAddress(accounts[0])
            setAccount(account)
        }else{
            setAccount(null)
        }
    }


    return (
        <nav>
            <div className='nav__brand'>
                <h1>Dappazon</h1>
            </div>

            <input type='text' className='nav__search'/>

           {
            account ? (
                <button type='button' className='nav__connect'>
                    {account.slice(0, 10)+"..."}
                </button>
            ) : (
                <button type='button' onClick={()=>connectHandler()} className='nav__button'>
                    Connect
                </button>
            )
           }

            <ul className='nav__links'>
                <li><a href='#Clothing & Jewery'>Clothing & Jewery</a></li>
                <li><a href='#Electronics & Gadgets'>Electronics & Gadgets</a></li>
                <li><a href='#Toys & Gaming'>Toys & Gaming</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;