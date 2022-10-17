import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateApi } from './apiSlice'


function RenovarApi() {
    const [api, setApi] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(updateApi(api))
        navigate('/')
    }

    const handlerChange = (e)=>{
        setApi(e.target.value)
    }
  return (
    <form onSubmit={handleSubmit} >
        <input type='text' name='api_key'onChange={handlerChange} placeholder='kQr2ZvHJDcLMWhC96pDyE5SkXT7Nw4R6bwaprTZe'></input>
        <button type='submit'>Change Api key</button>
    </form>
  )
}

export default RenovarApi