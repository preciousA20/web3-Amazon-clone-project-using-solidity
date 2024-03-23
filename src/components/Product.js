import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {

  return (
    <div className="product">
      <div className='product__details'>
        <div className='product__image'>
          <img src={item.image} alt='image' />
        </div>

        <div className='product__overview'>
          <h2>{item.name}</h2>

          <Rating value={item.Rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatEther(item.cost)} ETH</h2>

          <hr />

          <h3>Overview</h3>

          <p>{item.description}
            loadBlockchainData lorem ipsum and the product is very good and bad only when one
            uses it in a bad way!

          </p>

        </div>

        <div className='product__order'>
              <h2>{ethers.utils.formatEther(item.cost)} ETH</h2>
              write here
          </div>

      </div>
    </div >
  );
}

export default Product;