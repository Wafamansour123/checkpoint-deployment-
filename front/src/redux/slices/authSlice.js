import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios'

export const RegisterUser = createAsyncThunk("Register",async(data,{isRejectedWithValue})=>{
    try{
        const res =await axios.post("/user/register",data)
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)

export const LoginUser = createAsyncThunk("Login",async(data,{isRejectedWithValue})=>{
    try{
        const res =await axios.post("/user/login",data)
        
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLoading:false,
        token:localStorage.getItem("token")|| null,
        error:null,
        isAuth:Boolean(localStorage.getItem("isAuth"))|| false,
        userInfo:JSON.parse(localStorage.getItem("userInfo")) || {}
    },
reducers:{
logout:(state)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("isAuth")
    state.token=null
    state.isAuth=false
    localStorage.removeItem("userInfo")
}
},
extraReducers:(builder)=>{
    builder
    .addCase(RegisterUser.pending,(state)=>{
        state.isLoading=true
        state.error=null
    })
    .addCase(RegisterUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.token=action.payload.token
        state.error=null
        state.isAuth=true
        state.userInfo=action.payload.userInfo
        localStorage.setItem("userInfo",JSON.stringify(state.userInfo))
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)
    })
    .addCase(RegisterUser.rejected,(state,action)=>{
        state.error=action.payload
        state.isAuth=false
    })

    .addCase(LoginUser.pending,(state)=>{
        state.isLoading=true
        state.error=null
    })
    .addCase(LoginUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.token=action.payload.token
        state.error=null
        state.isAuth=true
        state.userInfo=action.payload.userInfo
        localStorage.setItem("userInfo",JSON.stringify(state.userInfo))
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)
    })
    .addCase(LoginUser.rejected,(state,action)=>{
        state.error=action.payload
        state.isAuth=false
    })
}
})
export default authSlice.reducer
export const {logout}=authSlice.actions