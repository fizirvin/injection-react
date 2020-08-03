import React, { } from 'react'

const BodyTable = ({column1, column2, column3, column4, column5, column6, column7, column8 }) =>{
    return ( 
      <table className='efficiency_tableTotal'>
        <tbody>
          <tr>
            <td className='efficiency_total_machine'>Total Real (pcs)</td>
            <td className='efficiency_total_day'>{column1.real}</td>
            <td className='efficiency_total_day'>{column2.real}</td>
            <td className='efficiency_total_day'>{column3.real}</td>
            <td className='efficiency_total_day'>{column4.real}</td>
            <td className='efficiency_total_day'>{column5.real}</td>
            <td className='efficiency_total_day'>{column6.real}</td>
            <td className='efficiency_total_day'>{column7.real}</td>
            <td className='efficiency_total_week'>{column8.real}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total NG (pcs)</td>
            <td className='efficiency_total_day'>{column1.ng}</td>
            <td className='efficiency_total_day'>{column2.ng}</td>
            <td className='efficiency_total_day'>{column3.ng}</td>
            <td className='efficiency_total_day'>{column4.ng}</td>
            <td className='efficiency_total_day'>{column5.ng}</td>
            <td className='efficiency_total_day'>{column6.ng}</td>
            <td className='efficiency_total_day'>{column7.ng}</td>
            <td className='efficiency_total_week'>{column8.ng}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total OK (pcs)</td>
            <td className='efficiency_total_day'>{column1.ok}</td>
            <td className='efficiency_total_day'>{column2.ok}</td>
            <td className='efficiency_total_day'>{column3.ok}</td>
            <td className='efficiency_total_day'>{column4.ok}</td>
            <td className='efficiency_total_day'>{column5.ok}</td>
            <td className='efficiency_total_day'>{column6.ok}</td>
            <td className='efficiency_total_day'>{column7.ok}</td>
            <td className='efficiency_total_week'>{column8.ok}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Plan (pcs)</td>
            <td className='efficiency_total_day'>{column1.plan}</td>
            <td className='efficiency_total_day'>{column2.plan}</td>
            <td className='efficiency_total_day'>{column3.plan}</td>
            <td className='efficiency_total_day'>{column4.plan}</td>
            <td className='efficiency_total_day'>{column5.plan}</td>
            <td className='efficiency_total_day'>{column6.plan}</td>
            <td className='efficiency_total_day'>{column7.plan}</td>
            <td className='efficiency_total_week'>{column8.plan}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
            <td className='efficiency_total_day'>{column1.wtime}</td>
            <td className='efficiency_total_day'>{column2.wtime}</td>
            <td className='efficiency_total_day'>{column3.wtime}</td>
            <td className='efficiency_total_day'>{column4.wtime}</td>
            <td className='efficiency_total_day'>{column5.wtime}</td>
            <td className='efficiency_total_day'>{column6.wtime}</td>
            <td className='efficiency_total_day'>{column7.wtime}</td>
            <td className='efficiency_total_week'>{column8.wtime}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Downtime (hrs)</td>
            <td className='efficiency_total_day'>{column1.dtime}</td>
            <td className='efficiency_total_day'>{column2.dtime}</td>
            <td className='efficiency_total_day'>{column3.dtime}</td>
            <td className='efficiency_total_day'>{column4.dtime}</td>
            <td className='efficiency_total_day'>{column5.dtime}</td>
            <td className='efficiency_total_day'>{column6.dtime}</td>
            <td className='efficiency_total_day'>{column7.dtime}</td>
            <td className='efficiency_total_week'>{column8.dtime}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total OEE (%)</td>
            <td className='efficiency_total_day'>{column1.oee}</td>
            <td className='efficiency_total_day'>{column2.oee}</td>
            <td className='efficiency_total_day'>{column3.oee}</td>
            <td className='efficiency_total_day'>{column4.oee}</td>
            <td className='efficiency_total_day'>{column5.oee}</td>
            <td className='efficiency_total_day'>{column6.oee}</td>
            <td className='efficiency_total_day'>{column7.oee}</td>
            <td className='efficiency_total_week'>{column8.oee}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Purge (g)</td>
            <td className='efficiency_total_day'>{column1.purge}</td>
            <td className='efficiency_total_day'>{column2.purge}</td>
            <td className='efficiency_total_day'>{column3.purge}</td>
            <td className='efficiency_total_day'>{column4.purge}</td>
            <td className='efficiency_total_day'>{column5.purge}</td>
            <td className='efficiency_total_day'>{column6.purge}</td>
            <td className='efficiency_total_day'>{column7.purge}</td>
            <td className='efficiency_total_week'>{column8.purge}</td>
          </tr>
        </tbody>
      </table>
    )
}

export default BodyTable