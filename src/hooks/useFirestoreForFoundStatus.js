
import { projectFirestore } from '../configs/config';

function setDefaultImgStatus() {
    projectFirestore.collection("characters")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const charRef = projectFirestore.collection('characters').doc(doc.data().Name);
                // doc.data() is never undefined for query doc snapshots
                charRef.update({
                    Found: false
                });  
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        

}

export default setDefaultImgStatus;