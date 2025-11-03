import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import gameSlice from "./slices/gameSlice"
import profileSlice from "./slices/profileSlice"
import cartSlice from "./slices/cartSlice"
import orderSlice from "./slices/orderSlice"

export default configureStore({reducer:{
    auth:authSlice,
    games:gameSlice,
    profile:profileSlice,
    cart:cartSlice,
    order:orderSlice,
   
    

}})