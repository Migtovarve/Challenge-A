import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //api_key:'DEMO_KEY'
    api_key:'kQr2ZvHJDcLMWhC96pDyE5SkXT7Nw4R6bwaprTZe',

}

export const apiSlice = createSlice({
    name:'api_key',
    initialState,
    reducers:{
        updateApi:(state, action)=>{
            state.api_key = action.payload
        },
    }
})

export const  { updateApi  } = apiSlice.actions;

export default apiSlice.reducer;