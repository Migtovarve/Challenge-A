import { configureStore } from "@reduxjs/toolkit";
import apiReducer from '../features/apikey/apiSlice'
import marsRoverReducer from '../features/marsRover/marsRoverSlice'
import paginadoReducer from "../features/paginado/paginadoSlice";
import satelliteReducer from "../features/satellites/satelliteSlice";


export const store = configureStore({
    reducer:{
        key:apiReducer,
        marsRover:marsRoverReducer,
        paginado:paginadoReducer,
        satellites:satelliteReducer,
    },
})