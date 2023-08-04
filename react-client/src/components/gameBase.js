import React, {useState} from "react";

/**
 * this component is the base design of the game, it has one state that controls the description
 * of the game, by hiding the element on a click event. the html returned consists of three divs
 * the title, description and a div that has 2 buttons one button controls the visibility of the
 * description and the other button starts a new game, where it refreshes the page.
 * @returns {JSX.Element} base design of the game
 * @constructor
 */
function GameBase(){
    //-----------------------------------------------------------------------------------
    const [showInfo, setShowInfo] = useState(true);//boolean state

    //-----------------------------------------------------------------------------------
    const handleNewGame = () => {//refresh game, refreshes the page
        window.location.reload();
    }
    //-----------------------------------------------------------------------------------
    const handleInfo = () => {//the boolean state is changed on the click event
        if(showInfo){
            setShowInfo(false);
        }
        else{
            setShowInfo(true);
        }
    }

    return(
        <>
            <h1 className="border border-primary rounded text-center">BULLS & COWS</h1>
            {showInfo ? <p className="border border-success rounded bg-light">the game is a memory game, where the
                    player has to guess the correct digits, the digits
                    are randomly generated, however the bulls and the cows are here to help, number of bulls
                    represent the number of bullseye the player got, meaning how many numbers he guessed
                    correctly and in the correct position, whereas, the cows number represent how many numbers
                    the player got however not in the correct order. The player must make sure to provide
                    4 digits in the range between 0 and 9. When the player correctly guesses all the digits,
                    he/she is required to provide their username to save their score in the high-score table
                    and show their other fellows how they've done, are you up to the challenge?</p> :
                <h3 className="border border-success rounded bg-light text-center">Good Luck!</h3>}
            <div className='row my-3 text-start border border-primary rounded mx-0'>
                <div className = 'col'>
                    <button className="btn btn-danger m-3" type = 'button' onClick={handleNewGame}>start new game</button>
                    <button className="btn btn-warning m-3" type = 'button'  onClick = {handleInfo}>Hide/Show game description</button>
                </div>
            </div>
        </>
    )
}

export default GameBase;