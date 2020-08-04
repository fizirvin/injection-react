import React, { } from 'react'

const HeaderTable = ({filter, fields}) =>{
    const renderFields = () =>{
      return fields.map((item, index) => <th key={index} className='efficiency_header_day' colSpan='2' rowSpan='1'><div>{item.pos1}</div><div>{item.pos2}</div></th>)
    }
    return (
        <table className='efficiency_tablehader'>
          <thead>
            <tr>
            <th className='efficiency_header_machine' colSpan='3' rowSpan='2'>Production By {filter.toUpperCase()}</th>
              {renderFields()}
            </tr>
          </thead>
        </table>
    )
}

export default HeaderTable