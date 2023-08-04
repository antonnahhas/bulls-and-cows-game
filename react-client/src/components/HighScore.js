import React, { useState } from 'react';

/**
 * this component has 4 properties, and one state that sets the name of the user. this component handles
 * the react form and the api fetches. it fetches a post request in order to create a tale for the first time
 * and for the second table it creates a new row to be added to the table. then immediately handles the post
 * with a get request that returns a table of highscores. it also displays the highscore for the current user.
 * @param score- score that has been updated in a previous component.
 * @param receiveResult a function that returns our table that has been received from the server to be displayed
 *         in another component.
 * @param controlLoading a boolean property that displays a loading icon while the object is being fetched
 * @param sendError returns an error message if found, for ex, if the user provided an existing username.
 * @returns {JSX.Element} returns the react form html
 * @constructor
 */
function HighScore({score, receiveResult, controlLoading, sendError}){
    //-----------------------------------------------------------------------------------
    const [name, setName] = useState("");// update the username

    //-----------------------------------------------------------------------------------
    function handleResponse(response) {
        controlLoading(false);//turn off the loading icon
        if (!response.ok) {//if response is not 200 check for errors and display them
            return response
                .text()
                .then(function (text) {
                    throw new Error(` ${text}`);
                })
                .catch(function (error) {
                    throw new Error(` ${error.message}`);
                });
        } else {
            return response;//if status = 200 return response to be handled
        }
    }
    //-----------------------------------------------------------------------------------
    function handleJson(jsonObj) {
        receiveResult(jsonObj);//the function receives result and returns it to parent component
    }
    //-----------------------------------------------------------------------------------
    function handleError(error) {
        sendError(error.message);//if error occured its return to parent component to be displayed
    }

    //-----------------------------------------------------------------------------------
    function handleSubmit(event) {
        event.preventDefault();
        sendError(null);//clear error box
        let params = {
            score: score,
            name:name//params for the post request
        };
        fetch("/highscores",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(params).toString()
        })  .then(handleResponse)
            .catch(handleError)
            .then(()=>{ handleFormSubmissionGet(event);})

    }
    //-----------------------------------------------------------------------------------
    function handleFormSubmissionGet(event) {
        event.preventDefault();
        controlLoading(true);//turn on loading icon
        fetch("/highscores", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(handleResponse)
            .then(res=>{return res.json();})
            .then(handleJson)
            .catch(handleError);
    }




    return(
        <>
            <div>
                <div className='row border border-success rounded bg-light mx-0 text-center'>
                    <div className='col'>
                        <h4>
                            you won! your score is : {score}
                        </h4>
                        <h5>
                            You may enter your name below to record your score
                        </h5>
                    </div>
                </div>
                <div className='row my-2'>
                    <div className='col'>
                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}
export default HighScore;