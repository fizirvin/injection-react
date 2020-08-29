import React, { useEffect}  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMachines, selectMachine } from './actions'


import TableData from '../components/TableData'
import TableHeader from '../components/TableHeader'
import RenderItems from '../components/RenderItems'
import Spinner from '../components/Spinner'
import './Machines.css'

const header = [
    {h: 'Machine Number', w: '25%'},
    {h: 'Machine Serial', w: '30%'},
    {h: 'Closing Force (t)', w: '15%'},
    {h: 'Spindle D (mm)', w: '15%'},
    {h: <Link to="/machines/add"><button>Add Machine</button></Link>, w: '15%'}
]

const Machines = ({machines, fetchMachines, selectMachine}) =>{

  useEffect(() =>{
    if(machines.length === 0){
      fetchMachines()
    } 
  },[machines])

  const renderList = () =>{
      return machines.map( machine => {
      const {_id, machineNumber, machineSerial, closingForce, spindleDiameter} = machine
      return <tr key={_id}>
        <TableData className='table_data' style={{width: '25%'}} >{machineNumber}</TableData>
        <TableData className='table_data' style={{width: '30%'}} >{machineSerial}</TableData>
        <TableData className='table_data' style={{width: '15%'}}>{closingForce}</TableData>
        <TableData className='table_data' style={{width: '15%'}}>{spindleDiameter}</TableData>
        <TableData className='table_data' style={{width: '15%'}}><Link to={`/machines/update/${_id}`} onClick={()=>selectMachine(machine)}><button>Update</button></Link></TableData>
      </tr> }
    )
  }

    const renderBodyContainer = (array) =>{
        if(array.length === 0){
          return <div className='spinner_div'><Spinner></Spinner></div>
        } else {
          return (
            <div className='machines_body_container'>
              <table className='body_table'>
                <tbody>
                  {renderList()}
                </tbody>
              </table>
            </div>
          )
        }
    }

    return (
        <div className='page_container'>
          <div className='machines_table_container'>
            <TableHeader header={header} className={'machines_header_table'}/>
            {renderBodyContainer(machines)}
            <RenderItems items={machines}/>
          </div>
        </div>
    )
}

const mapStateToProps = state =>({
    machines: state.machines
})

export default connect(mapStateToProps, {fetchMachines, selectMachine})(Machines)