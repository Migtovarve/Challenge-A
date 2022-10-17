import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApiByDates } from '../features/marsRover/marsRoverSlice'
import { setCurrentPage } from '../features/paginado/paginadoSlice'

const initialDataState = {
    sol:'1000',
    earth_date:"",
    page:'1',
    rover_name:'curiosity'
}

function SearchDates() {

    const [data, setData] = useState(initialDataState)
    const dispatch = useDispatch()
    const api_key = useSelector(state => state.key.api_key)
    
    const handlerChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    
    console.log(data)
    const handlerSubmit = (e)=>{
        e.preventDefault();
        dispatch(getApiByDates({data,api_key}))
        dispatch(setCurrentPage(0))
    }


  return (
    <div>
        <form onSubmit={handlerSubmit}>

            <select name="rover_name" id="" onChange={handlerChange}>
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
            </select>

            <input type="date" name="earth_date" id="" onChange={handlerChange}/>
            <button type="submit">Search by dates</button>
        </form>
    </div>
  )
}

export default SearchDates