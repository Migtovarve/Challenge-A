import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from 'axios'

const initialState = {
    status:'idle',
    photos:[],

    error:''
}

export const getApiPhotos = createAsyncThunk(
    'getApiPhotos',
    async ({data, api_key}) => {
        const { sol, camera, page, rover_name} = data

        if (camera === "all") {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=${sol}&page=${page}&api_key=${api_key}`) ;
            //The value we return becomes the `fulfilled` action payload
            return response.data.photos;
        } else {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${api_key}`) ;
            //The value we return becomes the `fulfilled` action payload
            return response.data.photos;
        }
    }
  );

export const getApiByDates = createAsyncThunk(
    'getApiByDates',
    async ({data,api_key}) =>{
        const { sol, earth_date, page, rover_name} = data
        if (earth_date === "") {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=${sol}&page=${page}&api_key=${api_key}`) ;
            return response.data.photos;
        } else {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?earth_date=${earth_date}&page=${page}&api_key=${api_key}`) ;
            return response.data.photos;
        }
    }
 )
  

export const marsRoverSlice = createSlice({
    name: 'marsRover',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getApiPhotos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getApiPhotos.fulfilled, (state, action) => {
            state.status = 'idle';
            state.photos = action.payload;
            state.error = ''
          })
          .addCase(getApiPhotos.rejected,( state, action )=>{
            state.status = 'idle';
            state.error = action.error.message
          })
          .addCase(getApiByDates.pending, (state)=>{
            state.status = 'loading'
          })
          .addCase(getApiByDates.fulfilled, (state, action) => {
            state.status = 'idle';
            state.photos = action.payload;
            state.error = ''
          })
          .addCase(getApiByDates.rejected,( state, action )=>{
            state.status = 'idle';
            state.error = action.error.message
          })
    },
})


export const { } = marsRoverSlice.actions

// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
//   }

export default marsRoverSlice.reducer