import React, { useEffect } from 'react';
import '../styles/LeaderboardBox.css';
import useFirestore from '../hooks/useFirestore';
import useFirestoreForTime from '../hooks/useFirestoreForTime';
import { getHoursText, getMinutesText, getSecondsText } from '../functions/formatTime';
/*import aladdin from '../images/aladdin.png';
import gaston from '../images/gaston.jpg';
import lilo from '../images/lilo.png';
                <img src={gaston} className="gaston-img" />
                <img src={lilo} className="lilo-img" />
*/

const LeaderboardBox = (props) => {
    const timeDocs = useFirestoreForTime('Leaderboard');
    const { docs } = useFirestore('characters');

    useEffect(() => {
        if (props.gameStart) {
            let ctr = 0
            let timer = setInterval(() => {
                ctr += 1;
                props.setTimeInSeconds(ctr);
            }, 1000);
            
            return () => clearInterval(timer);           
        }
    }, [props.gameStart]);
    //        { doc.data.Name }
    return (
        <div id="leaderboard-box">
            <div className="characters-container">
                { docs && docs.map((doc, move) => (
                    <img key={move} src={doc.img} className={doc.found ? 'found': ''} />
                ))}
                
            </div>       
            <h2 className="text-centered">Leaderboard</h2>
            
            <div id="time-container">
                { timeDocs && timeDocs.map((doc, move) => (
                    <div className="leaderboard-time" key={move}>
                        <h3>{move + 1}. { doc.data.Name }</h3>  
                        
                        <p>
                            <span>{getHoursText(doc.data.Time)}:</span>
                            <span>{getMinutesText(doc.data.Time)}:</span>
                            <span>{getSecondsText(doc.data.Time)}</span>
                        </p>                
                    </div>
                ))}
            </div>
            

            <div className="leaderboard-time" id="my-time">
                <h1>My time</h1>              
                <p>
                    <span>{getHoursText(props.timeInSeconds)}:</span>
                    <span>{getMinutesText(props.timeInSeconds)}:</span>
                    <span>{getSecondsText(props.timeInSeconds)}</span>
                </p>
            </div>
        </div>
    )
}

export default LeaderboardBox;