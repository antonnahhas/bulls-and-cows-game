import React, { useState } from 'react';
import HighScoreRow from "./HighScoreRow";

/**
 * this component receives 1 property, the component loops through this property of rows to append
 * them to the table.
 * @param scores a dict that has the username and his/her score
 * @returns {JSX.Element} html element for a table
 * @constructor
 */
function HighScoreTable({scores}) {

    const rows = [];
    scores.forEach((score, index) => {
        rows.push(
            <HighScoreRow key={index} scores={score}/>
        )
    })




    return (
        <div className="bg-light">
            <table className = "table">
                <caption className="caption-top bg-dark">HighScores: (showing top 5!)</caption>
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
}

export default HighScoreTable;