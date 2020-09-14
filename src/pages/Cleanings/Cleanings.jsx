import React from 'react'
import MoldeDetail from './MoldeDetail.jsx'
import CyclesCleaning from './CyclesCleanings'
import './Cleanings.css'

const Cleanings = () =>{
    return(
        <div className='cleanings-container'>
            <MoldeDetail/>
            <CyclesCleaning/>
        </div>
    )
}

export default Cleanings