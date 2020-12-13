import React from 'react';
import '../styles/NameBox.css';
import aladdin from '../images/aladdin.png';
import gaston from '../images/gaston.jpg';
import lilo from '../images/lilo.png';
import { projectFirestore } from '../configs/config';

const NameBox = (props) => {
    const handleChange = (e) => {
        props.setPlayerName(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.querySelector('#name');
        const charRef = projectFirestore.collection('Leaderboard').doc(name.value);

        charRef.get().then(function(doc) {
            if (doc.exists) {
                throw new Error(name.value + ' is already in our records. Please choose a different name');                       
            } else {
                props.setGameStart(true);
            }
        }).catch(function(error) {
            alert(error);
        }).finally(function() {
            name.value = '';
        }); 
    };

    return (
        <div id="name-box">
            <form 
                className="name-box-div" 
                id="name-form" 
                onSubmit={handleSubmit}               
            >
                <label>Name</label>
                <input id="name" onChange={handleChange} required/>
            </form>
            
            
            <button form="name-form" type="submit" id="start-btn">Start Game</button>
            
            <label className="text-centered">Find these characters!</label>
            
            <div className="characters-container">
                <img src={aladdin} className="aladdin-img" />
                <img src={gaston} className="gaston-img" />
                <img src={lilo} className="lilo-img" />
            </div>
        </div>
    );
}

export default NameBox;