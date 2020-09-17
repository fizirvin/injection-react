import React,{ useEffect} from 'react'
import Spinner from '../../components/Spinner'
import { connect } from 'react-redux'
import { fetchCyclesCleanings } from './actions'

const CyclesCleaning = ({cyclesCleaning, loading, fetchCyclesCleanings, cycles, machines, moldes}) =>{
    useEffect(() =>{   
        if(cyclesCleaning){fetchCyclesCleanings(cyclesCleaning.molde._id, cyclesCleaning.date)}
        else{ return }
    },[fetchCyclesCleanings, cyclesCleaning])

    const renderCycles = () =>{


        return cycles.map((cycle, index) =>{
            const machine = machines.find( item => item._id === cycle.machine) 
            const moldeQuantity = moldes.find( item => item._id === cycle.molde ).quantity
            const quantity = cycles.slice(0,index+1).reduce( (a, b) =>{
                return a + b.real || 0
              },0)

            
            const status = moldeQuantity >= quantity ? 'green': 'red' 
            
            return <tr>
                <td>{index+1}</td>
                <td>{cycle.date}</td>
                <td>{machine.machineNumber}</td>
                <td>{cycle.shift}</td>
                <td>{cycle.real}</td>
                <td><div className={status}>{quantity}</div></td>
            </tr>
        })
    }

    if(!cyclesCleaning){ return null}
    else{
        return(
            <div className='cycles-container'>
                <table className='molde-detail-table'>
                    <thead>
                    <tr><td colSpan='6'>{cyclesCleaning.molde.moldeNumber} Last Cleaning: {cyclesCleaning.date} cycles: {cyclesCleaning.cycles}</td></tr>
                    <tr>
                        <th>#</th>
                        <th>date</th><th>Machine</th><th>Shift</th><th>Real</th><th>Status</th></tr>
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
    machines: state.machines,
    moldes: state.moldes
})

export default connect(mapStateToProps,{fetchCyclesCleanings})(CyclesCleaning)
