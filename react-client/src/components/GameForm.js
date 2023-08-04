import React, { useState } from 'react';

/**
 * this component handles the game's logic. it has 4 props that are all functions and 3 states,
 * 4 functions: - changeMessage: a function that lifts up the state of message to update info messages for the user
 * -addHistory: a function that returns the guess and number of bulls and cows to display for the user
 *      in its own component
 * -finishGame: boolean state that shows if the user is in game or not in order to display wanted components
 * -getScore: a function that returns the score the user got after guessing the 4 digits correctly to
 *      display in another component
 *3 states: - score to update current score, selectedNum to update the values the user provide and
 *      randNum to generate a 4 digit number to update each game.
 * the component returns the div where the game is handled, 4 dropdowns and a submit button
 * @param props 4 functions to lift up states
 * @returns {JSX.Element} game handler
 * @constructor
 */
function GameForm(props){
    //-----------------------------------------------------------------------------------
    const [score, setScore] = useState(1);
    const [selectedNum, setSelectedNum] = useState({
        firstNum: "",
        secondNum: "",
        thirdNum: "",
        fourthNum: "",
    });
    const [randNum] = useState(() => generateNum());//this state has a custom constructor

    //-----------------------------------------------------------------------------------
    function generateNum(){
        let digits = [];

        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 10);

            if (!digits.includes(digit)) {
                digits.push(digit);
            }//generate 4 unique digits
        }
        if (digits[0] === 0) {
            digits[0] = digits[1];
            digits[1] = 0;
        }//if the first number is 0 swap with the second number, to prevent a 3 digit number if the
        //first digit is 0

        const result = digits.reduce((acc, digit, index) => {
            return acc + digit * Math.pow(10, 3 - index);
        }, 0);

        console.log(result);//print out result to console
        return result;
    }
    //-----------------------------------------------------------------------------------
    const handleInputChange = (event) =>{
        setSelectedNum({
            ...selectedNum,
            [event.target.name]: event.target.value,
        });
    }//save each dropdown value
    //-----------------------------------------------------------------------------------
    function hasNoDuplicates(dict) {
        const values = Object.values(dict);
        return values.length === new Set(values).size;
    }//a function that checks if the number provided by user has unique digits
    const handleSubmit = (event) =>{
        event.preventDefault();
        if (
            (selectedNum.firstNum &&
                selectedNum.secondNum &&
                selectedNum.thirdNum &&
                selectedNum.fourthNum) &&
            (selectedNum.firstNum !== 'guess...' &&
                selectedNum.secondNum !== 'guess...' &&
                selectedNum.thirdNum !== 'guess...' &&
                selectedNum.fourthNum !== 'guess...' )//check if the user provided 4 numbers
        ){
            if(!hasNoDuplicates(selectedNum)){//check if the user hasnt provided duplicate digits
                props.changeMessage("please choose four different numbers!")
                return;
            }
            setScore(score + 1);
            let selected = selectedNum.firstNum + selectedNum.secondNum + selectedNum.thirdNum + selectedNum.fourthNum
            let wanted = String(randNum)
            console.log(wanted);
            let bulls = 0, cows = 0;
            let iter = 0
            while(iter!==4) {
                if (wanted[iter] === selected[iter]) {//check for bulls
                    bulls++;
                }
                if (selected[iter] !== wanted[iter] && wanted.includes(selected[iter])) {
                    cows++;//check for cows
                }
                iter++;
            }
            if(bulls === 4){
                props.finishGame();//finish game
                props.getScore(score);//return score
            }
            else{
                const newResult = {Guess: [selected], Bulls: [bulls], Cows: [cows]};
                props.changeMessage(`guess: ${selected}, bulls: ${bulls}, cows: ${cows}`);
                props.addHistory(newResult);//add to history table
            }



        }else{
            props.changeMessage("please choose four numbers!")//notify the user to provide 4 digits
        }
    }



    return(
        <>
            <form onSubmit = {handleSubmit}>
                <div className='container mb-4 border border-primary rounded'>
                    <div className = "row my-3">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="firstNum">guess 1st number</label>
                                <select
                                    className ="form-select"
                                    name="firstNum"
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue='guess...'>guess...</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="secondNum">guess 2nd number</label>
                                <select
                                    className ="form-select"
                                    name="secondNum"
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue='guess...'>guess...</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="thirdNum">guess 3rd number</label>
                                <select
                                    className ="form-select"
                                    name="thirdNum"
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue='guess...'>guess...</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="fourthNum">guess 4th number</label>
                                <select
                                    className ="form-select"
                                    name="fourthNum"
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue='guess...'>guess...</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row my-3 text-start'>
                        <div className = 'col'>
                            <button className="btn btn-primary m-3 " type = 'submit'>GO!</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default GameForm;