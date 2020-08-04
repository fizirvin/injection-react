import React, { } from 'react'

const BodyTable = ({columns, period}) =>{
    
  const renderColumns = () =>{
      if(period === 'trimester'){
        return <tbody>
          <tr>
            <td className='trimester_total_title'>Total Real (pcs)</td>
            <td className='trimester_total_day'>{columns[0].real}</td>
            <td className='trimester_total_day'>{columns[1].real}</td>
            <td className='trimester_total_day'>{columns[2].real}</td>
            <td className='trimester_total'>{columns[3].real}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total NG (pcs)</td>
            <td className='trimester_total_day'>{columns[0].ng}</td>
            <td className='trimester_total_day'>{columns[1].ng}</td>
            <td className='efficiency_total_day'>{columns[2].ng}</td>
            <td className='trimester_total'>{columns[3].ng}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total OK (pcs)</td>
            <td className='trimester_total_day'>{columns[0].ok}</td>
            <td className='trimester_total_day'>{columns[1].ok}</td>
            <td className='trimester_total_day'>{columns[2].ok}</td>
            <td className='trimester_total'>{columns[3].ok}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total Plan (pcs)</td>
            <td className='trimester_total_day'>{columns[0].plan}</td>
            <td className='trimester_total_day'>{columns[1].plan}</td>
            <td className='trimester_total_day'>{columns[2].plan}</td>
            <td className='trimester_total'>{columns[3].plan}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total Worktime (hrs)</td>
            <td className='trimester_total_day'>{columns[0].wtime}</td>
            <td className='trimester_total_day'>{columns[1].wtime}</td>
            <td className='trimester_total_day'>{columns[2].wtime}</td>
            <td className='trimester_total'>{columns[3].wtime}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total Downtime (hrs)</td>
            <td className='trimester_total_day'>{columns[0].dtime}</td>
            <td className='trimester_total_day'>{columns[1].dtime}</td>
            <td className='trimester_total_day'>{columns[2].dtime}</td>
            <td className='trimester_total'>{columns[3].dtime}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total OEE (%)</td>
            <td className='trimester_total_day'>{columns[0].oee}</td>
            <td className='trimester_total_day'>{columns[1].oee}</td>
            <td className='trimester_total_day'>{columns[2].oee}</td>
            <td className='trimester_total'>{columns[3].oee}</td>
          </tr>
          <tr>
            <td className='trimester_total_title'>Total Purge (g)</td>
            <td className='trimester_total_day'>{columns[0].purge}</td>
            <td className='trimester_total_day'>{columns[1].purge}</td>
            <td className='trimester_total_day'>{columns[2].purge}</td>
            <td className='trimester_total'>{columns[3].purge}</td>
          </tr>
        </tbody>
      }
      else if(period === 'day' && columns.length > 5){
        return <tbody>
        <tr>
          <td className='efficiency_total_machine'>Total Real (pcs)</td>
          <td className='efficiency_total_day'>{columns[0].real}</td>
          <td className='efficiency_total_day'>{columns[1].real}</td>
          <td className='efficiency_total_day'>{columns[2].real}</td>
          <td className='efficiency_total_day'>{columns[3].real}</td>
          <td className='efficiency_total_day'>{columns[4].real}</td>
          <td className='efficiency_total_day'>{columns[5].real}</td>
          <td className='efficiency_total_day'>{columns[6].real}</td>
          <td className='efficiency_total_week'>{columns[7].real}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total NG (pcs)</td>
          <td className='efficiency_total_day'>{columns[0].ng}</td>
          <td className='efficiency_total_day'>{columns[1].ng}</td>
          <td className='efficiency_total_day'>{columns[2].ng}</td>
          <td className='efficiency_total_day'>{columns[3].ng}</td>
          <td className='efficiency_total_day'>{columns[4].ng}</td>
          <td className='efficiency_total_day'>{columns[5].ng}</td>
          <td className='efficiency_total_day'>{columns[6].ng}</td>
          <td className='efficiency_total_week'>{columns[7].ng}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total OK (pcs)</td>
          <td className='efficiency_total_day'>{columns[0].ok}</td>
          <td className='efficiency_total_day'>{columns[1].ok}</td>
          <td className='efficiency_total_day'>{columns[2].ok}</td>
          <td className='efficiency_total_day'>{columns[3].ok}</td>
          <td className='efficiency_total_day'>{columns[4].ok}</td>
          <td className='efficiency_total_day'>{columns[5].ok}</td>
          <td className='efficiency_total_day'>{columns[6].ok}</td>
          <td className='efficiency_total_week'>{columns[7].ok}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total Plan (pcs)</td>
          <td className='efficiency_total_day'>{columns[0].plan}</td>
          <td className='efficiency_total_day'>{columns[1].plan}</td>
          <td className='efficiency_total_day'>{columns[2].plan}</td>
          <td className='efficiency_total_day'>{columns[3].plan}</td>
          <td className='efficiency_total_day'>{columns[4].plan}</td>
          <td className='efficiency_total_day'>{columns[5].plan}</td>
          <td className='efficiency_total_day'>{columns[6].plan}</td>
          <td className='efficiency_total_week'>{columns[7].plan}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
          <td className='efficiency_total_day'>{columns[0].wtime}</td>
          <td className='efficiency_total_day'>{columns[1].wtime}</td>
          <td className='efficiency_total_day'>{columns[2].wtime}</td>
          <td className='efficiency_total_day'>{columns[3].wtime}</td>
          <td className='efficiency_total_day'>{columns[4].wtime}</td>
          <td className='efficiency_total_day'>{columns[5].wtime}</td>
          <td className='efficiency_total_day'>{columns[6].wtime}</td>
          <td className='efficiency_total_week'>{columns[7].wtime}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total Downtime (hrs)</td>
          <td className='efficiency_total_day'>{columns[0].dtime}</td>
          <td className='efficiency_total_day'>{columns[1].dtime}</td>
          <td className='efficiency_total_day'>{columns[2].dtime}</td>
          <td className='efficiency_total_day'>{columns[3].dtime}</td>
          <td className='efficiency_total_day'>{columns[4].dtime}</td>
          <td className='efficiency_total_day'>{columns[5].dtime}</td>
          <td className='efficiency_total_day'>{columns[6].dtime}</td>
          <td className='efficiency_total_week'>{columns[7].dtime}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total OEE (%)</td>
          <td className='efficiency_total_day'>{columns[0].oee}</td>
          <td className='efficiency_total_day'>{columns[1].oee}</td>
          <td className='efficiency_total_day'>{columns[2].oee}</td>
          <td className='efficiency_total_day'>{columns[3].oee}</td>
          <td className='efficiency_total_day'>{columns[4].oee}</td>
          <td className='efficiency_total_day'>{columns[5].oee}</td>
          <td className='efficiency_total_day'>{columns[6].oee}</td>
          <td className='efficiency_total_week'>{columns[7].oee}</td>
        </tr>
        <tr>
          <td className='efficiency_total_machine'>Total Purge (g)</td>
          <td className='efficiency_total_day'>{columns[0].purge}</td>
          <td className='efficiency_total_day'>{columns[1].purge}</td>
          <td className='efficiency_total_day'>{columns[2].purge}</td>
          <td className='efficiency_total_day'>{columns[3].purge}</td>
          <td className='efficiency_total_day'>{columns[4].purge}</td>
          <td className='efficiency_total_day'>{columns[5].purge}</td>
          <td className='efficiency_total_day'>{columns[6].purge}</td>
          <td className='efficiency_total_week'>{columns[7].purge}</td>
        </tr>
      </tbody>
      }
    }
    return ( 
      <table className='efficiency_tableTotal'>
        {renderColumns()}
      </table>
    )
}

export default BodyTable