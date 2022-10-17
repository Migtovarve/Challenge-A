import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from 'axios'

const initialState = {
    status:'idle',
    satellites:[],
    names: [] ,
    velocities:[],
    error:''
}

export const getSatellites = createAsyncThunk(
    'getSatellites',
    async () => {
        let dataSatellites = [];
        let nameArr = []
        let velocityArr= []

        const response = await (await (axios.get(`https://tle.ivanstanojevic.me/api/tle/?page-size=10`))).data.member ;
        const satellitesId = response.map(async(element)=>{
            return axios.get(`https://tle.ivanstanojevic.me/api/tle/${element.satelliteId}/propagate`)  
        })     
        const res = await Promise.all(satellitesId)
        res.map((element)=>{
            nameArr.push(element.data.tle.name)
            velocityArr.push(element.data.vector.velocity.r)
            dataSatellites = [...dataSatellites, {
                    name:element.data.tle.name, 
                    id:element.data.tle.satelliteId,
                    velocity:element.data.vector.velocity.r
                }]
             })
        //The value we return becomes the `fulfilled` action payload
        return {dataSatellites, velocityArr, nameArr};
    }
  );

  
export const satelliteSlice = createSlice({
    name: 'satellites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getSatellites.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getSatellites.fulfilled, (state, action) => {
            state.status = 'idle';
            state.satellites = action.payload.dataSatellites;
            state.names = action.payload.nameArr;
            state.velocities = action.payload.velocityArr
            state.error = ''
          })
          .addCase(getSatellites.rejected,( state, action )=>{
            state.status = 'idle';
            state.error = action.error.message
          })
    },
})

export const { } = satelliteSlice.actions

export default satelliteSlice.reducer