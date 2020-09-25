import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMoldeCleanings } from '../Cleanings/actions'
import { fetchSelectedCycles } from './actions'
import Spinner from '../../components/Spinner'
import './calendar.css'
import MoldeCalendar from './MoldeCalendar'


const date = new Date()
const year = date.getFullYear()

const Calendar =  ({fetchMoldeCleanings, fetchSelectedCycles, cleanings, loadingCleanings, selectedCycles, loadingSelectedCycles}) =>{
    
    useEffect(() =>{
        if(cleanings.length === 0 ){ 
            fetchMoldeCleanings()
        }
    },[cleanings, fetchMoldeCleanings])

    useEffect(() =>{
        if(!selectedCycles){ 
            
            fetchSelectedCycles()
        }
    },[selectedCycles,fetchSelectedCycles])

    
    const getMonth = () =>{
        const calendar =[
            {   month: 'January',
                days: 30,
                m: '01' 
            },
            {   month: 'February',
                days: 28,
                m: '02'
            },
            {   month: 'March',
                days: 31,
                m: '03'
            },
            {   month: 'April',
                days: 30,
                m: '04'
            },
            {   month: 'May',
                days: 31,
                m: '05'
            },
            {   month: 'June',
                days: 30,
                m: '06'
            },
            {   month: 'July',
                days: 31,
                m: '07'
            },
            {   month: 'August',
                days: 31,
                m: '08'
            },
            {   month: 'September',
                days: 30,
                m: '09'
            },
            {   month: 'October',
                days: 31,
                m: '10'
            },
            {   month: 'November',
                days: 30,
                m: '11'
            },
            {   month: 'December',
                days: 31,
                m: '12'
            }
        ]
        const date = new Date()
        const month = date.getMonth()
        return calendar[month]
    }

    const renderDays = ( ) =>{
        let i;
        let array = []
        for (i = 1; i <= getMonth().days; i++) {
            array = [...array, <th key={i}>{i}</th>]
        }
        return array
    }

    const renderMoldeCalendar = (arr)=>{
        if(arr.length === 0 ){ return null }
        else {
            return arr.map( (cleaning) =>{
                const {_id, molde } = cleaning
                if(!selectedCycles){
                    return <MoldeCalendar key={_id} molde={molde} selected={null} days={getMonth().days}/>
                }
                else{
                    const selected = selectedCycles.filter( cyc => cyc.molde === molde._id )
                    return <MoldeCalendar key={_id} molde={molde} selected={selected} days={getMonth().days}/>

                }
            })
        }
    }


    return(
        loadingCleanings ? <Spinner></Spinner> :
        <div className='calendar-container'>
            <table className='calendar-table'>
                <thead>
                    <tr>
                        <th className='month-calendar' colSpan={getMonth().days+1}>{getMonth().month}</th>
                    </tr>
                    <tr>
                       <th>Mold</th>
                       {renderDays()} 
                    </tr>                    
                </thead>
                {!loadingSelectedCycles && renderMoldeCalendar(cleanings.filter(item => item.active === true && item.date >= `${year}-${getMonth().m}-01` && item.date <= `${year}-${getMonth().m}-31` ))}
            </table>
        </div>
    )
}

const mapStateToProps = state =>({
    moldes: state.moldes,
    cleanings: state.cleanings,
    loadingCleanings: state.loadingCleanings,
    selectedCycles: state.selectedCycles,
    selectedCyclesMessage: state.selectedCyclesMessage,
    loadingSelectedCycles: state.loadingSelectedCycles
})

export default connect(mapStateToProps,{fetchMoldeCleanings, fetchSelectedCycles })(Calendar)