import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../features/paginado/paginadoSlice'

function Cards() {
    //const {photos, status} = useSelector(state=> state.marsRover)
    const { marsRover:{photos, status}, paginado: {currentPage} } = useSelector(state=> state)
    const dispatch = useDispatch()

    const filterPhotos = ()=>{
        return photos.slice(currentPage, currentPage+5)
    }
    
    console.log(currentPage, photos.length - currentPage);
    const nextPage = ( ) => {
        if (photos.length - currentPage > 5) {
            dispatch(setCurrentPage(currentPage+5))
        }
    }
    const previousPage = ( ) => {
        if(currentPage>0){
            dispatch(setCurrentPage(currentPage-5))
        }
    }


    console.log(photos, filterPhotos())
  return (
      <div>
        {(status === 'loading')? <h2>Loading...</h2>
        :(!photos[0])?<h2>Not found photos</h2> 
        :filterPhotos().map((photo,idx)=>{
            return (
                <div key={idx}>
                    <h3>Rover name: {photo.rover.name}</h3>
                    <h3>Camera name: {photo.camera.full_name}</h3>
                    <h3>Fecha: {photo.earth_date}</h3>
                    <h3>Martian day: {photo.sol}</h3>
                    <img src={photo.img_src} style={{width:'200px', height:'150px'}} />
                </div>
            )
        })}
        <button onClick={previousPage}  >Previous</button>
        <button onClick={nextPage} >Next</button>
    </div>
  )
}

export default Cards