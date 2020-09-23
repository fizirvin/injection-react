import React from 'react'

const MoldeCalendar = ({molde, selected, days} ) =>{

    const renderDays = () =>{
        let i;
        let array = []
        for (i = 1; i <= days; i++) {
            array = [...array, <th key={i} className='day-table'></th>]
        }
        return array
    }

    return(
        <tbody >
            <tr>
                <td rowSpan='2' colSpan='1'>{molde.moldeNumber}</td>
            </tr>
            <tr>
                {renderDays()} 
            </tr>
        </tbody>
    ) 
}

 export default MoldeCalendar

