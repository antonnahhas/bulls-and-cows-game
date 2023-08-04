import React from "react";
import { v4 as uuidv4 } from 'uuid';//requires nmp install uuid

/**
 * this component receives one property of the date being displayed in the history row.
 * @param prop data: guess number, and number of bulls and cows.
 * @returns {JSX.Element} a row element to be displayed in the history table.
 * @constructor
 */
function TableRow({prop}){
    return(
        <>
            {prop && Object.keys(prop).length > 0 ? (
                <tr key={uuidv4()}>
                    <td>{prop.Guess}</td>
                    <td>{prop.Bulls}</td>
                    <td>{prop.Cows}</td>
                </tr>
            ) : (
                <tr>
                    <td colSpan="3">No data to display</td>
                </tr>
            )}
        </>
    )
}

export default TableRow;