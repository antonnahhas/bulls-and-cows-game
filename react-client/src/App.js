import {useState} from "react";


import bgImg from "./Images/newBg.png"
import GameForm from "./components/GameForm";
import GameBase from "./components/gameBase";
import GuessList from "./components/GuessList";
import HighScore from "./components/HighScore";
import HighScoreTable from "./components/HighScoreTable";
import LoadingIcon from "./Images/loadingGif.gif"
import HandleError from "./components/HandleError";


/**
 * the parent component, has 7 states, isLoading - updates the state to know if it should display the loading icon.
 * highScoreTable - stores the data in the high score table
 * errorMessage - stores error messages to be displayed by the user, if found.
 * score - stores the score the user got.
 * inGame - represents if the user is in game or not.
 * newMsg - stores info messages to provide the user with.
 * history - stores the data of the guess history for the user.
 * the component handles all the other components, with the help of states, components are shown/hidden
 * to the user. the container divides each component to rows and coloumns as wanted.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [highScoreTable, setHighScoreTable] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');
    const [score, setScore] = useState(0);
    const [inGame, setInGame] = useState(true)
    const [newMsg, setNewMsg] = useState("Please read the instructions before playing!");
    const [history, setHistory] = useState({
        Guess: [],
        Bulls: [],
        Cows: []
    });

    const styles = {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
    };//styles for the background image

    return (
        <>
            <div className = "border border-success rounded my-5 mx-4" style = {styles}>
                <div className="App container my-5">
                    <div className="row">
                        <div className="col-12 ">
                            <GameBase />
                        </div>
                    </div>
                    {inGame ?
                        <div>
                            <div className='row border border-success rounded bg-warning mb-3 mx-0'>
                                <div className='col'>
                                    <p>{newMsg}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                    <GameForm changeMessage={msg => setNewMsg(msg)}
                                              addHistory={result => setHistory({
                                                  Guess: [...history.Guess, result.Guess]
                                                  , Bulls: [...history.Bulls, result.Bulls]
                                                  , Cows: [...history.Cows, result.Cows]
                                              })}
                                              finishGame={x => setInGame(false)}
                                              getScore = {sc => setScore(sc)}/>
                                </div>


                            </div>
                            <div className="row bg-light">
                                <div className="col">
                                    <GuessList props={history}/>
                                </div>
                            </div>
                        </div>:
                        <div>
                            {highScoreTable && highScoreTable.length > 0 && !errorMessage
                                ? <HighScoreTable scores = {highScoreTable}/> :
                                <div>
                                    <HighScore score = {score}
                                               receiveResult={table => setHighScoreTable(table)}
                                               controlLoading = {l => setIsLoading(l)}
                                               sendError = {msg => setErrorMessage(msg)}/>
                                    {errorMessage ? <HandleError error={errorMessage}/> : ''}
                                </div>}
                            <div className="text-left ">
                                {isLoading ? <img className="class=figure-img img-fluid rounded bg-transparent" src={LoadingIcon} alt="loading" /> : ''}
                            </div>


                        </div> }

                </div>
            </div>
        </>

    );
}

export default App;