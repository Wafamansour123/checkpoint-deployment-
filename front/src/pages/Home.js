import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllGames} from '../redux/slices/gameSlice'
import GameCard from '../components/GameCard'
import { GetUserLibrary,GetUserWishlist} from '../redux/slices/profileSlice'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";   
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollToPlugin);


const Home = () => {
   const{gameList,isLoading,error}=useSelector((state)=>state.games)
   const {isAuth}=useSelector((state)=>state.auth)
   
   const [latestGames,setLatestGames]=useState([])
   const [freeGames,setFreeGames]=useState([])
   
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(GetAllGames())}
  ,[])
  useEffect(()=>{
    if(isAuth){
      dispatch(GetUserLibrary())
      dispatch(GetUserWishlist())
    }
    
  }
    ,[])
    

  const sortByDate = (a,b)=>{
    const dateA = new Date(a.releasedate)
    const dateB = new Date(b.releasedate)
    if (dateA< dateB) return 1
    else if (dateA > dateB) return -1
    return 0
  }


  useEffect(()=>{
     setLatestGames([...gameList].sort(sortByDate).slice(0,10))
     setFreeGames([...gameList].filter((game)=>game.price===0))
  },[gameList])


  useGSAP(
    () => {
      
        gsap.from(".latestgames", {
          y: 500,
          opacity:0,
          scale:1.2,
          
          scrollTrigger: {
            trigger: ".latestgames",
            start: 'top bottom',
            end: 'top 0 ',
            snap:1/1,
           
            // markers: true,
          },
        
        });
      });
      useGSAP(
        () => {
          
            gsap.from(".freegames", {
              y: 500,
              opacity:0,
              scale:1.2,
              
              scrollTrigger: {
                trigger: ".freegames",
                start: 'top bottom',
                end: 'top 0 ',
                snap:1/1,
      
                // markers: true,
              },
            
            });
          });



  
   


  return (
    <div className='homecontainer'>
      <section className='pickofd'>
        <h1 className='herotitle'>Pick Of The Day</h1>
      </section>
      <section className='content'>
        <div id='latestgames' className='latestgames'>
        
          {isLoading && <h2>Loading</h2>}
          {!isLoading &&  <> 
            <h1 className='sectiontitle'>Latest Games</h1> 
            <div className='carousel'  >
            {  latestGames.map((game)=><GameCard game={game} key={game._id}  /> )}
            </div>
          </>
          }
        </div>
         <div className='freegames'>
        
          {isLoading && <h2>Loading</h2>}
          {!isLoading && 
          <> 
          <h1>Free Games</h1>
          <div className='carousel'>
          { freeGames.map((game)=><GameCard game={game} key={game._id}  /> )}
          </div>
          </>
          }

        </div> 

        <div className='toppublishers'  style={{display:"flex"}}>
        
         
          <div className='box'>TOP Publishers</div>
          <div className='box'>TOP Publishers</div>
          <div className='box'>TOP Publishers</div>
          <div className='box'>TOP Publishers</div>
          <div className='box'>TOP Publishers</div>
          
          
        </div> 
        
        </section>
    </div>
  )
}

export default Home