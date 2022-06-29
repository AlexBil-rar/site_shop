import React from 'react';
import { Spinner } from 'react-bootstrap';
import "../styles/app.css"

const Loader = () => {

    return (
        <div className='Wrapper'>
            <Spinner 
                className="spinner-grow"
                animation="border" 
                role="status" 
            >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
};

export default Loader;