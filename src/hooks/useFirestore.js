import { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const useFirestore = (collection) => {
  const user = useAuth().user;
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection(`users/${user.uid}/${collection}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // snapshot provides the current contents of the collection.
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsubscribe();
  }, [collection, user.uid]);

  return { docs };
};

export default useFirestore;
