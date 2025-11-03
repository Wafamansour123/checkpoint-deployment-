import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart} from '../redux/slices/cartSlice'
import { AddToLibrary,GetUserData,GetUserLibrary,GetUserWishlist} from '../redux/slices/profileSlice'

import { Link } from 'react-router-dom'


const GameCard = ({game}) => {
  const {userLibrary,userWishList} = useSelector(state => state.profile)
  const {isAuth}=useSelector((state)=>state.auth)
  const items = useSelector(state => state.cart.items)
  const [isInLibrary,setisInLibrary]=useState(false)


 
  
  const dispatch=useDispatch()
 
   
  
  const isInCart= items.some(item => item._id === game._id)
  
    useEffect(()=>{
      if(isAuth )
        
     { try {
      if (userLibrary.some(item => item._id === game._id)){
        return setisInLibrary(true)
      }
        return setisInLibrary(false)

     }
     catch(error){
     
     }
    }},[])
  
  
 
 
  
  const handleAddToCart = (game)=>{
    if (!isInCart){
      dispatch(addToCart(game))
      
    }
  }
 
  // for ( const element of userLibrary){
  //   if( element._id===game._id){
  //     return isInLibrary=true
      
  //   }
  //  return isInLibrary=false
  // }


  const handleAddToLibrary = (game)=>{
    const gameId={"gameId":`${game._id}`}
    if (!isInLibrary){
      dispatch(AddToLibrary(gameId))
      
    }
  }

  
   

  return (
    
    
      
      <Link className='gamecard'  >
        
        <img className='poster' src={game.image}/>
        <div className='info'>
          <h1 className='gametitle'>{game.title}</h1>
          <h2 className='gametitle'>{game.genre.map((genre)=>genre.title)}</h2>
          <h3 className='gametitle'>{game.price}</h3>
          
          <h2 className='gametitle'>{game.publisher.companyname}</h2>
          {game.price !== 0 && isInLibrary===false &&  <button className='orderbtn' onClick={()=>handleAddToCart(game)} disabled={isInCart} >Add To cart</button> }
          {game.price === 0 &&  isInLibrary===false && <button className='orderbtn' onClick={()=>handleAddToLibrary(game)} disabled={isInCart} >Add To Library</button> }
          { isInLibrary===true &&  <button className='orderbtn' disabled={true} >Already in Library</button> }
          
          
        </div>
          
        
      </Link>
      
     
   
  )
}

export default GameCard