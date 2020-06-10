import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Fragment>
            <h1>URL Not Found</h1>
            <Link to={'/'}><button>Home</button></Link>
        </Fragment>
    )
}

export default NotFound;