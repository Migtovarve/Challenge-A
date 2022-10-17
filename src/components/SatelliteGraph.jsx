import React, { useEffect } from 'react'
import 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux'
import { getSatellites } from '../features/satellites/satelliteSlice'
import { Chart } from 'react-chartjs-2';

function SatelliteGraph() {
    const dispatch = useDispatch()  
    useEffect(() => {
        dispatch(getSatellites())
    }, [])

    const {satellites, names, velocities} = useSelector(state=> state.satellites)

    console.log(names, velocities)
    const data = {
        labels: names,
        datasets:[{
            label:'velocity (km/s)',
            backgroundColor:'#ff0',
            borderColor:'#000',
            borderWidth:1,
            hoberBackgroundColor:'#f00',
            hoberBorderColor:'#00f',
            data: velocities,
        }]
    }
    const options = {
        maintainAspectRatio:false,
        responsive: true,
    }

  return (
    <div style={{width:'80vw', height:'90vh'}}>
        <Chart type='bar' data={data} options={options} />
    </div>
  )
}

export default SatelliteGraph