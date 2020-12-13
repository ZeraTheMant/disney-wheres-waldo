import React, { useState } from 'react';
import '../styles/GameScreen.css';
import disney from '../images/disney.gif';
import SelectionCircle from './SelectionCircle';
import SelectionList from './SelectionList';

const GameScreen = (props) => {
    const [x, setX] = useState(-100);
    const [y, setY] = useState(-100);
    const [listX, setListX] = useState(-100);
    const [listY, setListY] = useState(-100);  
    
    const fugg = (e) => {
        const newX = e.clientX;
        const newY = e.clientY;
        setX(newX);
        setY(newY);
        setListX(newX);
        setListY(newY);
        //alert([newX, newY])
    };
    
    return (
        <div id="game-screen">
            <img onClick={fugg} src={disney} />
            <SelectionCircle x={x} y={y} />
            <SelectionList charsLeft={props.charsLeft} setCharsLeft={props.setCharsLeft} x={listX} y={listY} setListX={setListX} setListY={setListY} />
        </div>
    );
}

export default GameScreen;