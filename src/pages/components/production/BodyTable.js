import React, { } from 'react'

const BodyTable = ({row1, row2, row3, row4, row5, row6, row7, row8}) =>{
    return ( 
      <table className='efficiency_tableTotal'>
        <tbody>
          <tr>
            <td className='efficiency_total_machine'>Total Real (pcs)</td>
            <td className='efficiency_total_day'>{row1.pos1}</td>
            <td className='efficiency_total_day'>{row1.pos2}</td>
            <td className='efficiency_total_day'>{row1.pos3}</td>
            <td className='efficiency_total_day'>{row1.pos4}</td>
            <td className='efficiency_total_day'>{row1.pos5}</td>
            <td className='efficiency_total_day'>{row1.pos6}</td>
            <td className='efficiency_total_day'>{row1.pos7}</td>
            <td className='efficiency_total_week'>{row1.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total NG (pcs)</td>
            <td className='efficiency_total_day'>{row2.pos1}</td>
            <td className='efficiency_total_day'>{row2.pos2}</td>
            <td className='efficiency_total_day'>{row2.pos3}</td>
            <td className='efficiency_total_day'>{row2.pos4}</td>
            <td className='efficiency_total_day'>{row2.pos5}</td>
            <td className='efficiency_total_day'>{row2.pos6}</td>
            <td className='efficiency_total_day'>{row2.pos7}</td>
            <td className='efficiency_total_week'>{row2.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total OK (pcs)</td>
            <td className='efficiency_total_day'>{row3.pos1}</td>
            <td className='efficiency_total_day'>{row3.pos2}</td>
            <td className='efficiency_total_day'>{row3.pos3}</td>
            <td className='efficiency_total_day'>{row3.pos4}</td>
            <td className='efficiency_total_day'>{row3.pos5}</td>
            <td className='efficiency_total_day'>{row3.pos6}</td>
            <td className='efficiency_total_day'>{row3.pos7}</td>
            <td className='efficiency_total_week'>{row3.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Plan (pcs)</td>
            <td className='efficiency_total_day'>{row4.pos1}</td>
            <td className='efficiency_total_day'>{row4.pos2}</td>
            <td className='efficiency_total_day'>{row4.pos3}</td>
            <td className='efficiency_total_day'>{row4.pos4}</td>
            <td className='efficiency_total_day'>{row4.pos5}</td>
            <td className='efficiency_total_day'>{row4.pos6}</td>
            <td className='efficiency_total_day'>{row4.pos7}</td>
            <td className='efficiency_total_week'>{row4.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Worktime (hrs)</td>
            <td className='efficiency_total_day'>{row5.pos1}</td>
            <td className='efficiency_total_day'>{row5.pos2}</td>
            <td className='efficiency_total_day'>{row5.pos3}</td>
            <td className='efficiency_total_day'>{row5.pos4}</td>
            <td className='efficiency_total_day'>{row5.pos5}</td>
            <td className='efficiency_total_day'>{row5.pos6}</td>
            <td className='efficiency_total_day'>{row5.pos7}</td>
            <td className='efficiency_total_week'>{row5.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Downtime (hrs)</td>
            <td className='efficiency_total_day'>{row6.pos1}</td>
            <td className='efficiency_total_day'>{row6.pos2}</td>
            <td className='efficiency_total_day'>{row6.pos3}</td>
            <td className='efficiency_total_day'>{row6.pos4}</td>
            <td className='efficiency_total_day'>{row6.pos5}</td>
            <td className='efficiency_total_day'>{row6.pos6}</td>
            <td className='efficiency_total_day'>{row6.pos7}</td>
            <td className='efficiency_total_week'>{row6.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total OEE (%)</td>
            <td className='efficiency_total_day'>{row7.pos1}</td>
            <td className='efficiency_total_day'>{row7.pos2}</td>
            <td className='efficiency_total_day'>{row7.pos3}</td>
            <td className='efficiency_total_day'>{row7.pos4}</td>
            <td className='efficiency_total_day'>{row7.pos5}</td>
            <td className='efficiency_total_day'>{row7.pos6}</td>
            <td className='efficiency_total_day'>{row7.pos7}</td>
            <td className='efficiency_total_week'>{row7.pos8}</td>
          </tr>
          <tr>
            <td className='efficiency_total_machine'>Total Purge (g)</td>
            <td className='efficiency_total_day'>{row8.pos1}</td>
            <td className='efficiency_total_day'>{row8.pos2}</td>
            <td className='efficiency_total_day'>{row8.pos3}</td>
            <td className='efficiency_total_day'>{row8.pos4}</td>
            <td className='efficiency_total_day'>{row8.pos5}</td>
            <td className='efficiency_total_day'>{row8.pos6}</td>
            <td className='efficiency_total_day'>{row8.pos7}</td>
            <td className='efficiency_total_week'>{row8.pos8}</td>
          </tr>
        </tbody>
      </table>
    )
}

export default BodyTable