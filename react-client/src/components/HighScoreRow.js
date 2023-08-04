import React from "react";

/**
 * this component receives 2 properties. the component returns an html code for a single row in the highscore table
 * each row is provided with a unique key to prevent errors in console.
 * @param scores dict for username and score for each row
 * @param id a unique key for each row
 * @returns {JSX.Element} a row html element for highscore table
 * @constructor
 */
function HighScoreRow({scores, id}){
    return(
        <>
            {scores && Object.keys(scores).length > 0? (


                <tr key={id}>
                    <td>{scores.name}</td>
                    <td>{scores.score}</td>
                </tr>

            ) : (
                <tr>
                    <td colSpan="3">No data to display</td>
                </tr>
            )}
        </>
    )
}

export default HighScoreRow