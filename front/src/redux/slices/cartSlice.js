import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios'





const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:JSON.parse(localStorage.getItem("items"))|| [],
        totalPrice:0
    },
reducers:{
    addToCart:(state,action)=>{
        const existingItem= state.items.find(item=>item._id === action.payload._id)
        if (!existingItem){
            state.items.push({...action.payload})
        }
        localStorage.setItem("items", JSON.stringify (state.items))
    },
    removeFromCart:(state,action)=>{
        state.items = JSON.parse(localStorage.getItem("items")).filter(item=>item._id !== action.payload._id)
        localStorage.setItem("items", JSON.stringify (state.items))
    },
    clearCart:(state)=>{
        state.items=[]
        localStorage.removeItem("items")
    }
},
extraReducers:(builder)=>{
  
}
})
export default cartSlice.reducer
export const {addToCart,removeFromCart,clearCart}=cartSlice.actions
