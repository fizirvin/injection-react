import React, { Fragment, useState } from 'react'

const Detail = ({ defectCode, defect, detail }) => {
  const [show, setShow] = useState(false)

  const renderDetail = () =>{
      return show && detail.map( item => <tr key={item.itemNumber}>
      <td className='detail_total_machine'><div className='detail_row_production'><div></div><div>{ item.itemNumber }</div></div></td>
      {item.defect.map((it, index)=><td key={index} className='detail_total_day'>{it}</td>)}
    </tr>
    )
  }

  return( 
    <Fragment>
      <tr>
        <td className='detail_defect_machine'><div className='detail_row_production'><button onClick={()=>setShow(!show)}>▼</button><div>{ defectCode }</div></div></td>
        {defect.map((it, index)=><td key={index} className='detail_defect_day'>{it}</td>)}
      </tr>
        {renderDetail()}
    </Fragment>
  )   
}

export default Detail