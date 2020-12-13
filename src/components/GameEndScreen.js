import React from 'react';
import '../styles/NameBox.css';
import { getHoursText, getMinutesText, getSecondsText } from '../functions/formatTime';

const GameEndScreen = (props) => {
    return (
        <div id="name-box">
            <h3 className="text-centered">Congratulations {props.playerName}, you finished the game!</h3>
            <p className="text-centered">
                <span>The time it took you to finish was </span>
                
                <span>{getHoursText(props.timeInSeconds)}:</span>
                <span>{getMinutesText(props.timeInSeconds)}:</span>
                <span>{getSecondsText(props.timeInSeconds)}</span>
            </p>
            <button type="button" onClick={() => props.resetGame()} >Play again</button>           
        </div>
    );
}

export default GameEndScreen;