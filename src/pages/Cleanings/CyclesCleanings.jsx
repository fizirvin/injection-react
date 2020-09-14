import React,{ useEffect} from 'react'
import Spinner from '../../components/Spinner'
import { connect } from 'react-redux'
import { fetchCyclesCleanings } from './actions'

const CyclesCleaning = ({cyclesCleaning, loading, fetchCyclesCleanings, cycles, machines}) =>{
    useEffect(() =>{   
        if(cyclesCleaning){fetchCyclesCleanings(cyclesCleaning.molde._id, cyclesCleaning.date)}
        else{ return }
    },[fetchCyclesCleanings, cyclesCleaning])

    const renderCycles = () =>{


        return cycles.map(cycle =>{
            const machine = machines.find( item => item._id === cycle.machine) 
            return <tr>
                <td>{cycle.date}</td>
                <td>{machine.machineNumber}</td>
                <td>{cycle.shift}</td>
                <td>{cycle.real}</td>
                <td></td>
            </tr>
        })
    }

    if(!cyclesCleaning){ return null}
    else{
        return(
            <div className='cycles-container'>
                <table className='molde-detail-table'>
                    <thead>
                    <tr><td colSpan='5'>{cyclesCleaning.molde.moldeNumber} Last Cleaning: {cyclesCleaning.date} cycles: {cyclesCleaning.cycles}</td></tr>
                    <tr><th>date</th><th>Machine</th><th>Shift</th><th>Real</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td><Spinner/></td></tr>}
                        {cycles && renderCycles()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    cyclesCleaning: state.cleaningSelected,
    loading: state.loadingCyclesCleanings,
    cycles: state.cyclesCleaningsReducer,
    machines: state.machines
})

export default connect(mapStateToProps,{fetchCyclesCleanings})(CyclesCleaning)
