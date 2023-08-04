import React, { useState } from 'react';

/**
 * this component has one prop that has the error message in it if found, the component returns an error box
 * that displays the error to user.
 * @param error
 * @returns {JSX.Element}
 * @constructor
 */
function HandleError({ error }){

    return (
        <div className='row border border-warning rounded bg-danger mb-3 mx-0'>
            <div className='col'>
                <p>Something is wrong:- {error}</p>
            </div>
        </div>
    );
}

export default HandleError;
