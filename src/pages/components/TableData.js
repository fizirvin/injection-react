import React from 'react';

const TableData = (props)  =>{
    return(
        <td {...props}>{props.children}</td>
    )
}

export default TableData