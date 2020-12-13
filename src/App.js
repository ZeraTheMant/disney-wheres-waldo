import React, { useState, useEffect } from 'react';
import NameBox from './components/NameBox';
import GameScreen from './components/GameScreen';
import GameEndScreen from './components/GameEndScreen';
import LeaderboardBox from './components/LeaderboardBox';
import './styles/App.css';
import useFirestoreForFoundStatus from './hooks/useFirestoreForFoundStatus';
import { projectFirestore } from './configs/config';

function addToLeaderboardDB(name, seconds) {
    projectFirestore.collection("Leaderboard").doc(name).set({
        Name: name,
        Time: seconds
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function App() {
    const [playerName, setPlayerName] = useState(null);
    const [gameStart, setGameStart] = useState(false);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [charsLeft, setCharsLeft] = useState(3);
    
    useEffect(() => {
        resetGame();
    }, []);  
    
    useEffect(() => {
        if (charsLeft == 0) {
            addToLeaderboardDB(playerName, timeInSeconds);
            
            setGameEnd(true);
            setGameStart(false);
        } ;
    }, [charsLeft, setGameEnd, setGameStart]);
    
    const resetGame = () => {
        setGameEnd(false);
        setGameStart(false);    
        setTimeInSeconds(0); 
        setCharsLeft(3);
        useFirestoreForFoundStatus();
    };
    
    return (
        <div className="App">
            <div id="main-screen-container">
                { !gameStart && !gameEnd && <NameBox setGameStart={setGameStart} setPlayerName={setPlayerName} /> }
                { gameStart && !gameEnd && <GameScreen charsLeft={charsLeft} setCharsLeft={setCharsLeft} /> }
                { gameEnd && <GameEndScreen playerName={playerName} timeInSeconds={timeInSeconds} resetGame={resetGame} /> }
            </div>
            
            <div>
                <LeaderboardBox 
                    gameStart={gameStart}
                    timeInSeconds={timeInSeconds}
                    setTimeInSeconds={setTimeInSeconds}
                />
            </div>
        </div>
    );
}

export default App;
