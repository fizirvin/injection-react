import React, { Fragment} from 'react';


function NotSupported() {
    return (
        <Fragment>
            <h3>The Screen Size of this device is not supported</h3>
            <p>Please, use a lap top or desktop, thanks!</p>
        </Fragment>
    )
}

export default NotSupported;