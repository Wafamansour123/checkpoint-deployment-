import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from './Cart';
import { CreateOrder } from '../redux/slices/orderSlice'
import { logout } from '../redux/slices/authSlice'
import { GetUserData,GetUserLibrary,GetUserWishlist} from '../redux/slices/profileSlice'


const NavBar = () => {
  const {isAuth,userInfo}=useSelector((state)=>state.auth)
  const {items}=useSelector((state)=>state.cart)
  const {userData,userDataIsLoading,userLibrary,userLibraryIsLoading,userWishlist,userWishlistIsLoading}=useSelector((state)=>state.profile)
  const [isClicked,setIsClicked]=useState(false)
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const [gameList,setGameList]=useState({})
  const dispatch =useDispatch()

  const handleCartVisibility=()=>{
    if (items.length>0){
      if(!isClicked)
        return setIsClicked(true)
       
       else return setIsClicked(false)
     }
     return setIsClicked(false)
    }
    
    useEffect(()=>{
          dispatch(GetUserData())
       },[])
    
    useEffect(()=>{
    const  newList={gameList:items.map((item)=>item._id)}
    
    setGameList(newList)
    },[items])
    

    const handleOrder=(gameList)=>{
      dispatch(CreateOrder(gameList))
    }



  
  return (
    <div className='NavBar'>
      <div>STEEM</div>
      <div className='homeandstore'> 
        <Link to={"/"} className='home' >Home</Link> 
        <Link to={"/"} className='store' >Store</Link>
        
      </div>
      <div className='rightsidebar'>
        <button >
          <CiShoppingCart className='icon' onClick={()=>handleCartVisibility()} />
          <div className={isClicked===true ? "cart" : "hiddencart"} >
            { items.map((item)=><Cart item={item} key={item._id}  /> )}
            <div >Total Price:{totalPrice}</div>
            <input type='submit' className='order' value="Order" onClick={()=>handleOrder(gameList)} ></input>
            
          </div>
      </button>
      {(isAuth)? 
          <div className='rightsidenavbar1'>
            <Link className='logout' onClick={()=>dispatch(logout())} >LogOut</Link>
            <Link to={"/profile"} className='profile'>{userInfo.alias}</Link>
            <div className='balance' >Balance:{userData.balance}Usd </div>
            
          </div>
          :
          <div className='rightsidenavbar2'>
            <Link to={"/register"} >Register</Link>
            <Link to={"/login"} >Login</Link>
            
          </div>
}     </div>
</div>
  )
}

export default NavBar