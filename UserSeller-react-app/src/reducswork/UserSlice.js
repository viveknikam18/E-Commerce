import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    userData:null,
    isAuthenticated:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.userData = action.payload
            state.isAuthenticated = true
        },
        logout:(state)=>{
            state.userData=null
            state.isAuthenticated= false
        }
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer