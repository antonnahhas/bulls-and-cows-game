import React from 'react';
import TableRow from "./TableRow";
import { v4 as uuidv4 } from 'uuid';

/**
 * this component has one prop history which is a dict that consists of the guessed number num of cows and bulls.
 * the component goes through a loop of all of the histories the user has, appends to row and returns a table
 * html.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function GuessList({props}) {
    const rows = [];
    let s=props.Guess.length;//size of history array, it loops backwards to push the newst row on the top
    for(let i=s;i>0;i--) {
        rows.push(
            <TableRow
                key={uuidv4()} // set a unique key for each TableRow, read README for more info
                prop={{
                    Guess: props.Guess[i - 1],
                    Bulls: props.Bulls[i - 1],
                    Cows: props.Cows[i - 1]
                }}
            />
        );
    }

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Guess</th>
                    <th>Bulls</th>
                    <th>Cows</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
}

export default GuessList;