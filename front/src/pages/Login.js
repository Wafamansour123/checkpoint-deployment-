import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../redux/slices/authSlice';


const Login = () => {
  const {isAuth}=useSelector((state)=>state.auth)
  const navigate =useNavigate()
    useEffect(()=>{
      if (isAuth){
        navigate("/")
       
      }
    },[isAuth])
  const dispatch =useDispatch()
  const { register ,handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
     dispatch(LoginUser(data))
   }
 
  return (

    <div className='formcontainer'>
      
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='formtitle'>
        <h1 >Create Account</h1>
      </div>
      <div>
        <h3>Email:</h3>
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      </div>
      <div>
        <h3>Password:</h3>
        <input type="password" placeholder="password" {...register("password", {required: true})} />
      </div>
      <div>
      <input type="submit" className='submit' />
      </div>
    </form>
  </div>

  
  )
}

export default Login
