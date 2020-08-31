import React from 'react';

const RenderItems = ({items})  =>{
    if( items.length === 0){
        return null
        } else {
        return (
            <div className='items_info'>items: {items.length}</div>
        )
    }    
}

export default RenderItems