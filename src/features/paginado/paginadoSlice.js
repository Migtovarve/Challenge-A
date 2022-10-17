

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage:0,
}

export const paginadoSlice = createSlice({
    name:'paginado',
    initialState,
    reducers:{
        setCurrentPage: ( state, action) =>{
            state.currentPage = action.payload
        }
    }
})

export const { setCurrentPage } = paginadoSlice.actions

export default paginadoSlice.reducer