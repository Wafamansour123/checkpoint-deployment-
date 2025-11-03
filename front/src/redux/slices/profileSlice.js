import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios'

export const GetUserData = createAsyncThunk("GetUserData",async(data,{isRejectedWithValue})=>{
    try{
        const token = localStorage.getItem('token');
        
        const res =await axios.get("/user/getuserdata", {
            headers: {
              token: token, // Add token to the 'token' header
            }
          },data)
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)
export const GetUserLibrary = createAsyncThunk("GetUserLibrary",async(data,{isRejectedWithValue})=>{
    try{
        const token = localStorage.getItem('token');
        
        const res =await axios.get("/user/getuserlibrary", {
            headers: {
              token: token, // Add token to the 'token' header
            }
          },data)
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)

export const GetUserWishlist = createAsyncThunk("GetUserWishlist",async(data,{isRejectedWithValue})=>{
    try{
        const token = localStorage.getItem('token');
        
        const res =await axios.get("/user/getuserwishlist", {
            headers: {
              token: token, // Add token to the 'token' header
            }
          },data)
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)
export const AddToLibrary = createAsyncThunk("AtToLibrary",async(data,{isRejectedWithValue})=>{
    try{
        const token = localStorage.getItem('token');
        
        const res =await axios.put("/user/updateuserlibrary",data, {
            headers: {
              token: token, // Add token to the 'token' header
            }
          })
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)


const profileSlice=createSlice({
    name:"profile",
    initialState:{
        userDataIsLoading:false,
        userLibraryIsLoading:false,
        userWishlistIsLoading:false,
        error:null,
        userData: {},
        userLibrary:[],
        userWishlist:{}
    },
reducers:{

},
extraReducers:(builder)=>{
    builder
    .addCase(GetUserData.pending,(state)=>{
        state.userDataIsLoading=true
        state.error=null
    })
    .addCase(GetUserData.fulfilled,(state,action)=>{
        state.userDataIsLoading=false
        state.error=null
        state.userData=action.payload.userData
       
        // localStorage.setItem("userData",JSON.stringify(state.userData))
    })
    .addCase(GetUserData.rejected,(state,action)=>{
        state.error=action.payload
    })
    .addCase(GetUserLibrary.pending,(state)=>{
        state.userLibraryIsLoading=true
        state.error=null
    })
    .addCase(GetUserLibrary.fulfilled,(state,action)=>{
        state.userLibraryIsLoading=false
        state.error=null
        state.userLibrary=action.payload.userLibrary.games
        // localStorage.setItem("userData",JSON.stringify(state.userData))
    })
    .addCase(GetUserLibrary.rejected,(state,action)=>{
        state.error=action.payload
    })
    .addCase(GetUserWishlist.pending,(state)=>{
        state.userWishlistIsLoading=true
        state.error=null
    })
    .addCase(GetUserWishlist.fulfilled,(state,action)=>{
        state.userWishlistIsLoading=false
        state.error=null
        state.userWishlist=action.payload.userWishlist.games
        // localStorage.setItem("userData",JSON.stringify(state.userData))
    })
    .addCase(GetUserWishlist.rejected,(state,action)=>{
        state.error=action.payload
    })
    .addCase(AddToLibrary.pending,(state)=>{
        state.error=null
    })
    .addCase(AddToLibrary.fulfilled,(state,action)=>{
        state.error=null
    
    })
    .addCase(AddToLibrary.rejected,(state,action)=>{
        state.error=action.payload
    })
}
})
export default profileSlice.reducer
