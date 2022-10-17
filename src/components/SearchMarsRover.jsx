import React, { useEffect, useState } from 'react'
import { getApiPhotos } from '../features/marsRover/marsRoverSlice'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '../features/paginado/paginadoSlice';

const initialDataState = {
    sol:"1000",
    camera:"all",
    page:'1',
    rover_name:'curiosity'
}
 
function SearchMarsRover() {
    const [data, setData] = useState(initialDataState)
    const dispatch = useDispatch()
    const api_key = useSelector(state => state.key.api_key)

    useEffect(() => {
        dispatch(getApiPhotos({data,api_key}));
    }, [] )
    
    const handlerChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const handlerSubmit = (e)=>{
        e.preventDefault();
        dispatch(getApiPhotos({data,api_key}))
        dispatch(setCurrentPage(0))

    }

  return (
    <div>
        <form onSubmit={handlerSubmit}>
            <label>Rover Name<select name="rover_name" id="" onChange={handlerChange}>
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
            </select></label><br/>

            <label>Martian rotation or day<input type="search" name="sol" id="" placeholder='1000' onChange={handlerChange}/></label><br/>

            <label>Rover Cameras<select name="camera" id="" onChange={handlerChange}>
                <option value="all">All cameras</option>
                <option value="FHAZ">Front Hazard Avoidance Camera</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry and Camera Complex</option>
                <option value="MAHLI">Mars Hand Lens Imager</option>
                <option value="MARDI">Mars Descent Imager</option>
                <option value="NAVCAM">Navigation Camera</option>
                <option value="PANCAM">Panoramic Camera</option>
                <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
            </select></label><br/>

            <button type="submit">Search</button>
        </form>
    </div>
  )
}

export default SearchMarsRover