import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios'

export const GetAllGames = createAsyncThunk("getAllGames",async(data,{isRejectedWithValue})=>{
    try{
        const res =await axios.get("/user/getallgames",data)
        return res.data
    }
    catch(error){
        isRejectedWithValue(error.response.data.msg)
    }
}
)

// export const GetGameById = createAsyncThunk("getGameByid",async(data,{isRejectedWithValue})=>{
//     try{
//         const res =await axios.post("/user/getgamebyid",data)
//         return res.data
//     }
//     catch(error){
//         isRejectedWithValue(error.response.data.msg)
//     }
// }
// )

const gameSlice=createSlice({
    name:"game",
    initialState:{
        isLoading:false,
        error:null,
        gameList:[],
        gameInfoLoading:false,
        gameinfo:{},

    },
reducers:{

},
extraReducers:(builder)=>{
    builder
    .addCase(GetAllGames.pending,(state)=>{
        state.isLoading=true
        state.error=null
    })
    .addCase(GetAllGames.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=null
        state.gameList=action.payload.games
        
          
        
    })
    .addCase(GetAllGames.rejected,(state,action)=>{
        state.error=action.payload
        state.isAuth=false
    })

    // .addCase(GetGameById.pending,(state)=>{
    //     state.gameInfoLoading=true
    //     state.error=null
    // })
    // .addCase(GetGameById.fulfilled,(state,action)=>{
    //     state.gameInfoLoading=false
    //     state.error=null
    //     state.gameinfo=action.payload.gameinfo
    // })
    // .addCase(GetGameById.rejected,(state,action)=>{
    //     state.error=action.payload
    // })
}
})
export default gameSlice.reducer
// export const {GetLatestGames}=gameSlice.actions