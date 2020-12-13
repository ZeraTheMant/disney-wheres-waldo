import { useState, useEffect } from 'react';
import { projectFirestore } from '../configs/config';


const useFirestoreForTime = (collection) => {
    const [docs, setDocs] = useState([]);
    
    useEffect(() => {
        const unsub = projectFirestore.collection(collection)//.where("Found", "==", false)
            .orderBy('Time', 'asc')
            .onSnapshot(snap => {
        
            let documents = [];
            snap.forEach(doc => {
                //const data = doc.data();
                //alert(doc.data().Name)
                documents.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setDocs(documents);
        });
        
        return () => unsub();
    }, [collection]);
    //alert(docs)
    return docs//{ docs };
};

export default useFirestoreForTime;