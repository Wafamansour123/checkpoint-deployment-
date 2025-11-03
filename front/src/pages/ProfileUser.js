import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { GetUserData,GetUserLibrary,GetUserWishlist} from '../redux/slices/profileSlice'
import LibGameCard from "../components/LibGameCard"


const ProfileUser = () => {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const {isAuth}=useSelector((state)=>state.auth)
  const {userData,userDataIsLoading,userLibrary,userLibraryIsLoading,userWishlist,userWishlistIsLoading}=useSelector((state)=>state.profile)

  const [selected,setSelected]=useState('aboutme')
  
 
  
  
    useEffect(()=>{
      if (!isAuth){
        navigate("/")
      }
    },[isAuth])

    
      useEffect(()=>{
      dispatch(GetUserData())
   }
      ,[])
      const handleUserLibrary=()=>{
        dispatch(GetUserLibrary())
    
      }
      const handleUserWishlist=()=>{
        dispatch(GetUserWishlist())
    
      }
      

      const handleselect=(selection)=>{
        if (selection==='aboutme')
          return setSelected('aboutme')
        if (selection==='library')
          return setSelected('library')
        if (selection==='wishlist')
          return setSelected('wishlist')
      }
  return (
    <div className='profilepage'>
      <section className='cover'>
        <img className='coverpic' src='https://cdn.wallpaper.tn/large/4K-Wallpaper-Gaming-88685.jpg'/>
      </section>
      <section className='container'>
        <div className='sections'>
          <div onClick={()=>{ handleselect('aboutme')}} className={selected==="aboutme" ? "selected" :"normal"} ><h1>About Me</h1></div>
          <div onClick={()=>{handleUserLibrary();handleselect('library')}}className={selected==="library" ? "selected" :"normal"}><h1>Library</h1></div>
          <div onClick={()=>{handleUserWishlist();handleselect('wishlist')}}className={selected==="wishlist" ? "selected" :"normal"}><h1>Wishlist</h1></div>
        </div>

        {selected==='aboutme' && <div className='aboutsection'>
         <h1>About Me</h1> 
         <div>
          <h2>Name:{userData.firstname}</h2>
          <h2>Last Name:{userData.lastname}</h2>
          <h2>Username:{userData.alias}</h2>
          <h2>Email:{userData.email}</h2>
          <h2>Joined Since:{userData.createdAt}</h2>
         </div>
        </div>
}
        {selected ==='library' && <div className='librarysection'>
          <h1>Library</h1>
          {userLibraryIsLoading && <h2>Loading</h2>}
          {!userLibraryIsLoading && userLibrary.length > 0 && <div>{ userLibrary.map((game,idx)=><LibGameCard game={game} key={idx}   /> )}</div>}
          
        </div>}

        
          {selected==='wishlist' &&<div className='wishlistsection'>
          <h1>Wishlist</h1>
         
          {userWishlistIsLoading && <h2>Loading</h2>}
          {!userWishlistIsLoading && <div>{ userWishlist.map((game,idx)=><LibGameCard game={game} key={idx}  /> )}</div>}
         
        </div> }

        

      </section>
    </div>
  )
}

export default ProfileUser