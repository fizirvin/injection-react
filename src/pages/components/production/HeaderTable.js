import React, { } from 'react'

const HeaderTable = ({filter, fields}) =>{
    const {field1, field2, field3, field4, field5, field6, field7, field8 } = fields
    return (
        <table className='efficiency_tablehader'>
          <thead>
            <tr>
            <th className='efficiency_header_machine' colSpan='3' rowSpan='2'>Production By {filter.toUpperCase()}</th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field1.pos1}</div><div>{field1.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field2.pos1}</div><div>{field2.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field3.pos1}</div><div>{field3.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field4.pos1}</div><div>{field4.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field5.pos1}</div><div>{field5.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field6.pos1}</div><div>{field6.pos2}</div></th>
              <th className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{field7.pos1}</div><div>{field7.pos2}</div></th>
              <th className='efficiency_header_week' colSpan='2' rowSpan='1'><div>{field8.pos1}</div><div>{field8.pos2}</div></th>
            </tr>
          </thead>
        </table>
    )
}

export default HeaderTable