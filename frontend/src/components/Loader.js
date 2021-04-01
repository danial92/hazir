import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div>
            <Spinner animation="border" variant="primary">
                <span className='sr-only'>Loading..!!!</span>
            </Spinner>
        </div>
    )
}

export default Loader
