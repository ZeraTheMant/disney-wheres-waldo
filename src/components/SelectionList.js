import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { projectFirestore } from '../configs/config';

const SelectionList = (props) => {
    const { docs } = useFirestore('characters');
    
    const removeDisplay = () => {
        props.setListX(-100);
        props.setListY(-100);        
    };
    
    const getAverage = (pair) => {
        return (pair[0] + pair[1]) / 2;
    }
    
    const checkGuess = (data, x, y) => {
        const charLocValAverage = getAverage(data.Location);
        const guessLocValAverage = getAverage([x, y]);
        //alert(Math.abs(charLocValAverage) - Math.abs(guessLocValAverage))
        return ((Math.abs(charLocValAverage) - Math.abs(guessLocValAverage)) > -5) && 
               ((Math.abs(charLocValAverage) - Math.abs(guessLocValAverage)) < 5);
    };
    
    const guess = (charName) => {       
        const charRef = projectFirestore.collection('characters').doc(charName);

        charRef.get().then(function(doc) {
            if (doc.exists) {
                return doc.data();
                //alert(doc.data().Name)                             
            } else {
                alert("No such document!");
                removeDisplay();
            }
        }).then(function(data) {
            if (data.Found) {
                throw new Error("Already found " + charName);
            } else {
                return checkGuess(data, props.x, props.y);          
            }
        }).then(function(result) {
            if (result) {
                alert('Found ' + charName + '!');
                charRef.update({
                    Found: true
                });
                props.setCharsLeft(props.charsLeft - 1)
            } else {
                alert("Incorrect guess!"); 
                removeDisplay();
            }
        }).catch(function(error) {
            alert(error);
            removeDisplay();
        });            
    }
    
    return (
        <div 
            id="selection-list"
            style={{ top: (props.y-25), left: (props.x+35) }}
        >  
            {
                docs && docs.map((doc, move) => (
                    <div key={move}>
                        <img 
                            src={doc.img}
                            onClick={() => guess(doc.name)}
                            className={doc.found ? 'found': ''}
                        />
                    </div>                      
                ))        
            }
        </div>
    );
}

export default SelectionList;