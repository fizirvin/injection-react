import React from 'react'
import { connect } from 'react-redux'

const MoldeCalendar = ({molde, selected, days, machines, moldes, year, month} ) =>{

    const renderShift = (shift) =>{
        if(selected && moldes.length > 0 && machines.length > 0){
            const cycles = selected.filter(cycle => cycle.shift === shift).map((cycle, index) =>{
                const machine = machines.find( item => item._id === cycle.machine) 
                const moldeQuantity = moldes.find( item => item._id === cycle.molde ).quantity
                const quantity = selected.slice(0,index+1).reduce( (a, b) =>{
                    return a + b.real || 0
                },0)
                const status = moldeQuantity >= quantity ? 'green-calendar': 'red-calendar' 
                
                return {status, quantity, machine: machine.machineNumber, date: cycle.date, shift: cycle.shift}
            })
            let i;
            let array = []
            for (i = 1; i <= days; i++) {
                const color = () =>{
                    const num = i.toString().length === 1 ? '0'+i : i.toString()
                    const setColor = cycles.find( item => item.date === `${year}-${month}-${num}`)
                    return setColor ? setColor.status : null
                }
                array = [...array, <td rowSpan='1' key={i} className={`day-table ${color()}`}></td>]
            }
            return array
        }else{
            let i;
            let array = []
            for (i = 1; i <= days; i++) {
                array = [...array, <td rowSpan='1' key={i} className={`day-table`}></td>]
            }
            return array
        }
    }

    return(
        <tbody >
            <tr>
                <td rowSpan='2' colSpan='1'>{molde.moldeNumber}</td>
                {renderShift('1')} 
            </tr>
            <tr>
                {renderShift('2')}
            </tr>
        </tbody>
    ) 
}

const mapStateToProps = state =>({
    machines: state.machines,
    moldes: state.moldes
})

export default connect(mapStateToProps,{})(MoldeCalendar)

