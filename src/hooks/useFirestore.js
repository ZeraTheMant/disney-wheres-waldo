import { useState, useEffect } from 'react';
import { projectFirestore } from '../configs/config';
import aladdin from '../images/aladdin.png';
import gaston from '../images/gaston.jpg';
import lilo from '../images/lilo.png';

function getImage(name) {
    if (name == 'Aladdin') return aladdin;
    if (name == 'Gaston') return gaston;
    if (name == 'Lilo') return lilo;
}  
     

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);
    
    useEffect(() => {
        const unsub = projectFirestore.collection(collection)//.where("Found", "==", false)
            //.get()
            .onSnapshot(snap => {

            let documents = [];
            snap.forEach(doc => {
                const data = doc.data();
                documents.push({
                   id: doc.id,
                   name: data.Name,
                   img: getImage(data.Name),
                   found: data.Found
                });
            });
            setDocs(documents);
        });
        
        return () => unsub();
    }, [collection]);

    return { docs };
};

export default useFirestore;