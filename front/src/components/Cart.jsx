import React from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const Cart = (item) => {
  const dispatch =useDispatch()
  const handleRemoveFromCart=(item)=>{
    dispatch(removeFromCart(item))
    
  }
 
  return (
    <div className='cartitem'>
        <div className='iteminfo'>
            
              <img src={item.item.image}/>
            
            <p>{item.item.title}</p>
            <p>Price:{item.item.price} USD</p>
            
        </div>
        <IoIosRemoveCircle className='deleteitem' onClick={()=>handleRemoveFromCart(item.item)} />
    </div>
  )
}

export default Cart