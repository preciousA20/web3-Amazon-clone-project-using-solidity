import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    console.log(items)
    return (
        <div className='cards__section'>
            <h3 id={items.id}>{title}</h3>
            <hr />

            <div className='card'>
                {items.map((item, index)=>{
                    return (
                        <div key={index} className='card' id={index} onClick={()=>togglePop(item)}>
                            <div className='card__image'>
                                <img src={item.image} alt='item' />
                            </div>

                            <div className='card__info'>
                                <h4>{item.name}</h4>

                                <Rating value={item.Rating} />

                                <p>{ethers.utils.formatEther(item.cost)} ETH</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Section;